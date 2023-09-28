import { ContentBox, ContentBoxProps } from "../ContentBox";
import { hasFlag } from "country-flag-icons";
import { countries } from "countries-list";
import { OptionProps } from "../Option";
import { EnumEvent, EnumInputType } from "../../../Enums";
import { Selector, Utils } from "../../../Utils";
import "./css/CountryListBox.scss"

export interface CountryListBoxProps extends ContentBoxProps {
    FilterCountries: Array<string>,
}

export class CountryListBox<Props extends CountryListBoxProps> 
extends ContentBox<Props & CountryListBoxProps> {
    render() {
        this.props.CssClass.push("CountryListBox-React");

        this.SetCountryOptions();

        this.props.Options.forEach(option => {
            option.Events.set(EnumEvent.Click, (optionProps: OptionProps) => {
                // New summary
                const values: Array<string> = new Array<string>();
                values.push(`[${optionProps.Value}] ${optionProps.Caption}`)
                // Get container selector
                const listBoxSelector: Selector = new Selector(`#${this.GetContainerId(this.props.Id)}`)
                // Set summary with values
                this.SetInputValue(values, listBoxSelector);
            });
        })

        return (
            super.render()
        );
    }

    private SetCountryOptions = () => {
        Object.entries(countries)
        .filter((isoCode) => hasFlag(isoCode[0]))
        .filter((isoCode) => Utils.IsEmpty(this.props.FilterCountries) || this.props.FilterCountries.includes(isoCode[0]))
        .map((isoCode) => {
            const option: OptionProps = {
                Caption: isoCode[1].name,
                Value: isoCode[0],
                Selected: false,
                CheckType: EnumInputType.Country,
                Id: `opt${isoCode[0]}`,
                Name: `opt${isoCode[0]}`,
                CssClass: new Array(),
                Attributes: new Map(),
                Events: new Map()
            };

            this.props.Options.push(option);
        });
    }
}