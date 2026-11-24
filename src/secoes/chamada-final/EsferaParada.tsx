import { ESCALA_DO_F, FRACAO_AZUL, pontosDaEsfera, VISTA } from '@/esfera/geometria';
import { SIMBOLO } from '@/marca/simbolo';

// A esfera parada (reduzido, sem WebGL, sem JavaScript e antes de a cena chegar): o F do símbolo em --cor-azul
// e partículas paradas em volta, calculadas no build, na mesma escala da cena (VISTA).
const QUANTOS = 240;
const INCLINACAO = 0.35;
const GIRO = 0.6;
const f = (n: number) => Math.round(n * 1000) / 1000;

function pontos() {
  const p = pontosDaEsfera(QUANTOS, 1);
  const [cg, sg, ci, si] = [Math.cos(GIRO), Math.sin(GIRO), Math.cos(INCLINACAO), Math.sin(INCLINACAO)];
  const lista = [];
  for (let i = 0; i < QUANTOS; i++) {
    const [x0, y0, z0] = [p[3 * i], p[3 * i + 1], p[3 * i + 2]];
    const x = x0 * cg - z0 * sg;
    const z1 = x0 * sg + z0 * cg;
    const y = y0 * ci - z1 * si;
    const z = y0 * si + z1 * ci;
    // Os da frente maiores e mais escuros (opacidade de ~0,25 a ~0,9, design-system.md).
    lista.push({ x: f(x), y: f(-y), r: f(0.006 + 0.005 * (z + 1) / 2), o: f(0.25 + 0.65 * (z + 1) / 2), azul: (i * 7919) % 100 < FRACAO_AZUL * 100 });
  }
  return lista;
}

const LARGURA_DO_F = 2.3 * ESCALA_DO_F;
const k = LARGURA_DO_F / SIMBOLO.largura;

export function EsferaParada() {
  return (
    <svg className="esfera-parada" viewBox={`${-VISTA / 2} ${-VISTA / 2} ${VISTA} ${VISTA}`} aria-hidden="true" focusable="false">
      {pontos().map((p, i) => (
        <circle key={i} className={p.azul ? 'esfera-parada__ponto--azul' : undefined} cx={p.x} cy={p.y} r={p.r} fillOpacity={p.o} />
      ))}
      <g className="esfera-parada__f" transform={`translate(${f(-LARGURA_DO_F / 2)} ${f((-SIMBOLO.altura * k) / 2)}) scale(${k})`}>
        <path d={SIMBOLO.lamina} />
        <path d={SIMBOLO.braco} />
        <path d={SIMBOLO.haste} />
      </g>
    </svg>
  );
}
