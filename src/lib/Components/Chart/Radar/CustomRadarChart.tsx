import * as React from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { Chart, ChartProps } from "../Chart";
import { RadarType } from "./RadarType";

import "./css/RadarChart.scss";

export interface RadarChartProps extends ChartProps {
    RadarTypes: Array<RadarType>,
    RadarGridColor: string,
}

export class CustomRadarChart<Props extends RadarChartProps> 
extends Chart<Props & RadarChartProps> {

	constructor(props: Props & RadarChartProps) {
        super(props);
        
		this.props.CssClass.push("RadarChart-React");
    }

	render() {
        return (
            <div
                id={this.GetOwnContainerId()}
				className={this.GetOwnCssClass()}
            >
                <this.GetChartTitle />
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={this.props.Data}>
                        <PolarGrid
                            stroke={this.props.RadarGridColor} />
                        <PolarAngleAxis 
                            dataKey="Subject" 
                            tick={{
                                fill: this.props.LabelColor, 
                                fontSize: this.props.LabelSize
                            }} />
                        <PolarRadiusAxis tick={{
                                fill: this.props.LabelColor
                                }} />
                        {
                            this.props.RadarTypes.map((radarType) => {
                                return (
                                    <Radar 
                                        key={radarType.Name}
                                        name={radarType.Name} 
                                        dataKey={radarType.DataKey} 
                                        stroke={radarType.StrokeColor} 
                                        fill={radarType.FillColor} 
                                        fillOpacity={0.6}/>
                                );
                            })
                        }
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        );
	}
}