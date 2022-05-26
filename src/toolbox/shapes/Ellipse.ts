import { BaseShapeTool } from "./BaseShapeTool";

export interface DrawEllipseOptions {
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
    rotation: number;
    startAngle: number;
    endAngle: number;
    counterclockwise?: boolean;
}
export class EllipseTool extends BaseShapeTool {
    public draw(options: DrawEllipseOptions) {
        return this.history.push((ctx) => {
            options.counterclockwise ??= false;
            ctx.ellipse(
                options.x,
                options.y,
                options.radiusX,
                options.radiusY,
                options.rotation,
                options.startAngle,
                options.endAngle,
                options.counterclockwise
            );
        });
    }
}