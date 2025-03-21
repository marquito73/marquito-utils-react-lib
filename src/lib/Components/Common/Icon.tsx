import * as React from "react";
import {Component, ComponentProps, ComponentState} from "../Component";
import CSS from 'csstype';
import "./css/Icon.scss";

export interface IconProps extends ComponentProps {
    IconClass: string,
    IconColor: string,
	IconSize: number,
}

export class Icon<Props extends IconProps> extends Component<Props & IconProps, {}> {
	constructor(props: Props & IconProps) {
		super(props);
	}

	render() {
		const cssStyles: CSS.Properties = {
			color: this.props.IconColor,
			"--icon-size": this.props.IconSize === undefined ? "1.5rem" : `${this.props.IconSize}px`,
		} as CSS.Properties;

		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClassWithOthers(["Icon-React", this.props.IconClass])}
                style={cssStyles}
			/>
		);
	}
}