import React from "react";
import { Option, OptionProps } from "../Option";
import { CountryBox } from "./CountryBox";
import { CheckRadioBoxProps } from "../CheckRadioBox";

export class CountryOption<Props extends OptionProps> 
extends Option<Props & OptionProps> {
    protected override RenderOptionComponent(props: CheckRadioBoxProps): JSX.Element {
        props.Type = "checkbox";
        const component = (<CountryBox {...props}/>);
        return component;
    }
    render() {
        this.props.CssClass.push("CountryOption-React");

        return (
            super.render()
        );
    }
}