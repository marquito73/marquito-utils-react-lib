import * as React from "react";
import { Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component";
import "./css/Chart.scss";

export interface ChartProps extends ComponentProps {
    Width: number,
    Height: number
}

export abstract class Chart<Props extends ChartProps> 
extends Component<Props & ChartProps, {}> {

    protected DefaultMargin: number = 40;
    
    render() {
        this.props.CssClass.push("Chart-React");

        return (
            <div
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}
                {...this.GetOwnCssAttribute()}
                
            >
                <canvas
                    id={this.props.Id}
                    width={this.props.Width}
                    height={this.props.Height}
                    ref={this.InitCanvas}
                    onMouseMove={this.HandleMouseMove}
                    onClick={this.HandleClick}
                />
            </div>
        );
    }

    protected abstract HandleMouseMove(event: React.MouseEvent<HTMLCanvasElement>) : void;

    private HandleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas: HTMLCanvasElement = event.currentTarget;
        this.ClearCanvas(this.GetCanvas(canvas), canvas.height, canvas.width);
        this.InitChart(this.GetCanvas(canvas), canvas.height, canvas.width);
    }

    protected GetCanvas = (canvas: HTMLCanvasElement) => {
        let result: CanvasRenderingContext2D;

        const ctx =  canvas.getContext('2d')
        if (ctx != null) {
            result = ctx;
        } else {
            result = new CanvasRenderingContext2D();
        }

        return result;
    }

    /**
     * Clear the canvas
     * 
     * @param canvas The canvas to clear
     * @param maxHeight The height of the canvas
     * @param maxWidth The width of the canvas
     */
    protected ClearCanvas = (canvas: CanvasRenderingContext2D, maxHeight: number, maxWidth: number) => {
        canvas.clearRect(0, 0, maxWidth, maxHeight);
    } 

    private InitCanvas = (canvas: HTMLCanvasElement) => {
        this.InitChart(this.GetCanvas(canvas), canvas.height, canvas.width);
    }

    protected abstract InitChart(canvas: CanvasRenderingContext2D, maxHeight: number, maxWidth: number) : void;

    protected DrawLine = (canvas: CanvasRenderingContext2D, xStart: number, yStart: number, xEnd: number, yEnd: number, width: number, 
        color: string) => {

            canvas.save();
            canvas.strokeStyle = color;
            canvas.lineWidth = width;
            canvas.beginPath();
            canvas.moveTo(xStart, yStart);
            canvas.lineTo(xEnd, yEnd);
            canvas.stroke();
            canvas.restore();
    }

    protected DrawRectangle = (canvas: CanvasRenderingContext2D, xStart: number, yStart: number, width: number, height: number, 
        strokeWidth: number, color: string) => {
            canvas.save();
            canvas.strokeStyle = color;
            canvas.lineWidth = strokeWidth;
            canvas.beginPath();
            canvas.rect(xStart, yStart, width, height)
            canvas.stroke();
            canvas.restore();
    }

    protected DrawCircle = (canvas: CanvasRenderingContext2D, xStart: number, yStart: number, radius: number, color: string) => {
        canvas.save();
        canvas.strokeStyle = color;
        canvas.beginPath();

        canvas.arc(xStart, yStart, radius, 0, 2 * Math.PI);
        canvas.fill();

        canvas.stroke();
        canvas.restore();
    }

    protected DrawPoint = (canvas: CanvasRenderingContext2D, xStart: number, yStart: number, color: string) => {
        this.DrawCircle(canvas, xStart, yStart, 3, color);
    }

    protected DrawText = (canvas: CanvasRenderingContext2D, value: string, xStart: number, yStart: number) => {
        canvas.font = "20px roboto, sans-serif";
        canvas.fillText(value, xStart, yStart);
    }

    protected DrawChartAxis = (canvas: CanvasRenderingContext2D, maxHeight: number, maxWidth: number) => {
        const xStart: number = this.DefaultMargin;
        const yStart: number = maxHeight - this.DefaultMargin;
        const axisColor: string = "blue";

        // Draw x axis
        this.DrawLine(canvas, xStart, yStart, maxWidth - this.DefaultMargin, yStart, 2, axisColor);
        // Draw y axis
        this.DrawLine(canvas, xStart, yStart, xStart, this.DefaultMargin, 2, axisColor);
        // Draw 0
        this.DrawText(canvas, "0", this.DefaultMargin - 20, maxHeight - this.DefaultMargin + 20);
    }
}