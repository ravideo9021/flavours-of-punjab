'use client';
import { useEffect, useRef } from 'react';

/**
 * The slow golden swirl behind the page (WebGL 2 fragment shader).
 *
 * Tuned for phones: rendered at half resolution (it is a soft gradient, so the
 * upscale is invisible — ~16x fewer pixels than full retina), capped at 30 fps,
 * started only after the page has loaded, paused in background tabs, and
 * drawn once as a still frame for reduced-motion, data-saver and low-memory
 * devices. Without WebGL the CSS gradient on `.ambient` shows instead.
 */

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform float u_time;
uniform float u_scale;
uniform vec2 u_resolution;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
out vec4 fragColor;
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) { return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv; }
float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
float noise(vec2 st) {
  vec2 i = floor(st); vec2 f = fract(st);
  float a = random(i), b = random(i + vec2(1.0, 0.0)), c = random(i + vec2(0.0, 1.0)), d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
vec3 blend(vec4 c1, vec4 c2, vec4 c3, float m) {
  float r1 = smoothstep(0.0, 0.7 + 0.005, m);
  float r2 = smoothstep(0.3, 1.0 + 0.01, m);
  return mix(mix(c1.rgb, c2.rgb, r1), c3.rgb, r2);
}
void main() {
  // Same look as the original preset: rotation -30deg, scale .52, distortion 5,
  // swirl .55 x 8 iterations, "edge" shape at 40% with 42% proportion.
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = 0.5 * u_time;
  float noiseScale = 0.0005 + 0.006 * 0.52;
  uv -= 0.5;
  uv *= noiseScale * u_resolution;
  uv = rotate(uv, -30.0 * PI / 180.0 * 0.5 * PI);
  uv /= u_scale;
  uv += 0.5;
  float n1 = noise(uv + t);
  float n2 = noise(uv * 2.0 - t);
  float angle = n1 * 6.28318530718;
  uv += 4.0 * 0.1 * n2 * vec2(cos(angle), sin(angle));
  for (float i = 1.0; i <= 8.0; i++) {
    uv.x += 0.55 / i * cos(t + i * 1.5 * uv.y);
    uv.y += 0.55 / i * cos(t + i * uv.x);
  }
  // Vertical falloff as it looked on the 2x (retina) screen it was designed on.
  float sh = 1.0 - uv.y;
  sh -= 0.5;
  sh /= noiseScale * (u_resolution.y / u_scale) * 2.0;
  sh += 0.5;
  float shaping = 0.2 * (1.0 - 0.4);
  float m = smoothstep(0.45 - shaping, 0.55 + shaping, sh + 0.3 * (0.42 - 0.5));
  fragColor = vec4(blend(u_color1, u_color2, u_color3, m), 1.0);
}`;

const VERTEX_SHADER = `#version 300 es
in vec4 a_position;
void main() { gl_Position = a_position; }`;

const COLORS = [
  [0x0d / 255, 0x0b / 255, 0x09 / 255, 1],
  [0x8b / 255, 0x69 / 255, 0x14 / 255, 1],
  [0x1a / 255, 0x16 / 255, 0x12 / 255, 1],
];

const RENDER_SCALE = 0.5;
const FRAME_MS = 1000 / 30;
const SPEED = 0.9;

export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cleanup = () => {};

    const start = () => {
      const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' });
      if (!gl) return;

      const compile = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };
      const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(program, 'u_time');
      const uResolution = gl.getUniformLocation(program, 'u_resolution');
      gl.uniform1f(gl.getUniformLocation(program, 'u_scale'), RENDER_SCALE);
      ['u_color1', 'u_color2', 'u_color3'].forEach((name, i) => gl.uniform4fv(gl.getUniformLocation(program, name), COLORS[i]));

      const resize = () => {
        canvas.width = Math.max(1, Math.round(window.innerWidth * RENDER_SCALE));
        canvas.height = Math.max(1, Math.round(window.innerHeight * RENDER_SCALE));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
      };
      resize();

      const t0 = performance.now();
      const render = (now) => {
        gl.uniform1f(uTime, ((now - t0) / 1000) * SPEED - 2.5);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      const still =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        navigator.connection?.saveData ||
        (navigator.deviceMemory && navigator.deviceMemory < 4);

      let raf = 0;
      let last = 0;
      const loop = (now) => {
        raf = requestAnimationFrame(loop);
        if (now - last < FRAME_MS) return;
        last = now;
        render(now);
      };
      const play = () => {
        cancelAnimationFrame(raf);
        if (!still && !document.hidden) raf = requestAnimationFrame(loop);
      };

      render(performance.now());
      canvas.classList.add('is-ready');
      play();

      const onResize = () => {
        resize();
        render(performance.now());
      };
      window.addEventListener('resize', onResize);
      document.addEventListener('visibilitychange', play);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', play);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
      };
    };

    // Wait for the page to finish loading so this never competes with content.
    let idleId = 0;
    const schedule = () => {
      const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 600));
      idleId = idle(start, { timeout: 2500 });
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      (window.cancelIdleCallback || clearTimeout)(idleId);
      cleanup();
    };
  }, []);

  return (
    <div className="ambient" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="ambient-grain" />
    </div>
  );
}
