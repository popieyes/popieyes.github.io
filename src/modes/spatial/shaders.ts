/**
 * Every exhibit is a fragment shader over a fullscreen triangle. No meshes, no
 * textures, no .glb — the entire Spatial mode adds a few kilobytes of source
 * rather than the 85 MB of models the old office scene needed.
 */

const COMMON = `
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
`;

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER PASS INSPECTOR — Hernan Engine
   One raymarched scene, six ways of looking at it. Switching channels is the
   fastest way to show that you understand what a deferred renderer stores.
   ═══════════════════════════════════════════════════════════════════════════ */
export const PASSES_SHADER = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uMode;      // 0 beauty · 1 albedo · 2 normal · 3 depth · 4 AO · 5 steps
out vec4 fragColor;
${COMMON}

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
    return mix(vec3(0.22, 0.24, 0.26), vec3(0.32, 0.34, 0.37), check);
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

  vec3 sky = mix(vec3(0.035, 0.05, 0.07), vec3(0.08, 0.12, 0.16), smoothstep(-0.3, 0.6, rd.y));

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
}`;

/* ═══════════════════════════════════════════════════════════════════════════
   TOON WATER — Water Toon Shader
   Banded lighting, a foam line where geometry meets the surface, and a wave
   field driving both. The Unity original's ideas, rebuilt for the browser.
   ═══════════════════════════════════════════════════════════════════════════ */
export const WATER_SHADER = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uFoam;   // foam width
uniform float uBands;  // lighting quantisation steps
out vec4 fragColor;
${COMMON}

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

  vec3 sky = mix(vec3(0.51, 0.72, 0.82), vec3(0.16, 0.30, 0.45), smoothstep(0.0, 0.5, rd.y));

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
}`;

/* ═══════════════════════════════════════════════════════════════════════════
   PROGRESSIVE PATH TRACER — Nori
   One sample per pixel per frame, accumulated into a float buffer. The noise
   converging as you watch is the honest signature of a Monte Carlo integrator.
   ═══════════════════════════════════════════════════════════════════════════ */
export const PATHTRACER_SHADER = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uFrame;
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
      radiance += throughput * mix(vec3(0.16, 0.18, 0.22), vec3(0.42, 0.56, 0.78), k) * 0.9;
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
}`;
