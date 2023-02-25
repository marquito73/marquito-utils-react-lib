import * as React from "react";
import { EnumEvent } from "../../Enums";
import {Component, ComponentProps} from "../Component";
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
	SpellCheck: boolean
}

export class TextBox<Props extends TextBoxProps> extends Component<Props & TextBoxProps, {}> {
	render() {
		this.props.CssClass.push("TextBox-React");
		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
			>
				<input
					id={this.props.Id} 
					defaultValue={this.props.Value}
					placeholder={this.props.PlaceHolder}
					readOnly={this.props.ReadOnly}
					spellCheck={this.props.SpellCheck}
					onChange={this.HandleChange} 
				/>
			</div>
		);
	}

	private HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log("New value : " + event.target.value);
		this.ExecuteFunction(EnumEvent.OnChange);
	}
}