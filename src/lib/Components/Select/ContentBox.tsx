import React, { RefObject, useRef } from "react";
import { EnumInputType } from "../../Enums";
import { Selector, StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component/Component";
import { Option, OptionProps } from "./Option";
import "./css/ContentBox.scss";

export interface ContentBoxProps extends ComponentProps {
    IsEditable: boolean,
    Options: Array<OptionProps>,
    SelectedValue: string,
    PlaceHolder: string
}

export abstract class ContentBox<Props extends ContentBoxProps> 
extends Component<Props & ContentBoxProps, {}> {
    render() {
        
        this.props.CssClass.push("ContentBox-React");

        return(
            <div
                id={this.GetContainerId(this.props.Id)}
                className={this.GetOwnCssClass()}
                onChange={this.HandleChange}
            >
                <input
                    id={`${this.props.Id}Input`}
                    readOnly
                    placeholder={this.props.PlaceHolder}
                    onClick={this.HandleInputClick}
                />
                <this.GetSelectOptions/>
            </div>
        );
    }

    private HandleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
        console.log("Change detected !");
        
        //const valuesChecked: Array<string> = new Array();

        const optionsChecked: Selector = new Selector(event.currentTarget).Children(".ContentBoxOptions")
            .Children("").Children("").Children("").Children("input");
        
        const valuesChecked: Array<string> = optionsChecked.GetAll().map(input => input as HTMLInputElement)
            .filter(input => input.checked).map(input => input.value);
            console.log(valuesChecked);

        const input: HTMLInputElement = new Selector(event.currentTarget).Children("input").First() as HTMLInputElement;

        input.value = this.GetInputValue(valuesChecked);
    }

    private GetInputValue = (values: Array<string>) => {
        const sbInput: StringBuilder = new StringBuilder("");

        values.forEach((value) => {
            if (Utils.IsNotEmpty(sbInput.ToString())) {
                sbInput.Append(", ");
            }
            sbInput.Append(value);
        })
        
        return sbInput.ToString();
    }

    private HandleInputClick = (event: React.PointerEvent<HTMLInputElement>) => {
        const contentBoxOptions: Selector = new Selector(event.currentTarget)
        .Parent().Children(".ContentBoxOptions");

        if (contentBoxOptions.HasClass("opened")) {
            contentBoxOptions.RemoveClass("opened");
        } else {
            contentBoxOptions.AddClass("opened");
            contentBoxOptions.First().focus();
        }
    }

    private GetSelectOptions = () => {
        return (
            <div
                id={`${this.props.Id}_options`}
                className="ContentBoxOptions"
            >
                {
                    this.props.Options.map((option) => {
                        return (
                            <Option {...option} key={option.Id}/>
                        );
                    })
                }
            </div>
        );
    }
}