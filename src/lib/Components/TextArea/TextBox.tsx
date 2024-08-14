import * as React from "react";
import { EnumEvent } from "../../Enums";
import {Component, ComponentProps, ComponentState} from "../Component";
import CSS from 'csstype';
import { Utils } from "../../Utils";

import "./css/TextBox.scss";

export interface TextBoxProps extends ComponentProps {
	/**
	 * Value of textbox
	 * */
	Value: string,
	/**
	 * Placeholder of textbox
	 * */
	PlaceHolder: string,
	/**
	 * Textbox is readonly ?
	 */
	ReadOnly: boolean,
	/**
	 * Check spelling ?
	 */
	SpellCheck: boolean,
	/**
	 * Textbox type
	 */
	Type: string,
	/**
	 * The component has a border ?
	 */
	HasBorder: boolean,
	/**
	 * The component's background color
	 */
	BackgroundColor: string,
	/**
	 * Add minor brightness effect when component is hovered / focused ?
	 */
	BrightnessWhenHoverFocus: boolean,
}

export interface TextBoxState extends ComponentState {
    /**
     * Value updated when change
     */
    Value: string,
}

export class TextBox<Props extends TextBoxProps> extends Component<Props & TextBoxProps, TextBoxState> {
	constructor(props: Props & TextBoxProps, state: TextBoxState) {
		super(props, state);
        this.state = {
            Value: Utils.IsNull(this.props.Value) ? "" : this.props.Value,
        }
        this.AddCssClass("TextBox-React");

        if (!this.props.HasBorder) {
            this.AddCssClass("WithoutBorder");
        }

        if (this.props.BrightnessWhenHoverFocus) {
            this.AddCssClass("BrightnessWhenHoverFocus");
        }
	}

	render() {
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.BackgroundColor)) {
            cssStyles.backgroundColor = this.props.BackgroundColor;
        }
		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
			>
				<input
					id={this.props.Id} 
					value={this.state.Value}
					placeholder={this.props.PlaceHolder}
					readOnly={this.props.ReadOnly}
					spellCheck={this.props.SpellCheck}
					type={this.props.Type}
					style={cssStyles}
					onChange={this.HandleTextBoxChange} 
				/>
			</div>
		);
	}

	private HandleTextBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({Value: event.currentTarget.value}, this.ExecuteFunction(EnumEvent.Change));
	}
}