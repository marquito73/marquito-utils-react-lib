import React from "react";
import { EnumEvent } from "../../../Enums";
import {CheckRadioBoxProps, CheckRadioBox, CheckRadioBoxState} from "../CheckRadioBox";
import "./css/CountryBox.scss"
import { Label, LabelProps } from "../../TextArea";
import { FlagUtils } from "../../../Utils/FlagUtils";
import { Selector } from "../../../Utils";

export class CountryBox<Props extends CheckRadioBoxProps> 
extends CheckRadioBox<Props & CheckRadioBoxProps, CheckRadioBoxState> {
    render() {
        this.props.CssClass.push("CountryBox-React");

        const toggleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.IsChecked = event.target.checked;
            console.log(event.target.value + " : " + this.IsChecked);

            this.ExecuteFunction(EnumEvent.Check);
        }

        return (
            <div 
                id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
                className={this.GetOwnCssClass()}
                onChange={toggleCheck}
                onClick={this.ToggleClick}
            >
                <this.GetCountryInput/>
                <this.GetCountryLabel/>
            </div>
        );
    }

    private ToggleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const countryBox: Selector = new Selector(event.currentTarget).Closest(".CountryListBox-React");

        this.ExecuteFunction(EnumEvent.Click)();
    }

    private GetCountryInput = () => {
        return FlagUtils.GetFlagComponent(this.props.Value);
    }

    private GetCountryLabel = () => {
        const countryLabelProps: LabelProps = {
            Text: this.props.Caption,
            For: "",
            BoldText: false,
            TextColor: "",
            TextSize: 14,
            Id: `${this.props.Id}Label`,
            Name: `${this.props.Name}Label`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        };
        countryLabelProps.CssClass.push("CountryBoxCaption");

        return (
            <Label {...countryLabelProps}></Label>
        );
    }
}