import React from "react";
import { OptionProps } from "../../lib/Components/Select/Option";
import { CountryListBox, CountryListBoxProps } from "../../lib/Components/Select/Country/CountryListBox";
import { ContentBoxProps } from "../../lib/Components/Select/ContentBox";
import { EnumInputType } from "../../lib";

export const TestCountryListBox = () => {

    const countryListBoxProps: CountryListBoxProps = {
        IsEditable: true,
        Options: new Array(),
        SelectedValue: "",
        PlaceHolder: "Placeholder countrylistbox",
        Id: "clbCountryTest",
        Name: "clbCountryTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
        FilterCountries: new Array(),
        //FilterCountries: ["FR", "US", "GB"],
    }

    return (
        <CountryListBox {...countryListBoxProps} />
    );
}