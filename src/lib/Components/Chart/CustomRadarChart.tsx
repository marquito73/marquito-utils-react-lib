import * as React from "react";
import { useEffect } from "react";
import "./css/Chart.scss";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { Chart, ChartProps } from "./Chart";

export interface RadarChartProps extends ChartProps {
    Data: Array<object>,
}

export class CustomRadarChart<Props extends RadarChartProps> 
extends Chart<Props & RadarChartProps> {

	constructor(props: Props & RadarChartProps) {
        super(props);
        
		this.props.CssClass.push("RadarChart-React");
    }

	render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={this.props.Data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        );
	}
}