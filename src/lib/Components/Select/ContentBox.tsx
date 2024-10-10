import React, { RefObject, useRef } from "react";
import { Selector, StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component/Component";
import { Option, OptionProps } from "./Option";
import CSS from 'csstype';
import { EnumEvent } from "../../Enums";
import "./css/ContentBox.scss";

export interface ContentBoxProps extends ComponentProps {
    IsEditable: boolean,
    Options: Array<OptionProps>,
    SelectedValue: string,
    PlaceHolder: string,
	/**
	 * The component has a border ?
	 */
	HasBorder: boolean,
	/**
	 * The component's background color
	 */
	BackgroundColor: string,
}

export abstract class ContentBox<Props extends ContentBoxProps> 
extends Component<Props & ContentBoxProps, {}> {
	constructor(props: Props & ContentBoxProps) {
		super(props);
		this.AddCssClass("ContentBox-React");

        if (!this.props.HasBorder) {
            this.AddCssClass("WithoutBorder");
        }
	}
    render() {
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.BackgroundColor)) {
            cssStyles.backgroundColor = this.props.BackgroundColor;
        }

        const valuesChecked: Array<string> = this.props.Options
            .filter(option => option.Selected)
            .map(option => option.Value);

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
                    onMouseLeave={this.HandleMouseLeave}
                    value={this.GetValuesSummary(valuesChecked)}
					style={cssStyles}
                />
                <this.GetSelectOptions/>
            </div>
        );
    }

    private HandleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
        // Get checked inputs
        const optionsChecked: Selector = new Selector(event.currentTarget).Children(".ContentBoxOptions")
            .Children("").Children("").Children("").Children("input");
        // Values
        const valuesChecked: Array<string> = optionsChecked.GetAll().map(input => input as HTMLInputElement)
            .filter(input => input.checked).map(input => input.value);
        // The input for the summary
        const input: HTMLInputElement = new Selector(event.currentTarget).Children("input").First() as HTMLInputElement;
        // Affect values to input summary
        input.value = this.GetValuesSummary(valuesChecked);

        this.SetInputValue(valuesChecked, new Selector(event.currentTarget));

        this.ExecuteFunction(EnumEvent.Change)();
    }

    protected SetInputValue = (values: Array<string>, listBoxSelector: Selector) => {
        // The input for the summary
        const input: HTMLInputElement = listBoxSelector.Children("input").First() as HTMLInputElement;
        // Affect values to input summary
        input.value = this.GetValuesSummary(values);
    }

    // Passer le type de checklistbox a cette fonction
    // et dans le cas d'une countrybox
    protected GetValuesSummary = (values: Array<string>) => {
        const sbInput: StringBuilder = new StringBuilder("");

        values.forEach((value) => {
            if (Utils.IsNotEmpty(sbInput.ToString())) {
                sbInput.Append(", ");
            }
            sbInput.Append(value);
        });
        
        return sbInput.ToString();
    }

    private HandleInputClick = (event: React.PointerEvent<HTMLInputElement>) => {
        const contentBoxOptions: Selector = new Selector(event.currentTarget)
        .Parent().Children(".ContentBoxOptions");

        if (contentBoxOptions.HasClass("opened")) {
            contentBoxOptions.RemoveClass("opened");
        } else {
            contentBoxOptions.AddClass("opened");
        }
    }

    private GetSelectOptions = () => {
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.BackgroundColor)) {
            cssStyles.backgroundColor = this.props.BackgroundColor;
        }
        return (
            <div
                id={`${this.props.Id}_options`}
                className="ContentBoxOptions"
                onMouseLeave={this.HandleMouseLeave}
                style={cssStyles}
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

    private HandleMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
        const contentBox: Selector = new Selector(event.currentTarget).Closest(".ContentBox-React");

        const summary: Selector = contentBox.Children("input:hover");
        const options: Selector = contentBox.Children(".ContentBoxOptions:hover");

        if (summary.Count() == 0 && options.Count() == 0) {
            contentBox.Children(".ContentBoxOptions").RemoveClass("opened");
        }
    }
}