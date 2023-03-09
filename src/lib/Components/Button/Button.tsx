import React, {useState} from "react";
import { Utils } from "../../Utils";
import { Label, LabelProps } from "../TextArea";
import { EnumEvent } from "../../Enums";
import CSS from 'csstype';
import "./css/Button.scss";
import { AbstractButton, AbstractButtonProps } from "./AbstractButton";

export interface ButtonProps extends AbstractButtonProps {
    BoldCaption: boolean
    CaptionColor: string,
    BackgroundColor: string,
    BorderColor: string,
    CaptionSize: number
}

export class Button<Props extends ButtonProps> extends AbstractButton<Props & ButtonProps> {
	constructor(props: Props & AbstractButtonProps) {
		super(props);
	}
    render() {
        this.props.CssClass.push("Button-React");
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.BackgroundColor)) {
            cssStyles.backgroundColor = this.props.BackgroundColor;
        }
        if (Utils.IsNotEmpty(this.props.BorderColor)) {
            cssStyles.borderColor = this.props.BorderColor;
        }

        return (
            <div
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}
                style={cssStyles}
                
            >
                <a
                    href={this.GetLink()}
                    rel="noopener noreferrer"
                    target={this.GetTarget()}
                    onClick={this.ExecuteFunction(EnumEvent.Click)}
                    onMouseEnter={this.ExecuteFunction(EnumEvent.MouseEnter)}
                >
                    <span
                        id={this.props.Id}
                    >
                        {this.GetButtonLabel()}
                    </span>
                </a>
            </div>
        );
    }

    private GetButtonLabel = () => {
        const lblProps: LabelProps = {
            Text: this.props.Caption,
            For: "",
            BoldText: this.props.BoldCaption,
            TextColor: this.props.CaptionColor,
            TextSize: this.props.CaptionSize,
            Id: this.props.Id + "Label",
            Name: this.props.Name + "Label",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return (
            <Label {...lblProps}/>
        );
    }
}