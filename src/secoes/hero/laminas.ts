import * as THREE from 'three';

// A lâmina de vidro do hero: uma placa de cantos arredondados, com largura 1 (a cena escala pela largura medida no CSS)
// e a proporção dada. Fina, com um chanfro leve que pega a luz nas bordas (o contorno claro da captura).
export function criarLamina(proporcao: number, raio: number) {
  const a = proporcao / 2;
  const forma = new THREE.Shape();
  forma.moveTo(-0.5 + raio, -a);
  forma.lineTo(0.5 - raio, -a);
  forma.quadraticCurveTo(0.5, -a, 0.5, -a + raio);
  forma.lineTo(0.5, a - raio);
  forma.quadraticCurveTo(0.5, a, 0.5 - raio, a);
  forma.lineTo(-0.5 + raio, a);
  forma.quadraticCurveTo(-0.5, a, -0.5, a - raio);
  forma.lineTo(-0.5, -a + raio);
  forma.quadraticCurveTo(-0.5, -a, -0.5 + raio, -a);
  const g = new THREE.ExtrudeGeometry(forma, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 6 });
  g.center();
  g.computeVertexNormals();
  return g;
}
