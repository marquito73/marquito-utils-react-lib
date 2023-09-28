import React from "react";
import { CheckRadioBoxProps } from "./CheckRadioBox";
import { Option, OptionProps } from "./Option";
import { RadioBox } from "./RadioBox";

export class RadioOption<Props extends OptionProps> 
extends Option<Props & OptionProps> {
    protected override RenderOptionComponent(props: CheckRadioBoxProps): JSX.Element {
        props.Type = "radio";
        const component = (<RadioBox {...props}/>);
        return component;
    }
    render() {
        this.props.CssClass.push("RadioOption-React");

        return (
            super.render()
        );
    }
}