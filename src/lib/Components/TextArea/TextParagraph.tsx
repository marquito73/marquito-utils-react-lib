import React from "react";
import { Component, ComponentProps, ComponentState } from "../Component";
import { Selector, Utils } from "../../Utils";
import CSS from 'csstype';

import "./css/TextParagraph.scss";
import { Button, ButtonProps } from "../Button";
import { EnumEvent } from "../../Enums";

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
	/**
	 * Has a view more / less button ?
	 */
	HasViewMoreButton: boolean,
	/**
	 * View more content
	 */
	ViewMoreContent: string,
	/**
	 * View less content
	 */
	ViewLessContent: string,
	ViewMoreButtonColor: string,
}

export interface TextParagraphState extends ComponentState {
    /**
     * View Content Label updated when change
     */
    ViewContentLabel: string,
	ViewMoreState: boolean,
}

export class TextParagraph<Props extends TextParagraphProps> extends Component<Props & TextParagraphProps, TextParagraphState> {
	constructor(props: Props & TextParagraphProps, state: TextParagraphState) {
		super(props, state);
		this.state = {
			ViewContentLabel: this.props.ViewMoreContent,
			ViewMoreState: false,
		};
		this.AddCssClass("TextParagraph-React");

        if (this.props.BrightnessWhenHoverFocus) {
            this.AddCssClass("BrightnessWhenHoverFocus");
        }
		if (this.props.HasViewMoreButton) {
			this.AddCssClass("WithViewMoreButton");
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

				{this.GetViewMoreButton()}
			</div>
        );
    }

	private GetViewMoreButton = () => {
		const viewMoreProps: ButtonProps = {
			BoldCaption: true,
			CaptionColor: this.props.ViewMoreButtonColor,
			BackgroundColor: "none",
			BorderColor: "none",
			CaptionSize: this.props.TextSize,
			Caption: this.state.ViewContentLabel,
			Link: "",
			OpenInNewTab: false,
			Id: `${this.GetOwnId()}ViewMoreButton`,
			Name: `${this.GetOwnId()}ViewMoreButton`,
			CssClass: new Array(),
			Attributes: new Map(),
			Events: new Map()
		};

		viewMoreProps.Events.set(EnumEvent.Click, () => {
			if (!this.state.ViewMoreState) {
				this.AddCssClass("ViewAllContent");
				this.setState({
					ViewMoreState: true,
					ViewContentLabel: this.props.ViewLessContent,
				}, () => this.forceUpdate);
			} else {
				this.RemoveCssClass("ViewAllContent");
				this.setState({
					ViewMoreState: false,
					ViewContentLabel: this.props.ViewMoreContent,
				}, () => this.forceUpdate);
			}
		});
		
		if (!this.props.HasViewMoreButton) {
			viewMoreProps.CssClass.push("hidden");
		}

		return (
			<Button {...viewMoreProps}/>
		);
	}
}