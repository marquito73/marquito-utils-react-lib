import React from "react";

import { Button, ButtonProps } from "../Button";
import { EnumEvent } from "../../Enums";

export interface TabProps extends ButtonProps {
    OnClick: Function
}

export class Tab<Props extends TabProps> 
extends Button<Props & TabProps> {
    render() {
        this.props.CssClass.push("Tab-React");

        this.props.Events.set(EnumEvent.OnClick, this.props.OnClick);

        return (
            <div
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}
                
            >
                {super.render()}
            </div>
        );
    }
}