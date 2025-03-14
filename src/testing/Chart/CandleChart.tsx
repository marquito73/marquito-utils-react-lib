

import React from "react";
import { CandleChart, CandleChartProps, Candle } from "../../lib";
import { tr } from "date-fns/locale";

export const TestCandleChart = () => {
      let data: Array<Candle> = [
        {
            Time: new Date("2024/10/11"),
            Low: 20,
            High: 45,
            Open: 28,
            Close: 38,
            Volume: 5
        },
        {
            Time: new Date("2024/10/12"),
            Low: 31,
            High: 66,
            Open: 38,
            Close: 55,
            Volume: 5
        },
        {
            Time: new Date("2024/10/13"),
            Low: 50,
            High: 80,
            Open: 55,
            Close: 77,
            Volume: 5
        },
        {
            Time: new Date("2024/10/14"),
            Low: 50,
            High: 77,
            Open: 77,
            Close: 66,
            Volume: 5
        },
        {
            Time: new Date("2024/10/15"),
            Low: 15,
            High: 68,
            Open: 66,
            Close: 22,
            Volume: 5
        },
        {
            Time: new Date("2024/10/16"),
            Low: 18,
            High: 102,
            Open: 22,
            Close: 100,
            Volume: 5
        },
        /*{
            Time: new Date("2024/10/17"),
            Low: 90,
            High: 405,
            Open: 100,
            Close: 400,
            Volume: 5
        },*/
      ];

      data = new Array();

      const days = 250;

      const GetRandomValue = (min: number, max: number) => {
        return Math.floor((Math.random() * (max - min)) + min)
      }

      for (let i = 0; i < days; i++) {
        if (i == 0) {
            data.push({
                Time: new Date("2024/10/11"),
                Low: 20.1,
                High: 45.1,
                Open: 28.1,
                Close: 38.1,
                Volume: 5
            });
        } else {
            const lastCandle: Candle = data[i - 1];

            const randomLowGap = GetRandomValue(1, 20);
            const randomHighGap = GetRandomValue(1, 20);

            const open = lastCandle.Close;
            const close = GetRandomValue(open - 20, open + 20);
            const low = open < close ? open - randomLowGap : close - randomLowGap;
            const high = open > close ? open + randomHighGap : close + randomHighGap;

            data.push({
                Time: new Date(lastCandle.Time.getTime() + 86400000),
                Low: low,
                High: high,
                Open: open,
                Close: close,
                Volume: GetRandomValue(1, 10),
            });
        }
    };

    // Chart
    const candleChartProps: CandleChartProps = {
        Data: data,
        Id: "candleChart",
        Name: "",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
        LabelColor: "gray",
        LabelSize: 20,
        ChartTitle: "Candle chart",
        ChartTitleColor: "black",
        StockPriceName: "Apple Inc.(AAPL)",
        EnableCrossHair: true,
        DecimalCount: 2,
        ProductName: "AAPL",
        UseSignalRForLiveTrading: false,
        SignalRHubUrl: "",
        SignalRHubMethodName: "",
        Period: 300,
        PeriodsAvailable: new Map([
            ["M1", 60],
            ["M5", 300],
        ]),
    };

    return (
        <CandleChart {...candleChartProps}/>
    );
}