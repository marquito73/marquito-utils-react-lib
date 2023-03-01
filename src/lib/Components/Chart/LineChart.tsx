import { MouseEvent } from "react";
import { Utils } from "../../Utils";
import { Chart, ChartProps } from "./Chart";
import { ChartPoint } from "./ChartPoint";

export interface LineChartProps extends ChartProps {
    Points: Map<ChartPoint, string>
}

export class LineChart<Props extends LineChartProps> extends Chart<Props & LineChartProps> {

	render() {
        this.props.CssClass.push("LineChart-React");

        return (
            super.render()
        );
    }

    protected HandleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>): void => {
        const x: number = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const y: number = event.clientY - event.currentTarget.getBoundingClientRect().top;
        
        console.log(`x : ${x}, y : ${y}`);
        //this.DrawPoint(this.GetCanvas(event.currentTarget), x, y, "red");
    }

    protected InitChart = (canvas: CanvasRenderingContext2D, maxHeight: number, maxWidth: number): void => {
        this.DrawChartAxis(canvas, maxHeight, maxWidth);
        this.DrawLinePoints(canvas);
    }

    private DrawLinePoints = (canvas: CanvasRenderingContext2D) => {
        let lastX: number | undefined = undefined;
        let lastY: number | undefined = undefined;
        Array.from(this.props.Points.keys())
            .sort((pointOne, pointTwo) =>  pointOne.x - pointTwo.x)
            .forEach((point) => {
                this.DrawPoint(canvas, this.DefaultMargin + point.x, this.props.Height - this.DefaultMargin - point.y, "blue");
                if (Utils.IsNotNull(lastX) && Utils.IsNotNull(lastY)) {
                    this.DrawLine(canvas, this.DefaultMargin + (lastX as number), this.props.Height - this.DefaultMargin - (lastY as number), 
                    this.DefaultMargin + point.x, this.props.Height - this.DefaultMargin - point.y, 1, "blue");
                };
                lastX = point.x;
                lastY = point.y;
        })
    }

    private GetMinimumX = () => {
        const values: Array<number> = Array.from(this.props.Points.keys()).map(point => point.x);
        return this.GetMin(values);
    }

    private GetMaximumX = () => {
        const values: Array<number> = Array.from(this.props.Points.keys()).map(point => point.x);
        return this.GetMax(values);
    }

    private GetMinimumY = () => {
        const values: Array<number> = Array.from(this.props.Points.keys()).map(point => point.y);
        return this.GetMin(values);
    }

    private GetMaximumY = () => {
        const values: Array<number> = Array.from(this.props.Points.keys()).map(point => point.y);
        return this.GetMax(values);
    }

    private GetMin = (values: Array<number>) => {
        return values.reduce((previous, current) => previous < current ? previous : current);
    }

    private GetMax = (values: Array<number>) => {
        return values.reduce((previous, current) => previous > current ? previous : current);
    }
}