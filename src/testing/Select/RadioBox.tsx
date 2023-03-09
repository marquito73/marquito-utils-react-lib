import React from "react";
import { CheckRadioBoxProps, RadioBox } from "../../lib";


export const TestRadioBox = (selected: boolean, value: string) => {

    // Radiobox
    const rbProps: CheckRadioBoxProps = {
        Caption: "Test radiobox " + value,
        Value: value,
        Selected: selected,
        Type: "radio",
        Id: "rbTest" + value,
        Name: "rbTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    return (
        <RadioBox {...rbProps}/>
    );
}