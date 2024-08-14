import React from "react";
import { TextParagraphProps, TextParagraph } from "../../lib";


export const TestTextParagraph = (value: string) => {
    // Text paragraph
    const txtProps: TextParagraphProps = {
        Id: "tpParagraph",
        Name: "tpParagraph",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
        Text: value,
        TextColor: "black",
        TextSize: 20,
        BackgroundColor: "grey",
        BrightnessWhenHoverFocus: false,
    };

    return (
        <TextParagraph {...txtProps}/>
    );
}