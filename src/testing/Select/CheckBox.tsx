import React from "react";
import { CheckBox, CheckRadioBoxProps } from "../../lib";


export const TestCheckBox = (selected: boolean, value: string) => {

    // Checkbox
    const chkProps: CheckRadioBoxProps = {
        Caption: "Test checkbox",
        Value: value,
        Selected: selected,
        Type: "checkbox",
        ContainerId: "checkbox",
        Id: "chkTest" + value,
        Name: "chkTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    chkProps.Events.set("OnCheck", "document.testCheck()");

    return (
        <CheckBox {...chkProps}/>
    );
}