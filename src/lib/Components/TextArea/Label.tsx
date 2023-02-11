import * as React from "react";
//import Component, { ComponentProps } from "../Component";
import {Component, ComponentProps} from "../Component";
import { useState } from 'react';	
import { Utils } from "../../Utils";
import CSS from 'csstype';
import "./css/Label.scss";

export interface LabelProps extends ComponentProps {
	/**
	 * Caption of label
	 * */
	Text: string,
    /**
     * For which element this label is ?
     */
    For: string,
	/**
	 * Text is bold ?
	 */
	BoldText: boolean,
	/**
	 * Text color
	 */
    TextColor: string,
	/**
	 * Text size
	 */
    TextSize: number,
}

export class Label<Props extends LabelProps> extends Component<Props & LabelProps, {}> {
	render() {
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.BoldText)) {
            cssStyles.fontWeight = "bold";
        }
        if (Utils.IsNotEmpty(this.props.TextColor)) {
            cssStyles.color = this.props.TextColor;
        }
        if (Utils.IsNotEmpty(this.props.TextSize)) {
            cssStyles.fontSize = this.props.TextSize + "px";
        }

		this.props.CssClass.push("Label-React");
		
		return (
			<div 
				id={this.GetOwnContainerId()} 
				className={this.GetOwnCssClass()}
			>
				<label 
					id={this.props.Id} 
					htmlFor={this.props.For}
					style={cssStyles}
				>
                    {this.props.Text}
                </label>
			</div>
		);
	}
}