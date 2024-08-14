import React from "react";
import { EnumEvent } from "../../Enums";
import { Component, ComponentProps, ComponentState } from "../Component";
import CSS from 'csstype';

import "./css/TextArea.scss";
import { Utils } from "../../Utils";

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
    CanVerticalResize: boolean,
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

export interface TextAreaState extends ComponentState {
    /**
     * Value updated when change
     */
    Value: string,
}

export class TextArea<Props extends TextAreaProps> extends Component<Props & TextAreaProps, TextAreaState> {
	constructor(props: Props & TextAreaProps, state: TextAreaState) {
		super(props, state);
        this.state = {
            Value: Utils.IsNull(this.props.Value) ? "" : this.props.Value
        }
		this.AddCssClass("TextArea-React");
        if (this.props.CanHorizontallyResize) {
            this.AddCssClass("horizontalResizeEnabled");
        }
        if (this.props.CanVerticalResize) {
            this.AddCssClass("verticalResizeEnabled");
        }

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
				<textarea
					id={this.props.Id} 
					value={this.state.Value}
					placeholder={this.props.PlaceHolder}
					readOnly={this.props.ReadOnly}
					spellCheck={this.props.SpellCheck}
					style={cssStyles}
					onChange={this.HandleTextAreaChange}
				/>
			</div>
        );
    }

	private HandleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.setState({Value: event.currentTarget.value}, this.ExecuteFunction(EnumEvent.Change));
		
	}
}