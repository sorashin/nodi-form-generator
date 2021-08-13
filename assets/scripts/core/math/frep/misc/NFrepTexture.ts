import { RGBAFormat, Texture, DataTexture, UnsignedByteType, WebGLRenderer, RenderTarget, WebGLRenderTarget } from 'three';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer';
import NFrepBase from '../NFrepBase';
import FrepCommon from '../../../shaders/frep_common.glsl';
import FrepTextureFragment from '../shaders/frep_texture.frag';

export default class NFrepTexture {
  private renderer: WebGLRenderer;

  constructor (source?: WebGLRenderer) {
    this.renderer = source !== undefined ? source : new WebGLRenderer();
  }

  public render (frep: NFrepBase, w: number, h: number, d: number): RenderTarget {
    const code = frep.compile('p');
    const bb = frep.boundingBox;
    const { min, max } = bb.getMinMax();

    const tw = w * h;
    const th = d;
    const gpuCompute = new GPUComputationRenderer(tw, th, this.renderer);
    gpuCompute.setDataType(UnsignedByteType);

    // const initialValueTexture = new DataTexture(new Uint8Array(tw * th * 4), tw, th, RGBAFormat, UnsignedByteType);
    const initialValueTexture = new Texture();
    initialValueTexture.format = RGBAFormat;
    initialValueTexture.type = UnsignedByteType;

    const variable = gpuCompute.addVariable(
      'textureFrep',
      FrepTextureFragment.replace(
        '#include <frep_common>',
        FrepCommon
      ),
      initialValueTexture
    );
    variable.material.uniforms.bmin = { value: min };
    variable.material.uniforms.bmax = { value: max };
    variable.material.uniforms.bsize = { value: max.clone().sub(min) };
    variable.material.uniforms.width = { value: w };
    variable.material.uniforms.height = { value: h };
    variable.material.uniforms.depth = { value: d };
    variable.material.uniforms.iwidth = { value: 1 / w };
    variable.material.uniforms.iheight = { value: 1 / h };
    variable.material.uniforms.idepth = { value: 1 / d };
    variable.material.defines.SCENE_CODE = code;

    gpuCompute.setVariableDependencies(variable, [variable]);
    const error = gpuCompute.init();
    if (error !== null) {
      console.error(error);
    }
    gpuCompute.compute();

    const target = gpuCompute.getCurrentRenderTarget(variable);
    return target;
  }

  public build (frep: NFrepBase, w: number, h: number, d: number): Uint8Array {
    const target = this.render(frep, w, h, d) as WebGLRenderTarget;

    const { width, height } = target;
    const buffer = new Uint8Array(width * height * 4);

    this.renderer.readRenderTargetPixels(target, 0, 0, width, height, buffer);

    const l = width * height;
    const dst = new Uint8Array(l);
    for (let i = 0; i < l; i++) {
      dst[i] = buffer[i * 4];
    }
    return dst;
  }
}
