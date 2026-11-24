'use client';

import { UseCanvas, useScrollRig } from '@14islands/r3f-scroll-rig';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { ehCelular } from '@/lib/ambiente';
import { alvoDoSimbolo, semente } from '@/marca/amostrar';
import { TEMPOS } from '@/movimento/tokens';
import { atributosDaEsfera, QUANTIDADE, VISTA, type AtributosDaEsfera } from './geometria';
import { criarMaterialDaEsfera } from './shader';

// Adaptado do site oficial (compartilhados/esfera/CenaEsfera.tsx) para pontos. Só entra por next/dynamic, do Palco
// da chamada final, que já conferiu o modo (desktop ou celular): nunca monta no reduzido nem sem WebGL.
// Sem ScrollScene: ele segue a rolagem pelo SmoothScrollbar, que esta página não tem; a cena acompanha o palco pelo
// getBoundingClientRect a cada quadro (unidades da cena = pixels, origem no centro da tela).

// Giro da esfera em rad/s.
const GIRO_POR_SEGUNDO = 0.25;
// As partículas correm para o F em 1,2 s (Notas · Chamada final).
const TEMPO_DO_F = TEMPOS['tempo-digitar-frase'];
// Quanto o cursor guardado anda até o real, por quadro a 60 qps.
const SEGUIR_CURSOR = 0.15;
const LONGE = 1e5;

type Props = { track: MutableRefObject<HTMLElement>; formado: boolean };

export function CenaEsfera({ track, formado }: Props) {
  const { isCanvasAvailable } = useScrollRig();
  const [{ atributos, desktop }] = useState(() => {
    const celular = ehCelular(window.innerWidth);
    const n = celular ? QUANTIDADE.celular : QUANTIDADE.desktop;
    return { atributos: atributosDaEsfera(n, alvoDoSimbolo(n), semente(n)), desktop: !celular };
  });
  if (!isCanvasAvailable) return null;
  return (
    <UseCanvas formado={formado}>
      <Pontos track={track} atributos={atributos} formado={formado} cursor={desktop} />
    </UseCanvas>
  );
}

const token = (nome: string) => getComputedStyle(document.documentElement).getPropertyValue(nome).trim();

type PropsDosPontos = Props & { atributos: AtributosDaEsfera; cursor: boolean };

function Pontos({ track, atributos, formado, cursor }: PropsDosPontos) {
  const { gl } = useThree();
  const { requestRender } = useScrollRig();
  const pontos = useRef<THREE.Points>(null);
  const material = useMemo(() => criarMaterialDaEsfera(token('--cor-preto'), token('--cor-azul')), []);
  const estado = useMemo(() => ({ morf: 0, mouse: new THREE.Vector2(LONGE, LONGE) }), []);

  const geometria = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const esfera = new THREE.BufferAttribute(atributos.aEsfera, 3);
    g.setAttribute('position', esfera);
    g.setAttribute('aEsfera', esfera);
    g.setAttribute('aAlvo', new THREE.BufferAttribute(atributos.aAlvo, 3));
    g.setAttribute('aNoF', new THREE.BufferAttribute(atributos.aNoF, 1));
    g.setAttribute('aAzul', new THREE.BufferAttribute(atributos.aAzul, 1));
    g.setAttribute('aTom', new THREE.BufferAttribute(atributos.aTom, 1));
    g.setAttribute('aTamanho', new THREE.BufferAttribute(atributos.aTamanho, 1));
    return g;
  }, [atributos]);
  useEffect(() => () => geometria.dispose(), [geometria]);
  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    material.uniforms.uDpr.value = gl.getPixelRatio();
  }, [gl, material]);

  // O cursor empurra as partículas próximas (só no desktop).
  useEffect(() => {
    if (!cursor) return;
    const alvo = estado.mouse;
    const mover = (e: PointerEvent) => {
      const r = track.current?.getBoundingClientRect();
      if (r) alvo.set(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2)));
    };
    const soltar = () => alvo.set(LONGE, LONGE);
    window.addEventListener('pointermove', mover, { passive: true });
    document.documentElement.addEventListener('pointerleave', soltar);
    return () => {
      window.removeEventListener('pointermove', mover);
      document.documentElement.removeEventListener('pointerleave', soltar);
    };
  }, [cursor, track, estado]);

  // Fora da tela, nada é desenhado nem atualizado, e o F se desfaz: na volta, forma de novo.
  useFrame(({ size }, delta) => {
    const p = pontos.current;
    const r = track.current?.getBoundingClientRect();
    if (!p || !r) return;
    const visivel = r.bottom > 0 && r.top < size.height && r.width > 0;
    // Um último quadro ao sair, para o canvas não guardar as partículas na tela.
    if (p.visible !== visivel) requestRender();
    p.visible = visivel;
    if (!visivel) {
      estado.morf = 0;
      return;
    }
    // O raio acompanha o palco, na mesma proporção da esfera parada.
    p.position.set(r.left + r.width / 2 - size.width / 2, size.height / 2 - (r.top + r.height / 2), 0);
    const u = material.uniforms;
    const passo = delta / TEMPO_DO_F;
    estado.morf = formado ? Math.min(1, estado.morf + passo) : Math.max(0, estado.morf - passo);
    u.uMorf.value = estado.morf;
    u.uTempo.value += delta;
    u.uGiro.value += delta * GIRO_POR_SEGUNDO;
    const mouse = u.uMouse.value as THREE.Vector2;
    if (estado.mouse.x === LONGE || mouse.x === LONGE) mouse.copy(estado.mouse);
    else mouse.lerp(estado.mouse, 1 - Math.pow(1 - SEGUIR_CURSOR, delta * 60));
    u.uRaio.value = Math.min(r.width, r.height) / VISTA;
    requestRender();
  });

  return <points ref={pontos} geometry={geometria} material={material} frustumCulled={false} />;
}
