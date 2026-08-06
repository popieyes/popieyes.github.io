import { useEffect, useRef, useState } from 'react';

const VERTEX_SHADER = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

/** Blits an accumulation buffer to the screen, averaging by sample count. */
const RESOLVE_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uAccum;
uniform float uSamples;
out vec4 fragColor;
void main() {
  vec3 c = texelFetch(uAccum, ivec2(gl_FragCoord.xy), 0).rgb / max(uSamples, 1.0);
  c = c / (c + vec3(1.0));              // Reinhard tonemap
  fragColor = vec4(pow(c, vec3(0.4545)), 1.0); // gamma
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader failed to compile: ${log}`);
  }
  return shader;
}

function link(gl: WebGL2RenderingContext, fragmentSource: string) {
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Program failed to link: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

export type ShaderCanvasProps = {
  fragment: string;
  /** Extra uniforms, sampled fresh each frame. */
  uniforms?: Record<string, number>;
  /**
   * Progressive rendering: each frame adds a sample into a float buffer rather
   * than replacing it. Used by the path tracer, where converging on screen is
   * the whole point.
   */
  accumulate?: boolean;
  /** Bumping this resets the accumulation buffer. */
  resetKey?: string | number;
  className?: string;
  onSamples?: (samples: number) => void;
};

export default function ShaderCanvas({
  fragment,
  uniforms = {},
  accumulate = false,
  resetKey,
  className = '',
  onSamples,
}: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Keep the latest values without restarting the GL loop on every render.
  const uniformsRef = useRef(uniforms);
  uniformsRef.current = uniforms;
  const onSamplesRef = useRef(onSamples);
  onSamplesRef.current = onSamples;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });

    if (!context) {
      setError('This exhibit needs WebGL 2, which this browser or device does not provide.');
      return;
    }

    // Rebound as a non-null const so the narrowing survives into the closures
    // below — TypeScript discards it otherwise.
    const gl = context;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let program: WebGLProgram;
    let resolveProgram: WebGLProgram | null = null;
    try {
      program = link(gl, fragment);
      if (accumulate) resolveProgram = link(gl, RESOLVE_SHADER);
    } catch (compileError) {
      setError(compileError instanceof Error ? compileError.message : 'Shader error');
      return;
    }

    // Fullscreen triangle pair.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindAttribLocation(program, 0, 'aPos');

    // Ping-pong float targets for progressive accumulation.
    let targets: { fbo: WebGLFramebuffer; tex: WebGLTexture }[] = [];
    let readIndex = 0;
    let samples = 0;

    const hasFloatBuffers = !!gl.getExtension('EXT_color_buffer_float');
    const canAccumulate = accumulate && hasFloatBuffers;

    function createTargets(width: number, height: number) {
      targets.forEach((target) => {
        gl.deleteFramebuffer(target.fbo);
        gl.deleteTexture(target.tex);
      });
      targets = [0, 1].map(() => {
        const tex = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const fbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        // texImage2D with null leaves contents undefined; the accumulator has
        // to start at exactly zero or the first frames are poisoned.
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return { fbo, tex };
      });
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      samples = 0;
    }

    let width = 1;
    let height = 1;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      // Cap DPR: these are heavy per-pixel shaders and 3x on a phone is a stall.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const nextWidth = Math.max(1, Math.floor(rect.width * dpr));
      const nextHeight = Math.max(1, Math.floor(rect.height * dpr));
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      canvas!.width = width;
      canvas!.height = height;
      if (canAccumulate) createTargets(width, height);
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // Pause entirely when scrolled out of view — no reason to burn a GPU on
    // a shader nobody is looking at.
    let visible = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    visibility.observe(canvas);

    const startTime = performance.now();
    let frame = 0;

    function setUniforms(target: WebGLProgram, time: number) {
      const set = (name: string, value: number) => {
        const location = gl.getUniformLocation(target, name);
        if (location) gl.uniform1f(location, value);
      };
      const resolution = gl.getUniformLocation(target, 'uResolution');
      if (resolution) gl.uniform2f(resolution, width, height);
      set('uTime', time);
      set('uFrame', samples);
      Object.entries(uniformsRef.current).forEach(([name, value]) => set(name, value));
    }

    function render() {
      frame = requestAnimationFrame(render);
      if (!visible) return;

      const time = reduceMotion ? 1.2 : (performance.now() - startTime) / 1000;

      gl.bindVertexArray(vao);

      if (canAccumulate && resolveProgram && targets.length === 2) {
        const read = targets[readIndex];
        const write = targets[1 - readIndex];

        gl.useProgram(program);
        gl.bindFramebuffer(gl.FRAMEBUFFER, write.fbo);
        gl.viewport(0, 0, width, height);
        setUniforms(program, time);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, read.tex);
        const prevLocation = gl.getUniformLocation(program, 'uPrev');
        if (prevLocation) gl.uniform1i(prevLocation, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        samples += 1;
        readIndex = 1 - readIndex;

        gl.useProgram(resolveProgram);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, width, height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, write.tex);
        gl.uniform1i(gl.getUniformLocation(resolveProgram, 'uAccum'), 0);
        gl.uniform1f(gl.getUniformLocation(resolveProgram, 'uSamples'), samples);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        if (samples % 8 === 0) onSamplesRef.current?.(samples);
      } else {
        gl.useProgram(program);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, width, height);
        setUniforms(program, time);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // A still frame is the correct output when motion is suppressed.
        if (reduceMotion && !accumulate) {
          cancelAnimationFrame(frame);
          return;
        }
      }
    }

    frame = requestAnimationFrame(render);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      setError('The graphics context was lost. Reload the page to restart this exhibit.');
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      targets.forEach((target) => {
        gl.deleteFramebuffer(target.fbo);
        gl.deleteTexture(target.tex);
      });
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      if (resolveProgram) gl.deleteProgram(resolveProgram);
    };
  }, [fragment, accumulate, resetKey]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center p-8 ${className}`}
        style={{ background: 'var(--surface)' }}
      >
        <p className="type-label max-w-sm text-center" style={{ color: 'var(--fg-muted)' }}>
          {error}
        </p>
      </div>
    );
  }

  return <canvas ref={canvasRef} className={className} />;
}
