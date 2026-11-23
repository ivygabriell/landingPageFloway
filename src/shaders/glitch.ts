// A palavra FLOWAY "fora de sintonia" da captura: uma cópia azul deslocada atrás e duas fatias horizontais que saem do
// lugar (com o fundo da página por baixo, sem a cópia azul). uTremor (0 a 1) sacode tudo: mais fatias, sorteadas por
// linha e a cada quadro do tremor, e a cópia azul mais longe. Adaptado do glitch do hero do site oficial.
// uMascara: a palavra em branco (só o alfa conta). uFatias[i] = (v de baixo, v de cima, deslocamento em u) no plano.
export const glitchFrag = /* glsl */ `
uniform sampler2D uMascara;
uniform vec3 uPreto;
uniform vec3 uAzul;
uniform float uAzulDx;
uniform vec3 uFatias[2];
uniform float uTremor;
uniform float uTempo;
uniform float uOpacidade;
varying vec2 vUv;

float sorteio(float n) { return fract(sin(n * 91.7) * 47453.3); }

void main() {
  float dx = 0.0;
  float fatia = 0.0;
  for (int i = 0; i < 2; i++) {
    vec3 f = uFatias[i];
    if (vUv.y > f.x && vUv.y < f.y) { dx = f.z * (1.0 + 2.0 * uTremor); fatia = 1.0; }
  }
  // Tremor: 14 quadros por segundo; em cada um, umas linhas finas saem do lugar.
  float quadro = floor(uTempo * 14.0);
  float linha = floor(vUv.y * 36.0);
  if (uTremor > 0.0 && sorteio(linha + quadro * 7.13) > 0.72) {
    dx += (sorteio(linha * 3.1 + quadro) - 0.5) * 0.06 * uTremor;
    fatia = 1.0;
  }
  float preto = texture2D(uMascara, vUv - vec2(dx, 0.0)).a;
  float azul = (1.0 - fatia) * 0.9 * texture2D(uMascara, vUv - vec2(uAzulDx * (1.0 + 3.0 * uTremor), 0.0)).a;
  // O preto por cima do azul (alfa pré-multiplicado).
  float alfa = preto + azul * (1.0 - preto);
  vec3 cor = (uPreto * preto + uAzul * azul * (1.0 - preto)) / max(alfa, 0.0001);
  gl_FragColor = vec4(cor, alfa * uOpacidade);
  #include <colorspace_fragment>
}
`;
