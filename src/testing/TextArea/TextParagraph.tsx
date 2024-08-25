import React from "react";
import { TextParagraphProps, TextParagraph } from "../../lib";


export const TestTextParagraph = (value: string) => {
    // Text paragraph
    const tbProps: TextParagraphProps = {
        Id: "tpParagraph",
        Name: "tpParagraph",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
        Text: value,
        TextColor: "black",
        TextSize: 20,
        BackgroundColor: "none",
        BrightnessWhenHoverFocus: false,
        HasViewMoreButton: true,
        ViewMoreContent: "View more",
        ViewLessContent: "View less",
        ViewMoreButtonColor: "deepskyblue"
    };

    return (
        <TextParagraph {...tbProps}/>
    );
}