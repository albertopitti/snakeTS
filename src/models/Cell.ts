export default class Cell {
    x: number;
    y: number;
    static size: number;
    static style: string = 'rgb(100,100,100)';

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static setSize(size: number) {
        this.size = size;
    }

    static setStyle(style: string) {
        this.style = style;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = Cell.style;
        ctx.fillRect(this.x, this.y, Cell.size, Cell.size);
    }
}