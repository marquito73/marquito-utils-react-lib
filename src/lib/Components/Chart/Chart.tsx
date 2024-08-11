import React from "react";
import {Component, ComponentProps} from "../Component";
import { Label, LabelProps } from "../TextArea/Label";
import "./css/Chart.scss";

export interface ChartProps extends ComponentProps {
  Data: Array<object>,
  LabelColor: string,
  LabelSize: number,
  ChartTitle: string,
}

export abstract class Chart<Props extends ChartProps> 
extends Component<Props & ChartProps, {}> {

	constructor(props: Props & ChartProps) {
        super(props);
		
		this.props.CssClass.push("Chart-React");
    }

    /**
     * Get chart title
     * 
     * @returns Chart title
     */
    protected GetChartTitle = () => {
      const chipLabelProps: LabelProps = {
        Text: this.props.ChartTitle,
        For: "",
        BoldText: true,
        TextColor: "black",
        TextSize: 20,
        Id: `${this.props.Id}Title`,
        Name: `${this.props.Name}Title`,
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
      };
  
      return (
        <Label {...chipLabelProps}/>
      );
    }
}