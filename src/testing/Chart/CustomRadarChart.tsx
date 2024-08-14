

import React from "react";
import { CustomRadarChart, RadarChartProps, RadarType } from "../../lib";

export const TestRadarChart = () => {
    const data = [
        {
          Subject: 'Math',
          A: 120,
          B: 110,
          fullMark: 150,
        },
        {
          Subject: 'Chinese',
          A: 98,
          B: 130,
          fullMark: 150,
        },
        {
          Subject: 'English',
          A: 86,
          B: 130,
          fullMark: 150,
        },
        {
          Subject: 'Geography',
          A: 99,
          B: 100,
          fullMark: 150,
        },
        {
          Subject: 'Physics',
          A: 85,
          B: 90,
          fullMark: 150,
        },
        {
          Subject: 'History',
          A: 65,
          B: 85,
          fullMark: 150,
        },
      ];

      const radarTypes: Array<RadarType> = [
        {
          Name: "Théo",
          DataKey: "A",
          StrokeColor: "#ed980e",
          FillColor: "#ed980e"
        },
        {
          Name: "Mike",
          DataKey: "B",
          StrokeColor: "#8884d8",
          FillColor: "#8884d8"
        },
      ];

    // Chart
    const radarChartProps: RadarChartProps = {
      Data: data,
      RadarTypes: radarTypes,
      Id: "radarChart",
      Name: "",
      CssClass: new Array(),
      Attributes: new Map(),
      Events: new Map(),
      LabelColor: "gray",
      LabelSize: 20,
      RadarGridColor: "gray",
      ChartTitle: "Test graph",
      ChartTitleColor: "black"
    };

    return (
        <CustomRadarChart {...radarChartProps}/>
    );
}