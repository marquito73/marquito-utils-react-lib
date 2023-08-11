import * as React from "react";
import { useEffect } from "react";
import { EnumEvent } from "../../Enums";
import { Selector, StringBuilder, Utils } from "../../Utils";
import {Component, ComponentProps, ComponentState} from "../Component";
import "./css/Chart.scss";
import { BarChart } from "recharts";

export interface ChartProps extends ComponentProps {
	
}

export abstract class Chart<Props extends ChartProps> 
extends Component<Props & ChartProps, {}> {

	constructor(props: Props & ChartProps) {
        super(props);
		
		this.props.CssClass.push("Chart-React");
    }
}