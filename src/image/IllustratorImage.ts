import {
    Transformer,
    Orientation,
    AvifConfig,
    ChromaSubsampling,
    CompressionType,
    JsColorType,
    FilterType,
    ResizeFilterType,
    Metadata
} from "@napi-rs/image";
import { ImageLoader } from "./ImageLoader";
import { ImageData as SkImageData } from "@napi-rs/canvas";

export { AvifConfig, Metadata };

// prettier-ignore
export const IllustratorImageEnums = {
    // @ts-expect-error
    Orientation, ChromaSubsampling, CompressionType, JsColorType, FilterType, ResizeFilterType
};

export interface RawImageData {
    data: Uint8ClampedArray | Buffer;
    width: number;
    height: number;
}

export class IllustratorImage extends Transformer {
    public constructor(private readonly _data: Buffer) {
        super(_data);
    }

    public get source() {
        return this._data;
    }

    public async toImage() {
        const png = await super.png();
        return ImageLoader.createImage(png);
    }

    public toImageSync() {
        const png = super.pngSync();
        return ImageLoader.createImage(png);
    }

    public async toImageData(sw: number, sh?: number) {
        const data = new Uint8ClampedArray(await this.rawPixels());
        const imgData = new ImageData(data, sw, sh);
        return imgData;
    }

    public toImageDataSync(sw: number, sh?: number) {
        const data = new Uint8ClampedArray(this.rawPixelsSync());
        const imgData = new ImageData(data, sw, sh);
        return imgData;
    }

    public static fromImageData(data: ImageData | SkImageData | RawImageData) {
        return super.fromRgbaPixels(data.data, data.width, data.height);
    }
}