import * as React from "react";
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
	PlaceHolder: string
}

export class TextBox<Props extends TextBoxProps> extends Component<Props & TextBoxProps, {}> {
	render() {
		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			//this.LogProperties();
			console.log("New value : " + event.target.value);
		};

		// let cssClass: Array<string> = new Array();
		// cssClass.push("TextBox-React");
		// cssClass = cssClass.concat(this.props.CssClass);

		//const cssClass: Array<string> = new Array("TextBox-React").concat(this.props.CssClass);

		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				// {...this.GetCssAttribute(cssClass)}
				className="TextBox-React"
			>
				<input
					id={this.props.Id} 
					defaultValue={this.props.Value}
					placeholder={this.props.PlaceHolder}
					onChange={handleChange} />
			</div>
		);
	}
}