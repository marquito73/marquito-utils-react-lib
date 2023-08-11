import React from "react";
import { Point, LineChart, LineChartProps } from "../../lib";


export const TestLineChart = () => {

    const points: Map<Point, string> = new Map();

    points.set(new Point(0, 0), "Point 0");
    points.set(new Point(50, 50), "Point 1");
    points.set(new Point(100, 100), "Point 2");
    points.set(new Point(150, 120), "Point 3");
    points.set(new Point(110, 180), "Point 4");

    // Textbox
    const lineChartProps: LineChartProps = {
        Points: points,
        Width: 300,
        Height: 150,
        Id: "chartTest",
        Name: "chartTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    return (
        <LineChart {...lineChartProps}/>
    );
}