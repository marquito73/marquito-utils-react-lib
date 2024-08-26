import React, {useState} from "react";
import { Component, ComponentProps } from "../Component";
import { Utils } from "../../Utils";
import { EnumEvent } from "../../Enums";
import "./css/IconButton.scss";
import { AbstractButton, AbstractButtonProps } from "./AbstractButton";
import { Icon, IconProps } from "../Common/Icon";

export interface IconButtonProps extends AbstractButtonProps {
    IconClass: string,
    IconColor: string
    IconSize: number,
}

export class IconButton<Props extends IconButtonProps> extends AbstractButton<Props & IconButtonProps> {
	constructor(props: Props & IconButtonProps) {
		super(props);
		this.props.CssClass.push("IconButton-React");
	}
    render() {
        return (
            <div
                id={this.GetOwnContainerId()}
				className={this.GetOwnCssClassWithOthers(["IconButton-React"])}
            >
                <a
                    title={this.props.Caption}
                    href={this.GetLink()}
                    rel="noopener noreferrer"
                    target={this.GetTarget()}
                    onClick={this.ExecuteFunction(EnumEvent.Click)}
                    onMouseEnter={this.ExecuteFunction(EnumEvent.MouseEnter)}
                >
                    {this.GetButtonIcon()}
                </a>
            </div>
        );
    }

    private GetButtonIcon = () => {
        const iconProps: IconProps = {
            IconClass: this.props.IconClass,
            IconColor: this.props.IconColor,
            Id: this.props.Id + "Icon",
            Name: this.props.Name + "Icon",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
            IconSize: this.props.IconSize,
        }

        return (
            <Icon {...iconProps}/>
        );
    }
}