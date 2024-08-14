import React from "react";
import { TextBoxProps, TextBox } from "../../lib";


export const TestTextBox = (value: string, placeHolder: string) => {

    // Textbox
    const txtProps: TextBoxProps = {
        Value: value,
        PlaceHolder: placeHolder,
        ReadOnly: false,
        SpellCheck: true,
        Id: "txtTest" + value,
        Name: "txtTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
        Type: "text",
        HasBorder: false,
        BackgroundColor: "grey",
        BrightnessWhenHoverFocus: false,
    };

    return (
        <TextBox {...txtProps}/>
    );
}