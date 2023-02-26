import React from "react";
import { ChartPoint, LineChart, LineChartProps } from "../../lib";


export const TestLineChart = () => {

    const points: Map<ChartPoint, string> = new Map();

    points.set(new ChartPoint(0, 0), "Point 0");
    points.set(new ChartPoint(50, 50), "Point 1");
    points.set(new ChartPoint(100, 100), "Point 2");
    points.set(new ChartPoint(150, 120), "Point 3");

    // Textbox
    const lineChartProps: LineChartProps = {
        Points: points,
        Width: 300,
        Height: 150,
        ContainerId: "linechart",
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