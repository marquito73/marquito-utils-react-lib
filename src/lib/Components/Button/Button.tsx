import React from "react";
import { Component, ComponentProps } from "../Component";

import "./css/Button.scss";

export interface ButtonProps extends ComponentProps {
    Caption: string,
    Link: string
}


export class Button<Props extends ButtonProps> 
extends Component<Props & ButtonProps, {}> {
    render() {
        this.props.CssClass.push("Button-React");

        return (
            <div
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}
            >
                <a
                    href={this.props.Link}
                >
                    <span
                        id={this.props.Id}
                    >
                        {this.props.Caption}
                    </span>
                </a>
            </div>
        );
    }
}