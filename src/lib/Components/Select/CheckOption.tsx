import React from "react";
import { CheckBox } from "./CheckBox";
import { CheckRadioBoxProps } from "./CheckRadioBox";
import { Option, OptionProps } from "./Option";

export class CheckOption<Props extends OptionProps> 
extends Option<Props & OptionProps> {
    protected override RenderOptionComponent(props: CheckRadioBoxProps): JSX.Element {
        props.Type = "checkbox";
        const component = (<CheckBox {...props}/>);
        return component;
    }
    render() {
        this.props.CssClass.push("CheckOption-React");

        return (
            super.render()
        );
    }
}