import * as React from "react";
import {Component, ComponentProps, ComponentState} from "../Component";
import "./css/Icon.scss";

export interface IconProps extends ComponentProps {
    IconClass: string,
    IconColor: string
}

export class Icon<Props extends IconProps> extends Component<Props & IconProps, {}> {
	constructor(props: Props & IconProps) {
		super(props);
	}

	render() {
		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClassWithOthers(["Icon-React", this.props.IconClass])}
                style={{color: this.props.IconColor}}
			>
                
			</div>
		);
	}
}