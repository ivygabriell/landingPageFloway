'use client';

import { UseCanvas } from '@14islands/r3f-scroll-rig';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from '@/gsap';
import { dprMaximo, ehCelular } from '@/lib/ambiente';
import { CURVAS, INTERVALOS, TEMPOS } from '@/movimento/tokens';
import { vertUv } from '@/shaders/comum';
import { glitchFrag } from '@/shaders/glitch';
import { refracaoFrag, refracaoVert, sombraFrag } from '@/shaders/refracao';
import { desenharPalavra } from '@/texturas/palavra';
import { DESLIZE, INCLINACAO_DO_CURSOR, INICIO_MAXIMO_DA_ENTRADA, MARGEM_DA_PALAVRA, azulNoPlano, fatiasNoPlano, noMundo, type Caixa } from './disposicao';
import { criarLamina } from './laminas';

// Adaptada da CenaHero do site oficial (sitesFlowway): a palavra com glitch num plano e o vidro que refrata a cena
// desenhada sem ele. Aqui o vidro são as lâminas da captura, e a posição de tudo vem do CSS (a composição em SVG que
// fica no lugar sem WebGL), medida em disposicao.ts. Entra só por next/dynamic (Entrada.tsx), fora do pacote inicial.

// A captura gira as lâminas −8° no CSS (anti-horário); no canvas, com y para cima, é +8°.
const ROTACAO = THREE.MathUtils.degToRad(8);
// Sombra das lâminas na captura: 0 18px 40px no desktop e 0 8px 18px no celular, preto a 8 %.
const SOMBRA = { desktop: { y: 18, desfoque: 40 }, celular: { y: 8, desfoque: 18 }, alfa: 0.08 };
// Vidro da captura: papel a 16 % por cima e desfoque de fundo de 10 px (6 no celular); passo, em px entre as 9 amostras.
const VIDRO = { veu: 0.16, forca: 0.3, passo: { desktop: 2.2, celular: 1.3 } };

const corDoToken = (nome: string) => new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(nome).trim());

type Medidas = { palavra: Caixa; laminas: Caixa[]; raio: number; celular: boolean };

function medir(): Medidas | null {
  const quadro = document.querySelector<HTMLElement>('#topo .hero-quadro');
  if (!quadro) return null;
  const janela = { largura: window.innerWidth, altura: window.innerHeight };
  const caixa = (el: HTMLElement) => noMundo(el.getBoundingClientRect(), { largura: el.offsetWidth, altura: el.offsetHeight }, window.scrollY, janela);
  // As lâminas escondidas pelo CSS (no celular são 3) têm largura 0.
  const elementos = [...quadro.querySelectorAll<HTMLElement>('.hero-lamina')].filter((l) => l.offsetWidth > 0);
  const raio = elementos.length ? parseFloat(getComputedStyle(elementos[0]).borderTopLeftRadius) || 0 : 0;
  return { palavra: caixa(quadro), laminas: elementos.map(caixa), raio, celular: ehCelular(janela.largura) };
}

export function CenaHero() {
  return (
    <UseCanvas>
      <Cena />
    </UseCanvas>
  );
}

function Cena() {
  const { gl, scene, camera, size } = useThree();
  const [medidas, setMedidas] = useState<Medidas | null>(null);
  const refRaiz = useRef<THREE.Group>(null);
  const refPalavra = useRef<THREE.Mesh>(null);
  const laminas = useRef<(THREE.Group | null)[]>([]);
  // Valores animados pelo GSAP e lidos a cada quadro. subida: 1 = uma tela abaixo do lugar, 0 = no lugar.
  const estado = useRef({ opacidade: 0, tremor: 1, subida: [1, 1, 1, 1, 1], mouse: new THREE.Vector2(), alvoMouse: new THREE.Vector2(), pronta: false, ativa: false });

  const alvo = useMemo(() => new THREE.WebGLRenderTarget(1, 1), []);
  const textura = useMemo(() => {
    const largura = document.querySelector<HTMLElement>('#topo .hero-quadro')?.offsetWidth || window.innerWidth;
    const t = new THREE.CanvasTexture(desenharPalavra(largura * Math.min(window.devicePixelRatio, dprMaximo(window.innerWidth)), MARGEM_DA_PALAVRA));
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const materialPalavra = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertUv,
        fragmentShader: glitchFrag,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uMascara: { value: textura },
          uPreto: { value: corDoToken('--cor-preto') },
          uAzul: { value: corDoToken('--cor-azul') },
          uAzulDx: { value: 0 },
          uFatias: { value: [new THREE.Vector3(), new THREE.Vector3()] },
          uTremor: { value: 1 },
          uTempo: { value: 0 },
          uOpacidade: { value: 0 },
        },
      }),
    [textura],
  );
  const vidro = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: refracaoVert,
        fragmentShader: refracaoFrag,
        transparent: true,
        uniforms: {
          uFundo: { value: alvo.texture },
          uResolucao: { value: new THREE.Vector2(1, 1) },
          uClaro: { value: corDoToken('--cor-fundo') },
          uTempo: { value: 0 },
          uBorrao: { value: new THREE.Vector2() },
          uOpacidade: { value: 1 },
          uForca: { value: VIDRO.forca },
          uPassoBorrao: { value: VIDRO.passo.desktop },
          uVeu: { value: VIDRO.veu },
          uSerra: { value: 0 },
          uTinta: { value: 0 },
        },
      }),
    [alvo],
  );
  const sombra = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertUv,
        fragmentShader: sombraFrag,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uCor: { value: corDoToken('--cor-preto') },
          uAlfa: { value: SOMBRA.alfa },
          uTamanho: { value: new THREE.Vector2(1, 1) },
          uMeio: { value: new THREE.Vector2() },
          uRaio: { value: 0 },
          uDesfoque: { value: 1 },
          uOpacidade: { value: 1 },
        },
      }),
    [],
  );
  const plano = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  const primeira = medidas?.laminas[0];
  const proporcao = primeira ? primeira.altura / primeira.largura : 0;
  const raio = primeira && medidas ? medidas.raio / primeira.largura : 0;
  const lamina = useMemo(() => (proporcao ? criarLamina(proporcao, raio) : null), [proporcao, raio]);

  useEffect(
    () => () => {
      for (const d of [alvo, textura, materialPalavra, vidro, sombra, plano]) d.dispose();
      delete document.getElementById('topo')?.dataset.cena;
    },
    [alvo, textura, materialPalavra, vidro, sombra, plano],
  );
  useEffect(() => () => lamina?.dispose(), [lamina]);

  // O CSS dispõe; a cena mede de novo quando a tela muda e quando as fontes chegam (o selo e o título mexem na altura).
  useEffect(() => {
    let viva = true;
    const atualizar = () => viva && setMedidas(medir());
    atualizar();
    document.fonts?.ready.then(atualizar);
    return () => {
      viva = false;
    };
  }, [size]);

  useEffect(() => {
    if (!medidas) return;
    const v = gl.getDrawingBufferSize(new THREE.Vector2());
    alvo.setSize(v.x, v.y);
    vidro.uniforms.uResolucao.value.copy(v);
    vidro.uniforms.uPassoBorrao.value = VIDRO.passo[medidas.celular ? 'celular' : 'desktop'];
    const u = materialPalavra.uniforms;
    fatiasNoPlano(window.innerWidth).forEach((f, i) => u.uFatias.value[i].set(...f));
    u.uAzulDx.value = azulNoPlano(window.innerWidth);
    const l = medidas.laminas[0];
    if (l) {
      const { desfoque } = SOMBRA[medidas.celular ? 'celular' : 'desktop'];
      sombra.uniforms.uTamanho.value.set(l.largura + 2 * desfoque, l.altura + 2 * desfoque);
      sombra.uniforms.uMeio.value.set(l.largura / 2, l.altura / 2);
      sombra.uniforms.uRaio.value = medidas.raio;
      sombra.uniforms.uDesfoque.value = desfoque;
    }
  }, [medidas, gl, alvo, vidro, materialPalavra, sombra]);

  // Entrada (Notas · Hero): o glitch treme por 0,8 s e assenta; as lâminas sobem, uma depois da outra. Se a cena chegou
  // tarde (ou a seção já está pronta), entra direto no repouso, para a entrada nunca passar de 2 s.
  const medida = medidas !== null;
  useEffect(() => {
    if (!medida) return;
    const s = estado.current;
    const secao = document.getElementById('topo');
    const pronta = () => {
      s.pronta = true;
      if (secao) secao.dataset.entrada = 'pronta';
    };
    if (secao?.dataset.entrada === 'pronta' || performance.now() > INICIO_MAXIMO_DA_ENTRADA) {
      Object.assign(s, { opacidade: 1, tremor: 0 });
      s.subida.fill(0);
      pronta();
      return;
    }
    const entrada = gsap.timeline({ paused: true });
    entrada
      .to(s, { opacidade: 1, duration: TEMPOS['tempo-rapido'], ease: CURVAS['curva-padrao'] }, 0)
      .to(s, { tremor: 0, duration: TEMPOS['tempo-rapido'], ease: CURVAS['curva-saida'] }, TEMPOS['tempo-cabecalho'] - TEMPOS['tempo-rapido']);
    // As lâminas sobem junto com o glitch: a última assenta em 1 s, e a entrada inteira cabe nos 2 s mesmo começando tarde.
    s.subida.forEach((_, i) =>
      entrada.to(s.subida, { [i]: 0, duration: TEMPOS['tempo-transicao'], ease: CURVAS['curva-saida'] }, i * INTERVALOS['intervalo-curto']),
    );
    // Segue o tempo real mesmo com quadros lentos (como no site oficial), sem mexer no lagSmoothing global.
    const inicio = performance.now();
    const avancar = () => void entrada.totalTime((performance.now() - inicio) / 1000);
    entrada.eventCallback('onComplete', () => {
      gsap.ticker.remove(avancar);
      pronta();
    });
    gsap.ticker.add(avancar);
    return () => {
      gsap.ticker.remove(avancar);
      entrada.kill();
    };
  }, [medida]);

  // Rolagem: a cada parada, as fatias tremem por um instante. Cursor (só desktop, mouse): as lâminas inclinam para ele.
  useEffect(() => {
    const s = estado.current;
    let espera = 0;
    const aoRolar = () => {
      clearTimeout(espera);
      espera = window.setTimeout(() => {
        if (s.pronta) gsap.fromTo(s, { tremor: 0.6 }, { tremor: 0, duration: TEMPOS['tempo-curto'], ease: CURVAS['curva-saida'] });
      }, INTERVALOS['intervalo-seguir'] * 1000);
    };
    const aoMover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || ehCelular(window.innerWidth)) return;
      s.alvoMouse.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('pointermove', aoMover);
    return () => {
      clearTimeout(espera);
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('pointermove', aoMover);
    };
  }, []);

  useFrame((r3f) => {
    const s = estado.current;
    const raiz = refRaiz.current;
    if (!medidas || !raiz || !refPalavra.current) return;
    const sy = window.scrollY;
    const t = r3f.clock.elapsedTime;

    // Fora do hero, nada a desenhar nem o passo da refração.
    raiz.visible = sy < 1.5 * window.innerHeight;
    if (!raiz.visible) return;

    refPalavra.current.position.set(medidas.palavra.x, medidas.palavra.y + sy, 0);
    const u = materialPalavra.uniforms;
    u.uTempo.value = t;
    u.uTremor.value = s.tremor;
    u.uOpacidade.value = s.opacidade;
    vidro.uniforms.uTempo.value = t;

    s.mouse.lerp(s.alvoMouse, 0.08);
    const { y: sombraY } = SOMBRA[medidas.celular ? 'celular' : 'desktop'];
    medidas.laminas.forEach((l, i) => {
      const g = laminas.current[i];
      if (!g) return;
      g.position.set(l.x + DESLIZE * sy, l.y + sy - s.subida[i] * window.innerHeight, 1);
      g.rotation.set(-s.mouse.y * INCLINACAO_DO_CURSOR.x, s.mouse.x * INCLINACAO_DO_CURSOR.y, ROTACAO);
      g.children[0].position.y = -sombraY;
    });

    // A partir do primeiro quadro desenhado, a composição em SVG sai e fica a do canvas (estilo.css).
    if (!s.ativa) {
      s.ativa = true;
      const secao = document.getElementById('topo');
      if (secao) secao.dataset.cena = 'ativa';
    }

    // Passo da refração: a cena sem o vidro vai para o alvo, e o vidro amostra esse alvo.
    for (const g of laminas.current) if (g) g.visible = false;
    gl.setRenderTarget(alvo);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    for (const g of laminas.current) if (g) g.visible = true;
  });

  if (!medidas) return null;
  const { palavra } = medidas;
  return (
    <group ref={refRaiz}>
      <mesh ref={refPalavra} geometry={plano} material={materialPalavra} scale={[palavra.largura * (1 + 2 * MARGEM_DA_PALAVRA), palavra.altura, 1]} />
      {lamina &&
        medidas.laminas.map((l, i) => {
          const { desfoque } = SOMBRA[medidas.celular ? 'celular' : 'desktop'];
          return (
            <group key={i} ref={(g) => void (laminas.current[i] = g)}>
              <mesh geometry={plano} material={sombra} scale={[l.largura + 2 * desfoque, l.altura + 2 * desfoque, 1]} position={[0, 0, -0.5]} renderOrder={1} />
              <mesh geometry={lamina} material={vidro} scale={l.largura} renderOrder={2} />
            </group>
          );
        })}
    </group>
  );
}
