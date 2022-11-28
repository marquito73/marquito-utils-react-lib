import * as React from "react";
//import Component, { ComponentProps } from "../Component";
import {Component, ComponentProps} from "../Component";
import { useState } from 'react';	

export interface LabelProps extends ComponentProps {
	/**
	 * Caption of label
	 * */
	Text: string,
    /**
     * For which element this label is ?
     */
    For: string
}

export class Label<Props extends LabelProps> extends Component<Props & LabelProps, {}> {
	render() {
		return (
			<div id={this.GetOwnContainerId()} className="Label-React">
				<label 
					id={this.props.Id} 
					className="Label-React" 
					htmlFor={this.props.For}
				>
                    {this.props.Text}
                </label>
			</div>
		);
	}
}