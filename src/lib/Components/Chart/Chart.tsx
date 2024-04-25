import {Component, ComponentProps} from "../Component";
import "./css/Chart.scss";

export interface ChartProps extends ComponentProps {
  Data: Array<object>,
  LabelColor: string,
  LabelSize: number,
}

export abstract class Chart<Props extends ChartProps> 
extends Component<Props & ChartProps, {}> {

	constructor(props: Props & ChartProps) {
        super(props);
		
		this.props.CssClass.push("Chart-React");
    }
}