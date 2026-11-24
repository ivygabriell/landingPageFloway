import * as THREE from 'three';
import { ruido } from '@/shaders/comum';

// Adaptado do site oficial (compartilhados/esfera/shader.ts): pontos redondos no lugar das letras.
export const ESFERA = {
  // O cursor empurra as partículas até 38 px num raio de 110 px (desktop).
  empurrao: 38,
  raioDoCursor: 110,
  // A câmera fica a 3 raios do centro da esfera (a perspectiva do protótipo do site oficial).
  cameraEmRaios: 3,
  // A esfera inclinada, para os polos da espiral não ficarem de frente; o mesmo da EsferaParada.
  inclinacao: 0.35,
  // Teto do gl_PointSize: há Android com limite de 64 px.
  tetoDoPonto: 64,
} as const;

const glsl = (n: number) => (Number.isInteger(n) ? `${n}.0` : `${n}`);

// Um vértice por partícula; morfose, giro e cursor por uniformes (nenhum atributo muda por quadro).
export const esferaVert = /* glsl */ `
attribute vec3 aEsfera;
attribute vec3 aAlvo;
attribute float aNoF;
attribute float aAzul;
attribute float aTom;
attribute float aTamanho;
uniform float uMorf;
uniform float uTempo;
uniform float uGiro;
uniform float uRaio;
uniform float uDpr;
uniform vec2 uMouse;
varying float vAzul;
varying float vAlfa;
${ruido}
void main() {
  float m = uMorf * uMorf * (3.0 - 2.0 * uMorf) * aNoF;

  float c = cos(uGiro);
  float s = sin(uGiro);
  vec3 e = vec3(aEsfera.x * c - aEsfera.z * s, aEsfera.y, aEsfera.x * s + aEsfera.z * c);
  float ci = cos(${glsl(ESFERA.inclinacao)});
  float si = sin(${glsl(ESFERA.inclinacao)});
  e = vec3(e.x, e.y * ci - e.z * si, e.y * si + e.z * ci);

  // No F, as partículas ondulam de leve, para o desenho nunca ficar parado.
  vec3 f = aAlvo + 0.02 * vec3(ruido3(aAlvo * 6.0 + uTempo * 0.4) - 0.5, ruido3(aAlvo * 6.0 - uTempo * 0.4 + 9.0) - 0.5, 0.0);
  vec3 p = mix(e, f, m);
  vec3 q = vec3(p.xy * uRaio, p.z * cameraPosition.z / ${glsl(ESFERA.cameraEmRaios)});

  // O cursor empurra as partículas no plano da tela (unidades da cena = pixels).
  vec2 d = q.xy - uMouse;
  float dist = length(d);
  float k = (1.0 - clamp(dist / ${glsl(ESFERA.raioDoCursor)}, 0.0, 1.0)) * ${glsl(ESFERA.empurrao)};
  if (dist > 0.0) q.xy += d / dist * k;

  vec4 mv = modelViewMatrix * vec4(q, 1.0);
  // A perspectiva só age em volta do centro da esfera: fora do eixo da câmera, ela esticaria o globo numa elipse.
  vec3 centro = modelViewMatrix[3].xyz;
  mv.xy += centro.xy * (mv.z / centro.z - 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = min(aTamanho * uDpr, ${glsl(ESFERA.tetoDoPonto)});

  // No F, todas azuis e quase cheias; na esfera, as de trás mais claras.
  vAzul = max(aAzul, m);
  vAlfa = mix(aTom * clamp(0.6 + e.z * 0.4, 0.2, 1.0), 0.95, m);
}
`;

export const esferaFrag = /* glsl */ `
uniform vec3 uPreto;
uniform vec3 uAzul;
varying float vAzul;
varying float vAlfa;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  if (dot(c, c) > 0.25) discard;
  gl_FragColor = vec4(mix(uPreto, uAzul, vAzul), vAlfa);
  #include <colorspace_fragment>
}
`;

// As cores vêm dos tokens (--cor-preto e --cor-azul), lidas por quem cria o material.
export function criarMaterialDaEsfera(preto: string, azul: string): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: esferaVert,
    fragmentShader: esferaFrag,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uMorf: { value: 0 },
      uTempo: { value: 0 },
      uGiro: { value: 0.6 },
      uMouse: { value: new THREE.Vector2(1e5, 1e5) },
      uRaio: { value: 1 },
      uDpr: { value: 1 },
      uPreto: { value: new THREE.Color(preto) },
      uAzul: { value: new THREE.Color(azul) },
    },
  });
}
