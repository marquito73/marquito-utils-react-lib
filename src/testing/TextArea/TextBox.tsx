import React from "react";
import { TextBoxProps, TextBox } from "../../lib";


export const TestTextBox = (value: string, placeHolder: string) => {

    // Textbox
    const txtProps: TextBoxProps = {
        Value: value,
        PlaceHolder: placeHolder,
        ContainerId: "textbox",
        Id: "txtTest" + value,
        Name: "txtTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    return (
        <TextBox {...txtProps}/>
    );
}