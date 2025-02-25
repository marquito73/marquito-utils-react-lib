import * as React from "react";
import { Bar, CartesianGrid, ComposedChart, Customized, Legend, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Chart, ChartProps, ChartState } from "../Chart";
import { Candle } from "./Candle";

import "./css/CandleChart.scss";
import { Utils } from "../../../Utils";


export interface OldCandleChartProps extends ChartProps {
    Data: Array<Candle>,
}

export class OldCandleChart<Props extends OldCandleChartProps> 
extends Chart<Props & OldCandleChartProps, {}> {

	constructor(props: Props & OldCandleChartProps, state: Props & ChartState) {
        super(props, state);
        
		this.props.CssClass.push("CandleChart-React");
    }

    render() {
        return (
            <div
                id={this.GetOwnContainerId()}
				className={this.GetOwnCssClass()}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart 
                        data={this.props.Data}
                        barCategoryGap="1%">
                        <XAxis 
                            dataKey="Time"
                            scale="band"
                            tickFormatter={this.FormatXAxis}
                            />
                        <YAxis />
                        <Tooltip content={<this.RenderTooltip />} />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="High" stroke="transparent" dot={false} />
                        <Line type="monotone" dataKey="Low" stroke="transparent" dot={false} />
                        <Line type="monotone" dataKey="Open" stroke="transparent" dot={false} />
                        <Line type="monotone" dataKey="Close" stroke="transparent" dot={false} />
                        <Customized component={this.CandleStick} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }

    private FormatXAxis = (date: Date) => {
        return date.toLocaleDateString();
    }
    
    private CandleStick = (props: any): any => {
      const { formattedGraphicalItems } = props;
      
      const lowPrices = formattedGraphicalItems[0];
      const highPrices = formattedGraphicalItems[1];
      const closePrices = formattedGraphicalItems[2];
      const openPrices = formattedGraphicalItems[3];

      return this.props.Data.map((candle: Candle, index: number) => {
        const lowPricePoint = lowPrices?.props?.points[index];
        const highPricePoint = highPrices?.props?.points[index];
        const lowHighHeight = lowPricePoint.y - highPricePoint.y;
        const closePricePoint = closePrices?.props?.points[index];
        const openPricePoint = openPrices?.props?.points[index];
        const openCloseHeight = closePricePoint.y - openPricePoint.y;

        return (
            <g>
                <Rectangle
                    width={2}
                    height={-lowHighHeight}
                    x={lowPricePoint.x - 1}
                    y={lowPricePoint.y}
                    fill="gray"
                />
                <Rectangle
                    width={10}
                    height={-openCloseHeight}
                    x={closePricePoint.x - 5}
                    y={closePricePoint.y}
                    fill={openCloseHeight > 0 ? "green" : "red"}
                />
            </g>
        );
      });
    };

    private RenderTooltip = (props: any) => {
        if (props.active && Utils.IsNotEmpty(props.payload)) {
            const candleData: Candle = props.payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <div className="Time">Time : {candleData.Time.toDateString()}</div>
                    <div className="High">High : {candleData.High}</div>
                    <div className="Low">Low : {candleData.Low}</div>
                    <div className="Open">Open : {candleData.Open}</div>
                    <div className="Close">Close : {candleData.Close}</div>
                </div>
            );
        } else {
            return null;
        }
    }
}

/*import * as React from "react";
import { Bar, CartesianGrid, ComposedChart, Customized, Legend, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Chart, ChartProps } from "../Chart";
import { Candle } from "./Candle";

import "./css/CandleChart.scss";
import { Utils } from "../../../Utils";


export interface CandleChartProps extends ChartProps {
    Data: Array<Candle>,
}

export class CandleChart<Props extends CandleChartProps> 
extends Chart<Props & CandleChartProps> {

	constructor(props: Props & CandleChartProps) {
        super(props);
        
		this.props.CssClass.push("CandleChart-React");
    }

    render() {
        return (
            <div
                id={this.GetOwnContainerId()}
				className={this.GetOwnCssClass()}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={this.props.Data}>
                        <XAxis dataKey="Time" />
                        <YAxis />
                        <Tooltip content={<this.RenderTooltip />} />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar dataKey="High" fill="#8884d8" shape={this.RenderCandle} />
                        <Line type="monotone" dataKey="High" stroke="red" dot={false} />
                        <Line type="monotone" dataKey="Low" stroke="blue" dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }
    
    private RenderCandle = (props: any) => {
        const { x, y, width, payload } = props;
        const candleColor = payload.Open > payload.Close ? 'red' : 'green';

        const maxHigh = Math.max(...this.props.Data.map(data => data.High));
        
        let ratio = Math.ceil(y / (maxHigh - payload.High));

        ratio = 2.75;
        
        const candleY = ratio * (maxHigh - Math.max(payload.Open, payload.Close));
        
        const candleHeight = ratio * Math.abs(payload.Open - payload.Close);
        
        return (
            <g>
                <line 
                    x1={x + width / 2} 
                    y1={y} 
                    x2={x + width / 2} 
                    y2={ratio * (maxHigh - payload.Low)} 
                    stroke="black" 
                    strokeWidth={2} 
                />
                <rect 
                    x={x} 
                    y={candleY} 
                    width={width} 
                    height={candleHeight} 
                    fill={candleColor} 
                    stroke={candleColor} 
                    strokeWidth={1} 
                />
            </g>
        );
    };

    private RenderTooltip = (props: any) => {
        if (props.active && Utils.IsNotEmpty(props.payload)) {
            const candleData: Candle = props.payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <div className="Time">Time : {candleData.Time.toDateString()}</div>
                    <div className="High">High : {candleData.High}</div>
                    <div className="Low">Low : {candleData.Low}</div>
                    <div className="Open">Open : {candleData.Open}</div>
                    <div className="Close">Close : {candleData.Close}</div>
                </div>
            );
        } else {
            return null;
        }
    }
}*/