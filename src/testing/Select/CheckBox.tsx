import React from "react";
import { CheckBox } from "../../lib/Components/Select/CheckBox";
import { CheckRadioBoxProps } from "../../lib/Components/Select/CheckRadioBox";
import { EnumEvent } from "../../lib/Enums";


export const TestCheckBox = (selected: boolean, value: string) => {

    // Checkbox
    const chkProps: CheckRadioBoxProps = {
        Caption: "Test checkbox",
        Value: value,
        Selected: selected,
        Type: "checkbox",
        Id: "chkTest" + value,
        Name: "chkTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    chkProps.Events.set(EnumEvent.Check, Function("document.testCheck()"));

    return (
        <CheckBox {...chkProps}/>
    );
}