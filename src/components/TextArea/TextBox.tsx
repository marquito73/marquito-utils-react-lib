import * as React from "react";
import Component, { ComponentProps } from "../Component";
import { useState } from 'react';

export interface TextBoxProps extends ComponentProps {
	/**
	 * Value of textbox
	 * */
	Value: string,
	/**
	 * Placeholder of textbox
	 * */
	PlaceHolder: string
}

export default class TextBox extends Component<TextBoxProps> {
	render() {
		this.LogProperties();
		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			//this.LogProperties();
			console.log("New value : " + event.target.value);
		};

		return (
			<div id={this.props.Id + "_cnt"}>
				<input
					defaultValue={this.props.Value}
					placeholder={this.props.PlaceHolder}
					onChange={handleChange} />
			</div>
		);
	}
}