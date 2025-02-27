import * as React from "react";
import { Chart, ChartProps, ChartState } from "../Chart";
import { Candle } from "./Candle";
import { AjaxUtils, StringBuilder, Utils } from "../../../Utils";
import { MarketTrade } from "./MarketTrade";
import { Browser } from '@syncfusion/ej2-base';
import { AxesDirective, AxisDirective, CandleSeries, Category, ChartComponent, ChartTheme, ColumnSeries, Crosshair, DateTime, 
    IAxisLabelRenderEventArgs, ILoadedEventArgs, Inject, IPointRenderEventArgs, IZoomCompleteEventArgs, Legend, Logarithmic, RowDirective, 
    RowsDirective, SeriesCollectionDirective, SeriesDirective, StripLine, Tooltip, Zoom } from '@syncfusion/ej2-react-charts';

import "./css/CandleChart.scss";


/**
 * Candle chart's properties
 */
export interface CandleChartProps extends ChartProps {
    Data: Array<Candle>,
    StockPriceName: string,
    ProductName: string,
    EnableCrossHair: boolean,
    DecimalCount: number,
    UseSignalRForLiveTrading: boolean,
    SignalRHubUrl: string,
    SignalRHubMethodName: string,
    Period: number,
}

/**
 * Candle chart's state properties
 */
export interface CandleChartState extends ChartState {
    ZoomFactor: number,
    ZoomPosition: number,
    MaximumPrice: number | undefined,
    MinimumPrice: number | undefined,
    LiveTradingAlreadyLaunched: boolean,
    Data: Array<Candle>,
}

/**
 * A candle chart
 */
export class CandleChart<Props extends CandleChartProps, State extends CandleChartState> 
extends Chart<Props & CandleChartProps, State & CandleChartState> {

    constructor(props: Props & CandleChartProps, state: State & CandleChartState) {
        super(props, state);
        
        this.props.CssClass.push("CandleChart-React");

        this.state = {
            ZoomFactor: 1,
            ZoomPosition: 0,
            MaximumPrice: undefined,
            MinimumPrice: undefined,
            LiveTradingAlreadyLaunched: false,
            Data: this.props.Data,
        } as State;
    }
    
    render() {
        return (
            <div 
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}>
                <div className='control-section'>
                    <div className="row">
                        {/* The candle chart */}
                        <ChartComponent 
                            id={this.GetOwnId()}
                            style={{ 
                                textAlign: "center" 
                            }} 
                            load={this.Load.bind(this)} 
                            primaryXAxis={{ 
                                valueType: 'DateTime', 
                                crosshairTooltip: { enable: true }, 
                                majorGridLines: { width: 0 } 
                            }} 
                            primaryYAxis={{ 
                                title: 'Volume', 
                                labelFormat: '{value}M', 
                                opposedPosition: true, 
                                majorGridLines: { width: 1 }, 
                                lineStyle: { width: 0 } 
                            }} 
                            legendSettings= {{
                                visible: false
                            }} 
                            tooltip={{ 
                                enable: true, 
                                shared: true, 
                                header: "", 
                                format: this.GetToolTipFormat()
                            }} 
                            width={Browser.isDevice ? '100%' : '80%'} 
                            axisLabelRender={this.AxisLabelRender.bind(this)} 
                            chartArea={{ 
                                border: { width: 0 } 
                            }} 
                            title={this.props.StockPriceName} 
                            loaded={this.OnChartLoad.bind(this)}
                            zoomSettings={{
                                enableMouseWheelZooming: true,
                                enablePan: true,
                                mode: "X",
                                enableAnimation: true,
                            }}
                            zoomComplete={this.OnZoomCompleted.bind(this)}
                            crosshair={{
                                enable: this.props.EnableCrossHair,
                            }}
                            >
                            <Inject 
                                services={[
                                    CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, Legend, ColumnSeries, Logarithmic, Crosshair
                                ]} />
                            <RowsDirective>
                                <RowDirective height={'30%'} />
                                <RowDirective height={'70%'} />
                            </RowsDirective>
                            <AxesDirective>
                                <AxisDirective 
                                    name='secondary' 
                                    rangePadding={"None"}  
                                    enableAutoIntervalOnZooming={true}
                                    maximum={this.state.MaximumPrice} 
                                    minimum={this.state.MinimumPrice} 
                                    opposedPosition={true} 
                                    rowIndex={1} 
                                    majorGridLines={{ 
                                        width: 1 
                                    }} 
                                    labelFormat={this.GetDecimalFormat()} 
                                    title='Price' 
                                    plotOffset={30} 
                                    lineStyle={{ 
                                        width: 0 
                                    }} />
                            </AxesDirective>
                            <SeriesCollectionDirective>
                                {/* Volume data */}
                                <SeriesDirective 
                                    type='Column' 
                                    dataSource={this.state.Data} 
                                    animation={{ 
                                        enable: true 
                                    }} 
                                    xName='Time' 
                                    yName='Volume' 
                                    enableTooltip={false} 
                                    name='Volume' />
                                    {/* Candles data */}
                                <SeriesDirective 
                                    type='Candle' 
                                    yAxisName='secondary' 
                                    bearFillColor='#2ecd71' 
                                    bullFillColor='#e74c3d' 
                                    dataSource={this.state.Data} 
                                    animation={{ 
                                        enable: true 
                                    }} 
                                    xName='Time' 
                                    low='Low' 
                                    high='High' 
                                    open='Open' 
                                    close='Close' 
                                    name={this.props.StockPriceName} 
                                    volume='Volume' />
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                </div>
            </div >
        )
    }

    /**
     * On zoom completed
     * 
     * @param args On zoom completed args
     */
    private OnZoomCompleted = (args: IZoomCompleteEventArgs) => {
        const visibleData = this.state.Data.filter(candle =>
            new Date(candle.Time).getTime() >= (args.currentVisibleRange.min ?? 0) &&
            new Date(candle.Time).getTime() <= (args.currentVisibleRange.max ?? 0)
        );
    
        if (Utils.IsNotEmpty(visibleData)) {
            const minY = Math.min(...visibleData.map(c => c.Low));
            const maxY = Math.max(...visibleData.map(c => c.High));

            this.setState({
                MaximumPrice: maxY,
                MinimumPrice: minY,
            });
        }
    }

    /**
     * Get the decimal format
     * 
     * @returns The decimal format
     */
    private GetDecimalFormat = () => {
        return `n${this.props.DecimalCount}`;
    }

    /**
     * Get the tooltip format
     * 
     * @returns The tooltip format
     */
    private GetToolTipFormat = () => {
        return new StringBuilder("")
            .Append("<b>").Append(this.props.StockPriceName).Append("</b> <br> ")
            .Append("High : <b>${point.high}</b> <br> ")
            .Append("Low : <b>${point.low}</b> <br> ")
            .Append("Open : <b>${point.open}</b> <br> ")
            .Append("Close : <b>${point.close}</b> <br> ")
            .Append("Volume : <b>${point.volume}</b>")
            .ToString();
    }

    /**
     * On chart load
     * 
     * @param args Chart load args
     */
    private OnChartLoad = (args: ILoadedEventArgs) => {
        this.setState({
            ZoomFactor: args.chart.primaryXAxis.zoomFactor ?? 1, 
            ZoomPosition: args.chart.primaryXAxis.zoomPosition ?? 0,
        });

        if (this.props.UseSignalRForLiveTrading && !this.state.LiveTradingAlreadyLaunched) {
            this.WaitForNewPrice();
            this.setState({
                LiveTradingAlreadyLaunched: true,
            });
        }
    };

    /**
     * Connect to Live Trading signalR hub for prices
     */
    private WaitForNewPrice = () => {
        AjaxUtils.GetDataFromSignalR(this.props.SignalRHubUrl, this.props.SignalRHubMethodName, (lastMarketTrade: MarketTrade) => {
            const candles: Array<Candle> = this.state.Data;

            const lastCandle: Candle = candles[this.state.Data.length - 1];

            if (this.IsNewCandle(lastCandle, lastMarketTrade)) {
                const newCandle: Candle = {
                    Time: lastMarketTrade.Time,
                    Low: lastMarketTrade.Price,
                    High: lastMarketTrade.Price,
                    Open: lastMarketTrade.Price,
                    Close: lastMarketTrade.Price,
                    Volume: 0,
                };

                candles.push(newCandle);
            } else {
                lastCandle.Close = lastMarketTrade.Price;

                if (lastMarketTrade.Price < lastCandle.Low) {
                    lastCandle.Low = lastMarketTrade.Price;
                }
                if (lastMarketTrade.Price > lastCandle.High) {
                    lastCandle.High = lastMarketTrade.Price;
                }
            }

            this.setState({
                Data: candles,
            });
        }).then(connection => connection.invoke("WaitForNewMarketTrade", this.props.ProductName));
    }

    /**
     * The lastMarketTrade create a ned Candle on the chart ?
     * 
     * @param candle The last candle
     * @param lastMarketTrade The last price from signalR hub
     * @returns The lastMarketTrade create a ned Candle on the chart ?
     */
    private IsNewCandle = (candle: Candle, lastMarketTrade: MarketTrade): boolean => {
        const secondsGap: number = Math.abs(new Date(candle.Time).getTime() - new Date(lastMarketTrade.Time).getTime()) / 1000
        
        return secondsGap > this.props.Period;
    }

    /**
     * On load chart
     * 
     * @param args Load render
     */
    private Load = (args: ILoadedEventArgs) => {
        args.chart.primaryXAxis.zoomFactor = this.state.ZoomFactor ?? 1;
        args.chart.primaryXAxis.zoomPosition = this.state.ZoomPosition ?? 0;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };

    /**
     * Rendel the Y axis label for the volume
     * 
     * @param args Volume axis label render
     */
    private AxisLabelRender = (args: IAxisLabelRenderEventArgs) => {
        args.text = args.text.replace("0000000M", "M");
    }
}