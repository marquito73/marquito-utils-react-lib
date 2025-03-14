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
import { Label, LabelProps } from "../../TextArea";
import { Button, ButtonProps } from "../../Button";
import { EnumEvent, EnumToastType } from "../../../Enums";
import { ResultContent } from "../../../Utils/ResultContent";


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
    PriceLabel?: string,
    VolumeLabel?: string,
    PeriodsAvailable: Map<string, number>,
    ReloadCandleDataURL?: string,
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
    CurrentPrice: number,
    CurrentPriceColor: string,
    CurrentPeriod: number,
}

/**
 * A candle chart
 */
export class CandleChart<Props extends CandleChartProps, State extends CandleChartState> 
extends Chart<Props & CandleChartProps, State & CandleChartState> {

    constructor(props: Props & CandleChartProps, state: State & CandleChartState) {
        super(props, state);
        
        this.props.CssClass.push("CandleChart-React");

        const lastCandle: Candle = this.props.Data[this.props.Data.length - 1];

        this.state = {
            ZoomFactor: 1,
            ZoomPosition: 0,
            MaximumPrice: undefined,
            MinimumPrice: undefined,
            LiveTradingAlreadyLaunched: false,
            Data: this.props.Data,
            CurrentPrice: lastCandle.Close,
            CurrentPriceColor: lastCandle.Close >= lastCandle.Open ? "green" : "red",
            CurrentPeriod: this.props.Period,
        } as State;
    }
    
    render() {
        return (
            <div 
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}>
                <div className="period">
                    {
                        Array.from(this.props.PeriodsAvailable.keys()).map(period => {
                            return this.GetPeriodButton(period);
                        })
                    }
                </div>
                <div className="currentPrice">
                    {this.GetPriceLabel()}
                </div>
                <div className='control-section'>
                    <div className="row">
                        {/* The candle chart */}
                        <ChartComponent 
                            id={this.GetOwnId()}
                            style={{ 
                                textAlign: "center" 
                            }} 
                            background={this.props.BackgroundColor}
                            load={this.Load.bind(this)} 
                            primaryXAxis={{ 
                                valueType: 'DateTime', 
                                crosshairTooltip: { enable: true }, 
                                majorGridLines: { width: 0 } 
                            }} 
                            primaryYAxis={{ 
                                title: this.props.VolumeLabel ?? "Volume", 
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
                                    title={this.props.PriceLabel ?? "Price"} 
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

    private GetPeriodButton = (period: string) => {
        const periodButtonProps: ButtonProps = {
            BoldCaption: false,
            CaptionColor: "",
            BackgroundColor: "",
            BorderColor: this.state.CurrentPeriod === this.props.PeriodsAvailable.get(period)! ? "red" : "",
            CaptionSize: 0,
            Caption: period,
            Link: "",
            OpenInNewTab: false,
            Id: `${this.GetOwnId()}_${period}`,
            Name: `${this.GetOwnId()}_${period}`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        };
        
        periodButtonProps.Events.set(EnumEvent.Click, this.GetPeriodButtonClickMethod(period));
        
        return (
            <Button key={period} {...periodButtonProps}/>
        );
    }

    private GetPeriodButtonClickMethod = (period: string) => {
        return (props: ButtonProps) => {
            if (this.state.CurrentPeriod !== this.props.PeriodsAvailable.get(period)!) {
                if (Utils.IsNotEmpty(this.props.ReloadCandleDataURL)) {
                    AjaxUtils.PostDataWithUrl(this.props.ReloadCandleDataURL!, undefined, {
                        Product: this.props.ProductName,
                        Period: period,
                    }, new Array(), (response: ResultContent) => {
                        Utils.DisplayToast(EnumToastType.Info, response.Title, response.Message, 5000);
                        const newCandles: Array<Candle> = response.Data as Array<Candle>;
    
                        this.setState({
                            ZoomFactor: 1,
                            ZoomPosition: 0,
                            MaximumPrice: Math.max(...newCandles.map(c => c.High)),
                            MinimumPrice: Math.min(...newCandles.map(c => c.Low)),
                            CurrentPeriod: this.props.PeriodsAvailable.get(period)!,
                            Data: newCandles,
                        });
                    }, undefined);
                } else {
                    this.setState({
                        CurrentPeriod: this.props.PeriodsAvailable.get(period)!,
                    });
                }
            }
        };
    }

    private GetPriceLabel = () => {
        const priceLabelProps: LabelProps = {
            Text: this.state.CurrentPrice.toString(),
            For: "",
            BoldText: true,
            TextColor: this.state.CurrentPriceColor,
            TextSize: 15,
            Id: `${this.GetOwnId()}_price`,
            Name: `${this.GetOwnId()}_price`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        };

        return (
            <Label {...priceLabelProps}/>
        );
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

            let lastCandle: Candle = candles[this.state.Data.length - 1];

            if (this.IsNewCandle(lastCandle, lastMarketTrade)) {
                const newDate: Date = new Date(lastCandle.Time);
                newDate.setSeconds(newDate.getSeconds() + this.state.CurrentPeriod);
                const newCandle: Candle = {
                    Time: newDate,
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

            lastCandle = candles[this.state.Data.length - 1];

            this.setState({
                Data: candles,
                CurrentPrice: lastCandle.Close,
                CurrentPriceColor: lastCandle.Close >= lastCandle.Open ? "green" : "red",
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
        
        return secondsGap > this.state.CurrentPeriod;
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