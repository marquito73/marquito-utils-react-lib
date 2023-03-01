import React from "react";
import { EnumEvent } from "../../Enums";
import { Component, ComponentProps } from "../Component";
import "./css/TextArea.scss";

export interface TextAreaProps extends ComponentProps {
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
    CanHorizontallyResize: boolean,
    CanVerticalResize: boolean
}
export class TextArea<Props extends TextAreaProps> extends Component<Props & TextAreaProps, {}> {
	constructor(props: Props & TextAreaProps) {
		super(props);
		this.props.CssClass.push("TextArea-React");
        if (this.props.CanHorizontallyResize) {
            this.props.CssClass.push("horizontalResizeEnabled");
        }
        if (this.props.CanVerticalResize) {
            this.props.CssClass.push("verticalResizeEnabled");
        }
	}
    render() {

        return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
			>
				<textarea
					id={this.props.Id} 
					value={this.props.Value}
					placeholder={this.props.PlaceHolder}
					readOnly={this.props.ReadOnly}
					spellCheck={this.props.SpellCheck}
					onChange={this.HandleTextAreaChange}
				/>
			</div>
        );
    }

	private HandleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		console.log("New value : " + event.target.value);
		this.ExecuteFunction(EnumEvent.Change);
	}
}