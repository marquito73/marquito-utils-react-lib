import React from "react";
import { Component, ComponentProps } from "../Component";
import { Utils } from "../../Utils";
import CSS from 'csstype';

import "./css/TextParagraph.scss";

export interface TextParagraphProps extends ComponentProps {
	/**
	 * Value of text paragraph
	 * */
	Text: string,
	/**
	 * Text color
	 */
    TextColor: string,
	/**
	 * Text size
	 */
    TextSize: number,
	/**
	 * The component's background color
	 */
	BackgroundColor: string,
	/**
	 * Add minor brightness effect when component is hovered / focused ?
	 */
	BrightnessWhenHoverFocus: boolean,
}

export class TextParagraph<Props extends TextParagraphProps> extends Component<Props & TextParagraphProps, {}> {
	constructor(props: Props & TextParagraphProps) {
		super(props);
		this.AddCssClass("TextParagraph-React");

        if (this.props.BrightnessWhenHoverFocus) {
            this.AddCssClass("BrightnessWhenHoverFocus");
        }
	}
    render() {
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.TextColor)) {
            cssStyles.color = this.props.TextColor;
        }
        if (Utils.IsNotEmpty(this.props.TextSize)) {
            cssStyles.fontSize = this.props.TextSize + "px";
        }
        if (Utils.IsNotEmpty(this.props.BackgroundColor)) {
            cssStyles.backgroundColor = this.props.BackgroundColor;
        }
        
        return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
			>
                <p
                    id={this.props.Id}
					style={cssStyles}
                >
                    {this.props.Text}
                </p>
			</div>
        );
    }
}