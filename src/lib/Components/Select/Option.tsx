import React from "react";
import { EnumInputType } from "../../Enums";
import { Component, ComponentProps } from "../Component/Component";
import { Label, LabelProps } from "../TextArea";
import { CheckBox } from "./CheckBox";
import { CheckRadioBoxProps } from "./CheckRadioBox";
import { RadioBox } from "./RadioBox";

export interface OptionProps extends ComponentProps {
    Caption: string,
    Value: string,
    Selected: boolean,
    CheckType: EnumInputType
}

export abstract class Option<Props extends OptionProps> extends Component<Props & OptionProps, {}> {
    
    render() {
        
        return(
            <div
                id={this.GetContainerId(this.props.Id + "_option")}
            >
                <this.GetOptionComponent/>
            </div>
        );
    }

    private GetOptionComponent = () => {
        let component: JSX.Element;

        const props: CheckRadioBoxProps = {
            Caption: this.props.Caption,
            Value: this.props.Value,
            Selected: this.props.Selected,
            Type: "",
            ContainerId: this.props.ContainerId,
            Id: this.props.Id,
            Name: this.props.Name,
            CssClass: this.props.CssClass,
            Attributes: this.props.Attributes,
            Events: this.props.Events
        }
        if (this.props.CheckType == EnumInputType.Radio) {
            props.Type = "checkbox";
            component = (<RadioBox {...props}/>);
        } else if (this.props.CheckType == EnumInputType.Check) {
            props.Type = "radio";
            component = (<CheckBox {...props}/>);
        } else {
            const optProps: LabelProps = {
                Text: this.props.Caption,
                For: "",
                BoldText: false,
                TextColor: "black",
                TextSize: 10,
                ContainerId: this.props.ContainerId,
                Id: this.props.Id,
                Name: this.props.Name,
                CssClass: this.props.CssClass,
                Attributes: this.props.Attributes,
                Events: this.props.Events
            }
            component = (<Label {...optProps}/>);
        }

        return component;
    }
}