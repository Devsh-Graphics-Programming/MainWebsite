"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);

  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.03 + 9.7;
    a *= 0.52;
  }

  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.032;
  vec2 drift = vec2(t, -t * 0.7);
  float field = fbm(p * 1.45 + drift);
  float softField = fbm(p * 2.15 - drift * 0.65 + field * 0.42);

  float centerGlow = exp(-dot(p * vec2(0.74, 1.12), p * vec2(0.74, 1.12)) * 1.42);
  float leftGlow = exp(-distance(p, vec2(-0.78, -0.05)) * 1.9);
  float rightGlow = exp(-distance(p, vec2(0.88, 0.05)) * 2.0);
  float ribbonA = exp(-pow(p.y + 0.18 * sin(p.x * 1.35 + u_time * 0.11) - 0.05, 2.0) * 6.0);
  ribbonA *= smoothstep(-1.55, -0.2, p.x) * (1.0 - smoothstep(0.45, 1.75, p.x));

  float ribbonB = exp(-pow(p.y - 0.14 * sin(p.x * 1.05 - u_time * 0.09) + 0.32, 2.0) * 7.4);
  ribbonB *= smoothstep(-0.6, 0.45, p.x) * (1.0 - smoothstep(1.15, 1.95, p.x));
  float textQuietZone = exp(-dot((p - vec2(-0.86, -0.08)) * vec2(1.05, 0.72), (p - vec2(-0.86, -0.08)) * vec2(1.05, 0.72)) * 1.55);

  vec2 mouse = u_mouse * 2.0 - 1.0;
  mouse.x *= u_resolution.x / u_resolution.y;
  float cursor = exp(-dot((p - mouse) * 1.4, (p - mouse) * 1.4) * 2.4);

  float veil = smoothstep(0.34, 0.88, softField) * 0.34;
  float body = centerGlow * 0.3 + leftGlow * 0.08 + rightGlow * 0.08 + veil + ribbonA * 0.13 + ribbonB * 0.08;
  float alpha = clamp(body + cursor * 0.09, 0.0, 0.62);
  alpha *= 1.0 - textQuietZone * 0.42;

  vec3 deep = vec3(0.015, 0.10, 0.095);
  vec3 teal = vec3(0.13, 0.72, 0.64);
  vec3 mint = vec3(0.58, 1.0, 0.86);
  vec3 cyan = vec3(0.20, 0.9, 0.84);
  vec3 color = mix(deep, teal, clamp(body * 1.6, 0.0, 1.0));
  color = mix(color, cyan, ribbonA * 0.22 + ribbonB * 0.16);
  color = mix(color, mint, cursor * 0.12 + centerGlow * 0.08);

  gl_FragColor = vec4(color, alpha);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function NablaShaderBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });

    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    let frame = 0;
    let start = performance.now();
    let mouseX = 0.48;
    let mouseY = 0.22;
    let smoothMouseX = mouseX;
    let smoothMouseY = mouseY;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      const width = Math.max(1, Math.min(1800, Math.floor(rect.width * dpr)));
      const height = Math.max(1, Math.min(1150, Math.floor(rect.height * dpr)));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const render = () => {
      resize();
      smoothMouseX += (mouseX - smoothMouseX) * 0.045;
      smoothMouseY += (mouseY - smoothMouseY) * 0.045;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, smoothMouseX, 1 - smoothMouseY);
      gl.uniform1f(timeLocation, reducedMotion ? 0 : (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (event.clientX - rect.left) / rect.width;
      mouseY = (event.clientY - rect.top) / rect.height;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else if (!reducedMotion) {
        start = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-x-0 top-0 h-[110svh] w-full opacity-95 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
      aria-hidden="true"
    />
  );
}
