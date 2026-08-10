import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./index-ByBUgZZw.js";var c=t(o()),l=e(),u=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,d=`#version 300 es
precision highp float;
uniform sampler2D uAccum;
uniform float uSamples;
out vec4 fragColor;
void main() {
  vec3 c = texelFetch(uAccum, ivec2(gl_FragCoord.xy), 0).rgb / max(uSamples, 1.0);
  c = c / (c + vec3(1.0));              // Reinhard tonemap
  fragColor = vec4(pow(c, vec3(0.4545)), 1.0); // gamma
}`;function f(e,t,n){let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r);throw e.deleteShader(r),Error(`Shader failed to compile: ${t}`)}return r}function p(e,t){let n=e.createProgram();if(e.attachShader(n,f(e,e.VERTEX_SHADER,u)),e.attachShader(n,f(e,e.FRAGMENT_SHADER,t)),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS))throw Error(`Program failed to link: ${e.getProgramInfoLog(n)}`);return n}function m({fragment:e,uniforms:t={},accumulate:n=!1,resetKey:r,className:i=``,onSamples:a}){let o=(0,c.useRef)(null),[s,u]=(0,c.useState)(null),f=(0,c.useRef)(t);f.current=t;let m=(0,c.useRef)(a);return m.current=a,(0,c.useEffect)(()=>{let t=o.current;if(!t)return;let r=t.getContext(`webgl2`,{antialias:!1,alpha:!1,powerPreference:`high-performance`});if(!r){u(`This exhibit needs WebGL 2, which this browser or device does not provide.`);return}let i=r,a=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,s,c=null;try{s=p(i,e),n&&(c=p(i,d))}catch(e){u(e instanceof Error?e.message:`Shader error`);return}let l=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,l),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),i.STATIC_DRAW);let h=i.createVertexArray();i.bindVertexArray(h),i.enableVertexAttribArray(0),i.vertexAttribPointer(0,2,i.FLOAT,!1,0,0),i.bindAttribLocation(s,0,`aPos`);let g=[],_=0,v=0,y=!!i.getExtension(`EXT_color_buffer_float`),b=n&&y;function x(e,t){g.forEach(e=>{i.deleteFramebuffer(e.fbo),i.deleteTexture(e.tex)}),g=[0,1].map(()=>{let n=i.createTexture();i.bindTexture(i.TEXTURE_2D,n),i.texImage2D(i.TEXTURE_2D,0,i.RGBA16F,e,t,0,i.RGBA,i.HALF_FLOAT,null),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let r=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,r),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,n,0),i.clearColor(0,0,0,1),i.clear(i.COLOR_BUFFER_BIT),{fbo:r,tex:n}}),i.bindFramebuffer(i.FRAMEBUFFER,null),v=0}let S=1,C=1;function w(){let e=t.getBoundingClientRect(),n=Math.min(window.devicePixelRatio||1,1.75),r=Math.max(1,Math.floor(e.width*n)),i=Math.max(1,Math.floor(e.height*n));r===S&&i===C||(S=r,C=i,t.width=S,t.height=C,b&&x(S,C))}w();let T=new ResizeObserver(w);T.observe(t);let E=!0,D=new IntersectionObserver(([e])=>{E=e.isIntersecting},{threshold:.01});D.observe(t);let O=performance.now(),k=0;function A(e,t){let n=(t,n)=>{let r=i.getUniformLocation(e,t);r&&i.uniform1f(r,n)},r=i.getUniformLocation(e,`uResolution`);r&&i.uniform2f(r,S,C),n(`uTime`,t),n(`uFrame`,v),Object.entries(f.current).forEach(([e,t])=>n(e,t))}function j(){if(k=requestAnimationFrame(j),!E)return;let e=a?1.2:(performance.now()-O)/1e3;if(i.bindVertexArray(h),b&&c&&g.length===2){let t=g[_],n=g[1-_];i.useProgram(s),i.bindFramebuffer(i.FRAMEBUFFER,n.fbo),i.viewport(0,0,S,C),A(s,e),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,t.tex);let r=i.getUniformLocation(s,`uPrev`);r&&i.uniform1i(r,0),i.drawArrays(i.TRIANGLES,0,3),v+=1,_=1-_,i.useProgram(c),i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,S,C),i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,n.tex),i.uniform1i(i.getUniformLocation(c,`uAccum`),0),i.uniform1f(i.getUniformLocation(c,`uSamples`),v),i.drawArrays(i.TRIANGLES,0,3),v%8==0&&m.current?.(v)}else if(i.useProgram(s),i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,S,C),A(s,e),i.drawArrays(i.TRIANGLES,0,3),a&&!n){cancelAnimationFrame(k);return}}k=requestAnimationFrame(j);let M=e=>{e.preventDefault(),cancelAnimationFrame(k),u(`The graphics context was lost. Reload the page to restart this exhibit.`)};return t.addEventListener(`webglcontextlost`,M),()=>{cancelAnimationFrame(k),T.disconnect(),D.disconnect(),t.removeEventListener(`webglcontextlost`,M),g.forEach(e=>{i.deleteFramebuffer(e.fbo),i.deleteTexture(e.tex)}),i.deleteBuffer(l),i.deleteVertexArray(h),i.deleteProgram(s),c&&i.deleteProgram(c)}},[e,n,r]),s?(0,l.jsx)(`div`,{className:`flex items-center justify-center p-8 ${i}`,style:{background:`var(--surface)`},children:(0,l.jsx)(`p`,{className:`type-label max-w-sm text-center`,style:{color:`var(--fg-muted)`},children:s})}):(0,l.jsx)(`canvas`,{ref:o,className:i})}var h=34,g=24,_=4,v=900,y=.985,b={dark:{r:26,g:58,b:72,lr:44,lg:120,lb:110,base:.22,gain:.55,seam:`rgba(87, 210, 192, 0.26)`,pin:`#57d2c0`},light:{r:150,g:176,b:186,lr:-60,lg:-70,lb:-60,base:.3,gain:.55,seam:`rgba(31, 92, 140, 0.30)`,pin:`#1f5c8c`}};function x({wind:e,theme:t=`dark`,onTear:n}){let r=(0,c.useRef)(null),i=(0,c.useRef)(e);i.current=e;let a=(0,c.useRef)(t);a.current=t;let o=(0,c.useRef)(n);return o.current=n,(0,c.useEffect)(()=>{let e=r.current;if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,s=0,c=0,l=0,u=0,d=0,f=[],p=[];function m(){f=[],p=[],l=Math.min(s/(h+6),c/(g+8)),u=(s-l*(h-1))/2,d=l*2.2;for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=u+t*l,r=d+e*l;f.push({x:n,y:r,px:n,py:r,pinned:e===0&&t%4==0})}let e=(e,t)=>t*h+e;for(let t=0;t<g;t++)for(let n=0;n<h;n++)n<h-1&&p.push({a:e(n,t),b:e(n+1,t),rest:l}),t<g-1&&p.push({a:e(n,t),b:e(n,t+1),rest:l}),n<h-1&&t<g-1&&p.push({a:e(n,t),b:e(n+1,t+1),rest:l*Math.SQRT2})}function x(){let n=e.getBoundingClientRect(),r=Math.min(window.devicePixelRatio||1,2);s=n.width,c=n.height,e.width=Math.max(1,Math.floor(s*r)),e.height=Math.max(1,Math.floor(c*r)),t.setTransform(r,0,0,r,0,0),m()}x();let S=new ResizeObserver(x);S.observe(e);let C={x:0,y:0,down:!1,grabbed:-1};function w(t){let n=e.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}}function T(t){let{x:n,y:r}=w(t);C.x=n,C.y=r,C.down=!0;let i=-1,a=l*2.5;f.forEach((e,t)=>{let o=Math.hypot(e.x-n,e.y-r);o<a&&(a=o,i=t)}),C.grabbed=i,i>=0&&e.setPointerCapture(t.pointerId)}function E(e){let{x:t,y:n}=w(e);C.x=t,C.y=n}function D(){C.down=!1,C.grabbed=-1}function O(t){let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top,a=p.length;p=p.filter(e=>{let t=f[e.a];return Math.hypot(t.x-r,t.y-i)>l*1.8}),p.length!==a&&o.current?.()}e.addEventListener(`pointerdown`,T),e.addEventListener(`pointermove`,E),e.addEventListener(`pointerup`,D),e.addEventListener(`pointercancel`,D),e.addEventListener(`dblclick`,O);let k=0,A=performance.now(),j=0;function M(e){j+=e;let t=i.current;for(let n of f){if(n.pinned)continue;let r=(n.x-n.px)*y,i=(n.y-n.py)*y;n.px=n.x,n.py=n.y;let a=Math.sin(j*1.7+n.y*.012)*.5+.5;n.x+=r+t*a*e*60,n.y+=i+v*e*e}if(C.down&&C.grabbed>=0){let e=f[C.grabbed];e.x=C.x,e.y=C.y,e.px=C.x,e.py=C.y}for(let e=0;e<_;e++)for(let e of p){let t=f[e.a],n=f[e.b],r=n.x-t.x,i=n.y-t.y,a=Math.hypot(r,i)||1e-4,o=(a-e.rest)/a,s=r*.5*o,c=i*.5*o;t.pinned||(t.x+=s,t.y+=c),n.pinned||(n.x-=s,n.y-=c)}}function N(){t.clearRect(0,0,s,c);let e=b[a.current],n=(e,t)=>t*h+e;for(let r=0;r<g-1;r++)for(let i=0;i<h-1;i++){let a=f[n(i,r)],o=f[n(i+1,r)],s=f[n(i+1,r+1)],c=f[n(i,r+1)],u=Math.abs((o.x-a.x)*(c.y-a.y)-(c.x-a.x)*(o.y-a.y)),d=Math.min(1,u/(l*l));t.fillStyle=`rgba(${Math.round(e.r+d*e.lr)}, ${Math.round(e.g+d*e.lg)}, ${Math.round(e.b+d*e.lb)}, ${e.base+d*e.gain})`,t.beginPath(),t.moveTo(a.x,a.y),t.lineTo(o.x,o.y),t.lineTo(s.x,s.y),t.lineTo(c.x,c.y),t.closePath(),t.fill()}t.strokeStyle=e.seam,t.lineWidth=.7,t.beginPath();for(let e of p){let n=f[e.a],r=f[e.b];t.moveTo(n.x,n.y),t.lineTo(r.x,r.y)}t.stroke(),t.fillStyle=e.pin;for(let e of f)e.pinned&&(t.beginPath(),t.arc(e.x,e.y,2.8,0,Math.PI*2),t.fill())}function P(e){k=requestAnimationFrame(P);let t=Math.min((e-A)/1e3,1/30);A=e,M(t),N()}if(n){for(let e=0;e<240;e++)M(1/60);N()}else k=requestAnimationFrame(P);return()=>{cancelAnimationFrame(k),S.disconnect(),e.removeEventListener(`pointerdown`,T),e.removeEventListener(`pointermove`,E),e.removeEventListener(`pointerup`,D),e.removeEventListener(`pointercancel`,D),e.removeEventListener(`dblclick`,O)}},[]),(0,l.jsx)(`canvas`,{ref:r,className:`h-full w-full cursor-grab touch-none active:cursor-grabbing`,"aria-label":`Interactive cloth simulation. Drag to pull the fabric, double-click to tear it.`})}var S=`
float hash11(float n) { return fract(sin(n) * 43758.5453123); }
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1,0)), u.x),
             mix(hash21(i + vec2(0,1)), hash21(i + vec2(1,1)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
`,C=`#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uMode;      // 0 beauty · 1 albedo · 2 normal · 3 depth · 4 AO · 5 steps
uniform float uLight;     // 0 dark theme · 1 light theme
out vec4 fragColor;
${S}

const float MAX_DIST = 40.0;

// Returns (distance, materialId)
vec2 map(vec3 p) {
  vec2 res = vec2(p.y + 1.0, 0.0);                       // ground

  vec3 sp = p - vec3(-1.5, -0.25, 0.5);
  float sphere = length(sp) - 0.75;
  if (sphere < res.x) res = vec2(sphere, 1.0);

  vec3 bp = p - vec3(1.4, -0.35, -0.3);
  bp.xz *= rot(uTime * 0.35);
  vec3 q = abs(bp) - vec3(0.55);
  float box = length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - 0.05;
  if (box < res.x) res = vec2(box, 2.0);

  vec3 tp = p - vec3(0.0, 0.35, -1.8);
  tp.yz *= rot(uTime * 0.5);
  vec2 tq = vec2(length(tp.xz) - 0.85, tp.y);
  float torus = length(tq) - 0.22;
  if (torus < res.x) res = vec2(torus, 3.0);

  return res;
}

vec3 albedoFor(float id, vec3 p) {
  if (id < 0.5) {
    float check = mod(floor(p.x) + floor(p.z), 2.0);
    vec3 a = mix(vec3(0.22, 0.24, 0.26), vec3(0.62, 0.64, 0.66), uLight);
    vec3 b = mix(vec3(0.32, 0.34, 0.37), vec3(0.78, 0.79, 0.81), uLight);
    return mix(a, b, check);
  }
  if (id < 1.5) return vec3(0.85, 0.31, 0.24);
  if (id < 2.5) return vec3(0.34, 0.82, 0.74);
  return vec3(0.92, 0.76, 0.30);
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(
    map(p + e.xyy).x - map(p - e.xyy).x,
    map(p + e.yxy).x - map(p - e.yxy).x,
    map(p + e.yyx).x - map(p - e.yyx).x
  ));
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0, sca = 1.0;
  for (int i = 0; i < 5; i++) {
    float h = 0.02 + 0.14 * float(i);
    occ += (h - map(p + n * h).x) * sca;
    sca *= 0.72;
  }
  return clamp(1.0 - 1.4 * occ, 0.0, 1.0);
}

float softShadow(vec3 ro, vec3 rd) {
  float res = 1.0, t = 0.05;
  for (int i = 0; i < 40; i++) {
    float h = map(ro + rd * t).x;
    res = min(res, 9.0 * h / t);
    t += clamp(h, 0.02, 0.35);
    if (res < 0.005 || t > 12.0) break;
  }
  return clamp(res, 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

  float ang = 0.5 + sin(uTime * 0.12) * 0.35;
  vec3 ro = vec3(sin(ang) * 5.2, 1.5, cos(ang) * 5.2);
  vec3 ta = vec3(0.0, -0.2, -0.3);
  vec3 fw = normalize(ta - ro);
  vec3 rt = normalize(cross(vec3(0, 1, 0), fw));
  vec3 up = cross(fw, rt);
  vec3 rd = normalize(uv.x * rt + uv.y * up + 1.6 * fw);

  float t = 0.0;
  float steps = 0.0;
  vec2 hit = vec2(-1.0);
  for (int i = 0; i < 110; i++) {
    vec3 p = ro + rd * t;
    vec2 h = map(p);
    steps += 1.0;
    if (h.x < 0.001 * t) { hit = vec2(t, h.y); break; }
    t += h.x;
    if (t > MAX_DIST) break;
  }

  vec3 skyDark  = mix(vec3(0.035, 0.05, 0.07), vec3(0.08, 0.12, 0.16), smoothstep(-0.3, 0.6, rd.y));
  vec3 skyLight = mix(vec3(0.90, 0.92, 0.94), vec3(0.68, 0.76, 0.86), smoothstep(-0.3, 0.6, rd.y));
  vec3 sky = mix(skyDark, skyLight, uLight);

  if (hit.x < 0.0) {
    // Off-surface pixels still need to answer honestly per channel.
    if (uMode > 2.5 && uMode < 3.5) { fragColor = vec4(vec3(0.0), 1.0); return; }
    if (uMode > 1.5 && uMode < 2.5) { fragColor = vec4(vec3(0.5), 1.0); return; }
    if (uMode > 4.5) { fragColor = vec4(vec3(steps / 110.0), 1.0); return; }
    fragColor = vec4(sky, 1.0);
    return;
  }

  vec3 p = ro + rd * hit.x;
  vec3 n = calcNormal(p);
  vec3 albedo = albedoFor(hit.y, p);
  float ao = calcAO(p, n);

  if (uMode < 0.5) {
    vec3 lightDir = normalize(vec3(0.7, 0.85, 0.35));
    float diffuse = clamp(dot(n, lightDir), 0.0, 1.0);
    float shadow = softShadow(p + n * 0.02, lightDir);
    float fresnel = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 4.0);
    vec3 spec = vec3(pow(clamp(dot(reflect(-lightDir, n), -rd), 0.0, 1.0), 48.0)) * shadow;

    vec3 col = albedo * (0.16 * ao + diffuse * shadow * 1.05);
    col += spec * 0.55 + fresnel * 0.12;
    col = mix(col, sky, 1.0 - exp(-0.008 * hit.x * hit.x));
    col = col / (col + vec3(1.0));
    fragColor = vec4(pow(col, vec3(0.4545)), 1.0);
  } else if (uMode < 1.5) {
    fragColor = vec4(pow(albedo, vec3(0.4545)), 1.0);
  } else if (uMode < 2.5) {
    fragColor = vec4(n * 0.5 + 0.5, 1.0);
  } else if (uMode < 3.5) {
    float d = 1.0 - clamp(hit.x / 14.0, 0.0, 1.0);
    fragColor = vec4(vec3(d), 1.0);
  } else if (uMode < 4.5) {
    fragColor = vec4(vec3(ao), 1.0);
  } else {
    // Step count: the actual cost heatmap of the march.
    float c = steps / 110.0;
    vec3 heat = mix(vec3(0.05, 0.12, 0.2), vec3(0.95, 0.35, 0.2), c);
    fragColor = vec4(heat, 1.0);
  }
}`,w=`#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uFoam;   // foam width
uniform float uBands;  // lighting quantisation steps
uniform float uLight;  // 0 dark theme · 1 light theme
out vec4 fragColor;
${S}

float waves(vec2 p) {
  float w = sin(p.x * 1.6 + uTime * 1.1) * 0.11;
  w += sin(p.y * 2.1 - uTime * 0.8) * 0.07;
  w += sin((p.x + p.y) * 3.1 + uTime * 1.7) * 0.035;
  w += fbm(p * 1.4 + uTime * 0.12) * 0.08;
  return w;
}

// Objects sitting in the water; their intersection with the surface is where
// the foam line comes from.
float objects(vec3 p) {
  float d = length(p - vec3(-1.1, 0.02, 0.4)) - 0.62;
  d = min(d, length(p - vec3(1.35, 0.10, -0.9)) - 0.42);
  vec3 q = p - vec3(0.35, 0.0, -2.2);
  q.xz *= rot(0.6);
  vec3 b = abs(q) - vec3(0.5, 0.34, 0.5);
  d = min(d, length(max(b, 0.0)) + min(max(b.x, max(b.y, b.z)), 0.0));
  return d;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

  vec3 ro = vec3(0.0, 1.55, 4.6);
  vec3 ta = vec3(0.0, 0.0, 0.0);
  vec3 fw = normalize(ta - ro);
  vec3 rt = normalize(cross(vec3(0, 1, 0), fw));
  vec3 up = cross(fw, rt);
  vec3 rd = normalize(uv.x * rt + uv.y * up + 1.5 * fw);

  vec3 skyDay  = mix(vec3(0.51, 0.72, 0.82), vec3(0.16, 0.30, 0.45), smoothstep(0.0, 0.5, rd.y));
  vec3 skyDusk = mix(vec3(0.16, 0.20, 0.28), vec3(0.05, 0.07, 0.12), smoothstep(0.0, 0.5, rd.y));
  vec3 sky = mix(skyDusk, skyDay, uLight);

  // March the objects first so they can occlude the water.
  float t = 0.0; bool hitObj = false; vec3 objP = vec3(0.0);
  for (int i = 0; i < 70; i++) {
    vec3 p = ro + rd * t;
    float d = objects(p);
    if (d < 0.002) { hitObj = true; objP = p; break; }
    t += d; if (t > 22.0) break;
  }

  // Water plane at y = 0.
  float tw = (rd.y < -0.001) ? (-ro.y / rd.y) : -1.0;
  bool hitWater = tw > 0.0 && (!hitObj || tw < t);

  vec3 col = sky;

  if (hitObj && !hitWater) {
    vec2 e = vec2(0.002, 0.0);
    vec3 n = normalize(vec3(
      objects(objP + e.xyy) - objects(objP - e.xyy),
      objects(objP + e.yxy) - objects(objP - e.yxy),
      objects(objP + e.yyx) - objects(objP - e.yyx)));
    float diff = clamp(dot(n, normalize(vec3(0.6, 0.8, 0.4))), 0.0, 1.0);
    float bands = max(uBands, 2.0);
    diff = floor(diff * bands) / bands;
    col = vec3(0.92, 0.72, 0.46) * (0.35 + diff * 0.8);
  } else if (hitWater) {
    vec3 p = ro + rd * tw;
    float h = waves(p.xz);

    vec2 e = vec2(0.06, 0.0);
    vec3 n = normalize(vec3(
      waves(p.xz - e.xy) - waves(p.xz + e.xy),
      0.35,
      waves(p.xz - e.yx) - waves(p.xz + e.yx)));

    vec3 shallow = vec3(0.26, 0.72, 0.78);
    vec3 deep = vec3(0.06, 0.24, 0.44);
    float depthFade = smoothstep(0.0, 9.0, tw);
    vec3 water = mix(shallow, deep, depthFade);

    float diff = clamp(dot(n, normalize(vec3(0.6, 0.9, 0.35))), 0.0, 1.0);
    float bands = max(uBands, 2.0);
    water *= 0.72 + floor(diff * bands) / bands * 0.5;

    // Specular glints, also quantised — that banding is the toon look.
    float spec = pow(clamp(dot(reflect(-normalize(vec3(0.6, 0.9, 0.35)), n), -rd), 0.0, 1.0), 40.0);
    water += vec3(1.0) * step(0.35, spec) * 0.55;

    // Foam where the surface meets an object, plus a crest line on the waves.
    float dObj = objects(vec3(p.x, 0.0, p.z));
    float foamWidth = max(uFoam, 0.02);
    float shore = 1.0 - smoothstep(0.0, foamWidth, dObj);
    float crest = smoothstep(0.055, 0.075, h);
    float foam = clamp(shore + crest * 0.55, 0.0, 1.0);
    foam *= 0.85 + 0.15 * fbm(p.xz * 5.0 + uTime * 0.4);
    water = mix(water, vec3(0.96, 0.99, 1.0), step(0.45, foam));

    col = mix(water, sky, smoothstep(14.0, 26.0, tw));
  }

  col = pow(clamp(col, 0.0, 1.0), vec3(0.9));
  fragColor = vec4(col, 1.0);
}`,T=`#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uFrame;
uniform float uLight;
uniform sampler2D uPrev;
out vec4 fragColor;

const int MAX_BOUNCES = 5;
const float PI = 3.14159265;

uint seed;
uint wangHash(uint s) {
  s = (s ^ 61u) ^ (s >> 16u); s *= 9u;
  s = s ^ (s >> 4u); s *= 0x27d4eb2du; s = s ^ (s >> 15u);
  return s;
}
float rnd() { seed = wangHash(seed); return float(seed) / 4294967296.0; }

vec3 cosineHemisphere(vec3 n) {
  float r1 = rnd(), r2 = rnd();
  float phi = 2.0 * PI * r1;
  float r = sqrt(r2);
  vec3 w = n;
  vec3 u = normalize(cross(abs(w.x) > 0.1 ? vec3(0,1,0) : vec3(1,0,0), w));
  vec3 v = cross(w, u);
  return normalize(u * r * cos(phi) + v * r * sin(phi) + w * sqrt(1.0 - r2));
}

// id: 0 diffuse, 1 metal, 2 emissive
struct Sphere { vec3 c; float r; vec3 albedo; int mat; float rough; };

const int COUNT = 6;
Sphere scene(int i) {
  if (i == 0) return Sphere(vec3(0.0, -1000.5, 0.0), 1000.0, vec3(0.62), 0, 0.0);
  if (i == 1) return Sphere(vec3(-1.05, 0.0, -0.3), 0.5, vec3(0.85, 0.32, 0.26), 0, 0.0);
  if (i == 2) return Sphere(vec3(0.15, 0.0, 0.0), 0.5, vec3(0.95, 0.92, 0.88), 1, 0.02);
  if (i == 3) return Sphere(vec3(1.35, 0.0, -0.35), 0.5, vec3(0.72, 0.78, 0.95), 1, 0.22);
  if (i == 4) return Sphere(vec3(0.2, 2.4, 0.6), 1.1, vec3(9.0, 8.4, 7.4), 2, 0.0);
  return Sphere(vec3(-0.5, -0.28, 0.85), 0.22, vec3(0.35, 0.82, 0.62), 0, 0.0);
}

float hitSphere(Sphere s, vec3 ro, vec3 rd) {
  vec3 oc = ro - s.c;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - s.r * s.r;
  float disc = b * b - c;
  if (disc < 0.0) return -1.0;
  float sq = sqrt(disc);
  float t = -b - sq;
  if (t > 0.001) return t;
  t = -b + sq;
  return t > 0.001 ? t : -1.0;
}

vec3 trace(vec3 ro, vec3 rd) {
  vec3 throughput = vec3(1.0);
  vec3 radiance = vec3(0.0);

  for (int bounce = 0; bounce < MAX_BOUNCES; bounce++) {
    float best = 1e9; int bestIdx = -1;
    for (int i = 0; i < COUNT; i++) {
      float t = hitSphere(scene(i), ro, rd);
      if (t > 0.0 && t < best) { best = t; bestIdx = i; }
    }

    if (bestIdx < 0) {
      // Sky as the remaining light source.
      float k = 0.5 * (rd.y + 1.0);
      vec3 skyDark  = mix(vec3(0.16, 0.18, 0.22), vec3(0.42, 0.56, 0.78), k);
      vec3 skyLight = mix(vec3(0.62, 0.66, 0.72), vec3(0.85, 0.92, 1.05), k);
      radiance += throughput * mix(skyDark, skyLight, uLight) * 0.9;
      break;
    }

    Sphere s = scene(bestIdx);
    vec3 p = ro + rd * best;
    vec3 n = normalize(p - s.c);

    if (s.mat == 2) { radiance += throughput * s.albedo; break; }

    if (s.mat == 1) {
      vec3 reflected = reflect(normalize(rd), n);
      rd = normalize(reflected + s.rough * (cosineHemisphere(n) - reflected) * 0.9);
      throughput *= s.albedo;
    } else {
      rd = cosineHemisphere(n);
      throughput *= s.albedo;
    }
    ro = p + n * 0.002;

    // Russian roulette keeps long paths unbiased without paying for them.
    float q = max(throughput.r, max(throughput.g, throughput.b));
    if (bounce > 1) {
      if (rnd() > q) break;
      throughput /= max(q, 0.001);
    }
  }
  return radiance;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  seed = uint(frag.x) * 1973u + uint(frag.y) * 9277u + uint(uFrame) * 26699u + 1u;

  // Jitter within the pixel: this is the antialiasing.
  vec2 uv = (frag + vec2(rnd(), rnd()) - 0.5 * uResolution) / uResolution.y;

  vec3 ro = vec3(0.0, 0.55, 3.6);
  vec3 ta = vec3(0.1, 0.15, 0.0);
  vec3 fw = normalize(ta - ro);
  vec3 rt = normalize(cross(vec3(0, 1, 0), fw));
  vec3 up = cross(fw, rt);
  vec3 rd = normalize(uv.x * rt + uv.y * up + 1.7 * fw);

  vec3 sampleColor = trace(ro, rd);
  vec3 prev = texelFetch(uPrev, ivec2(frag), 0).rgb;
  fragColor = vec4(prev + clamp(sampleColor, 0.0, 12.0), 1.0);
}`,E={live:`Running live`,rebuilt:`Rebuilt for the browser`,capture:`Captured from the native build`,playable:`Playable — real build`},D=[{id:`passes`,kind:`shader`,fragment:C,title:`Render passes`,sub:`Raymarched SDF scene · WebGL 2`,caption:`One scene, six buffers. This is what a deferred renderer keeps around before it decides what a pixel looks like. Switch channels to see each one.`,provenance:`live`,projectSlug:`hernan-engine`,enabled:!0,controls:[{kind:`segmented`,id:`uMode`,label:`Buffer`,options:[`Beauty`,`Albedo`,`Normal`,`Depth`,`AO`,`Cost`]}]},{id:`cloth`,kind:`sim`,sim:`cloth`,title:`Garment solver`,sub:`Position-based dynamics · 800 particles`,caption:`A real solver: Verlet integration with iterative distance constraints, the same family of method behind the cloth work at MSLab. Drag to pull it. Double-click to tear it.`,provenance:`live`,enabled:!0,controls:[{kind:`range`,id:`wind`,label:`Wind`,min:-1.2,max:1.2,step:.05}]},{id:`pathtracer`,kind:`shader`,fragment:T,accumulate:!0,title:`Path tracer`,sub:`Progressive Monte Carlo · 1 spp per frame`,caption:`One sample per pixel per frame, accumulating into a float buffer. The noise clearing as you watch is what unbiased integration actually looks like. The original is C++ on the Nori framework.`,provenance:`rebuilt`,projectSlug:`nori-path-tracer`,enabled:!0},{id:`water`,kind:`shader`,fragment:w,title:`Toon water`,sub:`Banded shading · intersection foam`,caption:`Quantised lighting and a foam line where the surface meets geometry. The original is HLSL in Unity; this is the same technique written as a fragment program.`,provenance:`rebuilt`,projectSlug:`water-toon-shader`,enabled:!0,controls:[{kind:`range`,id:`uFoam`,label:`Foam`,min:.02,max:.4,step:.01},{kind:`range`,id:`uBands`,label:`Bands`,min:2,max:12,step:1}]},{id:`hernan-capture`,kind:`video`,src:`/video/hernan-engine.webm`,title:`Hernan Engine`,sub:`C++ · Vulkan · captured at 1080p`,caption:`The engine running natively — deferred lighting, the editor viewport, and the Vulkan backend in progress. Vulkan has no browser target, so this is the real build on video rather than a reproduction.`,provenance:`capture`,projectSlug:`hernan-engine`,enabled:!1},{id:`ninja-playable`,kind:`embed`,src:`https://itch.io/embed-upload/0000000?color=333333`,ratio:16/9,title:`Super Ninja Deathmatch`,sub:`Unity WebGL build`,caption:`The actual game, compiled to WebGL and playable here. Local multiplayer works with several people on one keyboard.`,provenance:`playable`,projectSlug:`super-ninja-deathmatch`,enabled:!1}].filter(e=>e.enabled);function O({demo:e}){let t=e.provenance===`rebuilt`;return(0,l.jsx)(`span`,{className:`type-label border px-2 py-1`,style:{borderColor:t?`var(--marker)`:`var(--accent)`,color:t?`var(--marker)`:`var(--accent)`},children:E[e.provenance]})}function k({demo:e,values:t,theme:n}){let r={borderColor:`var(--rule)`,background:`var(--surface)`},i={...t,uLight:+(n===`light`)};return e.kind===`shader`?(0,l.jsx)(`div`,{className:`h-full w-full border`,style:r,children:(0,l.jsx)(m,{fragment:e.fragment,accumulate:e.accumulate,resetKey:`${e.id}-${n}`,uniforms:i,className:`block h-full w-full`})}):e.kind===`sim`?(0,l.jsx)(`div`,{className:`h-full w-full border`,style:r,children:(0,l.jsx)(x,{wind:t.wind??.35,theme:n})}):e.kind===`video`?(0,l.jsx)(`div`,{className:`h-full w-full border`,style:r,children:(0,l.jsx)(`video`,{src:e.src,poster:e.poster,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,controls:!0,className:`block h-full w-full object-contain`})}):(0,l.jsx)(`div`,{className:`h-full w-full border`,style:r,children:(0,l.jsx)(`iframe`,{src:e.src,title:e.title,allowFullScreen:!0,className:`block h-full w-full`,style:{border:0}})})}function A(){let{resolved:e}=n(),[t,o]=(0,c.useState)(D[0]?.id),u=D.find(e=>e.id===t)??D[0],[d,f]=(0,c.useState)(()=>{let e={};for(let t of D){e[t.id]={};for(let n of t.controls??[])e[t.id][n.id]=n.kind===`segmented`?0:(n.min+n.max)/2;t.kind===`sim`&&(e[t.id].wind=.35)}return e}),p=(0,c.useMemo)(()=>d[u?.id??``]??{},[d,u]);function m(e,t){u&&f(n=>({...n,[u.id]:{...n[u.id],[e]:t}}))}if((0,c.useEffect)(()=>{let e=e=>{if(e.target instanceof HTMLInputElement)return;let n=D.findIndex(e=>e.id===t);n<0||(e.key===`ArrowRight`&&o(D[(n+1)%D.length].id),e.key===`ArrowLeft`&&o(D[(n-1+D.length)%D.length].id))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[t]),!u)return(0,l.jsx)(r,{children:(0,l.jsx)(`div`,{className:`mx-auto w-full max-w-6xl px-5 py-24 md:px-8`,children:(0,l.jsx)(`p`,{className:`type-label`,style:{color:`var(--fg-muted)`},children:`No demos are switched on right now.`})})});let h=u.projectSlug?a.find(e=>e.slug===u.projectSlug):void 0;return(0,l.jsx)(r,{children:(0,l.jsxs)(`div`,{className:`mx-auto w-full max-w-6xl px-5 md:px-8`,children:[(0,l.jsxs)(`div`,{className:`flex flex-col gap-3 pt-12 md:pt-16`,children:[(0,l.jsx)(s,{children:(0,l.jsxs)(`div`,{className:`flex flex-wrap items-baseline justify-between gap-3`,children:[(0,l.jsx)(`p`,{className:`type-label`,style:{color:`var(--accent)`},children:`Demos`}),(0,l.jsxs)(`p`,{className:`type-label`,style:{color:`var(--fg-muted)`},children:[D.length,` running · ← → to switch`]})]})}),(0,l.jsx)(s,{delay:70,children:(0,l.jsx)(`h1`,{className:`type-display text-2xl md:text-4xl`,children:`Things running live in your browser`})}),(0,l.jsx)(s,{as:`seam`,delay:140}),(0,l.jsx)(s,{delay:180,children:(0,l.jsx)(`p`,{className:`measure pt-3 text-[0.95rem] leading-relaxed`,style:{color:`var(--fg-muted)`},children:`Each exhibit says whether it's code running now, a browser reproduction of a technique from one of my projects, or a capture of a native build. Nothing here downloads geometry — the shaders and the solver are all maths.`})})]}),(0,l.jsx)(`div`,{className:`flex flex-wrap gap-2 pt-8`,children:D.map(e=>{let t=e.id===u.id;return(0,l.jsx)(`button`,{type:`button`,"aria-pressed":t,onClick:()=>o(e.id),className:`type-label cursor-pointer border px-4 py-2.5 transition-transform duration-200 hover:-translate-y-0.5`,style:{borderColor:t?`var(--fg)`:`var(--rule)`,background:t?`var(--fg)`:`transparent`,color:t?`var(--bg)`:`var(--fg-muted)`},children:e.title},e.id)})}),(0,l.jsxs)(`div`,{className:`pt-6`,children:[(0,l.jsx)(`div`,{className:`w-full`,style:{aspectRatio:u.kind===`embed`?String(u.ratio??16/9):`16 / 9`},children:(0,l.jsx)(k,{demo:u,values:p,theme:e})}),(0,l.jsxs)(`div`,{className:`flex flex-wrap items-start justify-between gap-6 pt-4`,children:[(0,l.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,l.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,l.jsx)(`h2`,{className:`type-display text-lg`,style:{fontVariationSettings:`'wdth' 105, 'wght' 650`},children:u.title}),(0,l.jsx)(O,{demo:u})]}),(0,l.jsx)(`p`,{className:`type-label`,style:{color:`var(--fg-muted)`},children:u.sub}),(0,l.jsx)(`p`,{className:`measure text-sm leading-relaxed`,style:{color:`var(--fg-muted)`},children:u.caption}),h&&(0,l.jsxs)(i,{to:`/projects/${h.slug}`,className:`type-label pt-1 underline underline-offset-4 transition-opacity hover:opacity-70`,style:{color:`var(--fg)`},children:[`Read about `,h.title,` →`]})]}),u.controls&&u.controls.length>0&&(0,l.jsx)(`div`,{className:`flex flex-col items-start gap-3 md:items-end`,children:u.controls.map(e=>e.kind===`segmented`?(0,l.jsx)(`div`,{role:`group`,"aria-label":e.label,className:`flex flex-wrap border`,style:{borderColor:`var(--rule)`},children:e.options.map((t,n)=>{let r=(p[e.id]??0)===n;return(0,l.jsx)(`button`,{type:`button`,"aria-pressed":r,onClick:()=>m(e.id,n),className:`type-label cursor-pointer px-3 py-2 transition-colors`,style:{background:r?`var(--accent)`:`transparent`,color:r?`var(--bg)`:`var(--fg-muted)`,fontWeight:r?600:400},children:t},t)})},e.id):(0,l.jsxs)(`label`,{className:`flex items-center gap-3 border px-4 py-2.5`,style:{borderColor:`var(--rule)`},children:[(0,l.jsx)(`span`,{className:`type-label`,style:{color:`var(--fg-muted)`},children:e.label}),(0,l.jsx)(`input`,{type:`range`,min:e.min,max:e.max,step:e.step,value:p[e.id]??e.min,onChange:t=>m(e.id,Number(t.target.value)),className:`w-32`,style:{accentColor:`var(--accent)`}})]},e.id))})]})]})]})})}export{A as default};