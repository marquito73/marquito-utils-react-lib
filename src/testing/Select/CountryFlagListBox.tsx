import React from "react";
import { CountryFlagListBox, CountryFlagListBoxProps } from "../../lib";

export const TestCountryFlagListBox = () => {

    const countryFlagListBoxProps: CountryFlagListBoxProps = {
        Id: "cboCountryFlagTest",
        Name: "cboCountryFlagTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
        FilterCountries: ["US", "GB", "FR"],
        SelectedFlag: ""
    }

    return (
        <CountryFlagListBox {...countryFlagListBoxProps} />
    );
}