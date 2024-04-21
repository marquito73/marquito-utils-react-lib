import React from "react";
import { EnumEvent } from "../../Enums";
import { Component, ComponentProps, ComponentState } from "../Component";
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
	/**
	 * TextArea can be resized horizontally ?
	 */
    CanHorizontallyResize: boolean,
	/**
	 * TextArea can be resized verticaly ?
	 */
    CanVerticalResize: boolean
}

export interface TextAreaState extends ComponentState {
    /**
     * Value updated when change
     */
    Value: string
}

export class TextArea<Props extends TextAreaProps> extends Component<Props & TextAreaProps, TextAreaState> {
	constructor(props: Props & TextAreaProps, state: TextAreaState) {
		super(props, state);
        this.state = {
            Value: this.props.Value
        }
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
					value={this.state.Value}
					placeholder={this.props.PlaceHolder}
					readOnly={this.props.ReadOnly}
					spellCheck={this.props.SpellCheck}
					onChange={this.HandleTextAreaChange}
				/>
			</div>
        );
    }

	private HandleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.setState({Value: event.currentTarget.value}, this.ExecuteFunction(EnumEvent.Change));
		
	}
}