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
    TextSize: number
}

export class TextParagraph<Props extends TextParagraphProps> extends Component<Props & TextParagraphProps, {}> {
	constructor(props: Props & TextParagraphProps) {
		super(props);
		this.props.CssClass.push("TextParagraph-React");
	}
    render() {
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.TextColor)) {
            cssStyles.color = this.props.TextColor;
        }
        if (Utils.IsNotEmpty(this.props.TextSize)) {
            cssStyles.fontSize = this.props.TextSize + "px";
        }
        
        return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
                style={cssStyles}
			>
                <p
                    id={this.props.Id}
                >
                    {this.props.Text}
                </p>
			</div>
        );
    }
}