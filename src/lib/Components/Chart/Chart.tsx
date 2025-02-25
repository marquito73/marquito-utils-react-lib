import React from "react";
import {Component, ComponentProps, ComponentState} from "../Component";
import { Label, LabelProps } from "../TextArea/Label";
import "./css/Chart.scss";

export interface ChartProps extends ComponentProps {
  Data: Array<object>,
  LabelColor: string,
  LabelSize: number,
  ChartTitle: string,
  ChartTitleColor: string,
}

export interface ChartState extends ComponentState {

}

export abstract class Chart<Props extends ChartProps, State extends ChartState> 
extends Component<Props & ChartProps, State & ChartState> {

	constructor(props: Props & ChartProps, state: State & ChartState) {
        super(props, state);
		
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
        TextColor: this.props.ChartTitleColor,
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