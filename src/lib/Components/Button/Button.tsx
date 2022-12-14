import React, {useState} from "react";
import { Component, ComponentProps } from "../Component";
import CSS from 'csstype';

import "./css/Button.scss";
import { Utils } from "../../Utils";
import { Label, LabelProps } from "../TextArea";
import { EnumEvent } from "../../Enums";

export interface ButtonProps extends ComponentProps {
    Caption: string,
    BoldCaption: boolean
    CaptionColor: string,
    BackgroundColor: string,
    BorderColor: string,
    CaptionSize: number,
    Link: string
}

export class Button<Props extends ButtonProps> 
extends Component<Props & ButtonProps, {}> {
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
                    // href={this.props.Link}
                    onClick={this.ExecuteFunction(EnumEvent.OnClick)}
                    onMouseEnter={this.ExecuteFunction(EnumEvent.OnMouseEnter)}
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
            ContainerId: "",
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