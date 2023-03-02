export class Point {
    public X: number;
    public Y: number;

    constructor(x = 0, y = 0) {
        this.X = x;
        this.Y = y;
    }

    public AddX = (value: number) => {
        this.X += value;
        return this;
    }

    public AddY = (value: number) => {
        this.Y += value;
        return this;
    }

    public SubstractX = (value: number) => {
        this.X -= value;
        return this;
    }

    public SubstractY = (value: number) => {
        this.Y -= value;
        return this;
    }

    public AddPoint = (point: Point) => {
        this.AddX(point.X);
        this.AddY(point.Y);
        return this;
    }

    public SubstractPoint = (point: Point) => {
        this.SubstractX(point.X);
        this.SubstractY(point.Y);
        return this;
    }

    public GetAbsolutePoint = () => {
        return new Point(Math.abs(this.X), Math.abs(this.Y));
    }
}