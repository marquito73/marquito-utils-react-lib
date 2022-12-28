import React from "react";
import { Button, ButtonProps, CheckBox, CheckRadioBoxProps } from "../../lib";
import { EnumEvent } from "../../lib/Enums";


export const TestButton = (caption: string, captionColor: string, backgroundColor: string, 
    borderColor: string, captionSize: number, link: string, events: Map<EnumEvent, Function>) => {

    // Button
    const btnProps: ButtonProps = {
        Caption: caption,
        BoldCaption: true,
        CaptionColor: captionColor,
        BackgroundColor: backgroundColor,
        BorderColor: borderColor,
        CaptionSize: captionSize,
        Link: link,
        ContainerId: "button",
        Id: "btnTest",
        Name: "btnTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: events
    };

    //chkProps.Events.set("OnCheck", "document.testCheck()");

    return (
        <Button {...btnProps}/>
    );
}