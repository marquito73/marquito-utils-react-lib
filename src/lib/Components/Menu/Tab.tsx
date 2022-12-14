import React from "react";

import { Button, ButtonProps } from "../Button";
import { EnumEvent } from "../../Enums";
import CSS from 'csstype';
import { Selector, Utils } from "../../Utils";

export interface TabProps extends ButtonProps {
    OnClick: Function
}

export class Tab<Props extends TabProps> 
extends Button<Props & TabProps> {
    render() {
        this.props.CssClass.push("Tab-React");

        const cssStyles: CSS.Properties = {};
        if (this.props.BoldCaption) {
            cssStyles.fontWeight = "bold";
        }
        if (Utils.IsNotEmpty(this.props.CaptionColor)) {
            cssStyles.color = this.props.CaptionColor;
        }
        if (Utils.IsNotEmpty(this.props.CaptionSize)) {
            cssStyles.fontSize = this.props.CaptionSize + "px";
        }

        this.props.Events.set(EnumEvent.OnClick, this.HandleClick);
        this.props.Events.set(EnumEvent.OnMouseEnter, this.HandleMouseEnter);

        return (
            <div
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}
                style={cssStyles}
            >
                {this.GetButton()}
            </div>
        );
    }

    private GetButton = () => {
        const btnProps: ButtonProps = {
            Caption: this.props.Caption,
            BoldCaption: this.props.BoldCaption,
            CaptionColor: this.props.CaptionColor,
            BackgroundColor: this.props.BackgroundColor,
            BorderColor: this.props.BorderColor,
            CaptionSize: this.props.CaptionSize,
            Link: this.props.Link,
            ContainerId: "button",
            Id: this.props.Id + "Button",
            Name: this.props.Name + "Button",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: this.props.Events
        }

        return (
            <Button {...btnProps}></Button>
        );
    }

    private HandleClick = () => {
        const tab: Selector = new Selector(`#${this.GetOwnContainerId()}.Tab-React`);
        tab.Parent().Children("").RemoveClass("active");
        tab.AddClass("active");

        this.props.OnClick();
    }

    private HandleMouseEnter = () => {
        console.log("Test hover");
    }
}