import * as React from "react";
import {Component, ComponentProps} from "../Component";
import { Icon, IconProps } from "../Common";

import "./css/Spinner.scss";

export interface SpinnerProps extends ComponentProps {
	/**
	 * Spinner icon
	 * */
	SpinnerIcon: string,
	/**
	 * Spinner icon color
	 * */
	SpinnerIconColor: string,
}

export class Spinner<Props extends SpinnerProps> extends Component<Props & SpinnerProps, {}> {
	constructor(props: Props & SpinnerProps) {
		super(props);
        this.AddCssClass("Spinner-React");
	}

	render() {
		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
			>
				<this.GetSpinnerIcon/>
			</div>
		);
	}

	private GetSpinnerIcon = () => {
        const spinnerProps: IconProps = {
            IconClass: this.props.SpinnerIcon,
            IconColor: this.props.SpinnerIconColor,
            Id: `${this.props.Id}_spinnerIcon`,
            Name: `${this.props.Id}_spinnerIcon`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        };
        return (
            <Icon {...spinnerProps}></Icon>
        );
    }
}