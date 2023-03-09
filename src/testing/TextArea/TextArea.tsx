import React from "react";
import { TextArea, TextAreaProps } from "../../lib";

export const TestTextArea = (value: string, placeHolder: string) => {

    // Textbox
    const taProps: TextAreaProps = {
        Value: value,
        PlaceHolder: placeHolder,
        ReadOnly: false,
        SpellCheck: true,
        CanHorizontallyResize: false,
        CanVerticalResize: true,
        Id: "taTest",
        Name: "taTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    return (
        <TextArea {...taProps}/>
    );
}