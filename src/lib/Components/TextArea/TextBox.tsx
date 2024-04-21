import * as React from "react";
import { EnumEvent } from "../../Enums";
import {Component, ComponentProps, ComponentState} from "../Component";
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
	Type: string
}

export interface TextBoxState extends ComponentState {
    /**
     * Value updated when change
     */
    Value: string
}

export class TextBox<Props extends TextBoxProps> extends Component<Props & TextBoxProps, TextBoxState> {
	constructor(props: Props & TextBoxProps, state: TextBoxState) {
		super(props, state);
        this.state = {
            Value: this.props.Value
        }
	}

	render() {
        this.AddCssClass("TextBox-React");
		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
			>
				<input
					id={this.props.Id} 
					defaultValue={this.props.Value}
					value={this.state.Value}
					placeholder={this.props.PlaceHolder}
					readOnly={this.props.ReadOnly}
					spellCheck={this.props.SpellCheck}
					type={this.props.Type}
					onChange={this.HandleTextBoxChange} 
				/>
			</div>
		);
	}

	private HandleTextBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({Value: event.currentTarget.value}, this.ExecuteFunction(EnumEvent.Change));
	}
}