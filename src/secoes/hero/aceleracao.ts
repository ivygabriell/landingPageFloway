// WebGL com aceleração de vídeo. Só por software (SwiftShader, llvmpipe), cada quadro da cena do hero travava a página
// por ~110 ms (medido no CI em 2026-11-23); aí o hero fica na composição parada em SVG e CSS. O navegador recusa o
// contexto com failIfMajorPerformanceCaveat quando sabe que é software; quando não recusa (o Chrome com
// --enable-unsafe-swiftshader, por exemplo), o nome do renderizador entrega.
const SOFTWARE = /swiftshader|llvmpipe|softpipe|software/i;

export function temWebglAcelerado(): boolean {
  try {
    const tela = document.createElement('canvas');
    const opcoes: WebGLContextAttributes = { failIfMajorPerformanceCaveat: true };
    const gl = tela.getContext('webgl2', opcoes) || tela.getContext('webgl', opcoes);
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderizador = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !SOFTWARE.test(renderizador);
  } catch {
    return false;
  }
}
