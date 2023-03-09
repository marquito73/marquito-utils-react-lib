import React from "react";
import { Button, ButtonProps } from "../../lib";
import { EnumEvent } from "../../lib/Enums";


export const TestButton = (id: string, caption: string, captionColor: string, backgroundColor: string, 
    borderColor: string, captionSize: number, link: string, openInNewTab: boolean, events: Map<EnumEvent, Function>) => {

    // Button
    const btnProps: ButtonProps = {
        Caption: caption,
        BoldCaption: true,
        CaptionColor: captionColor,
        BackgroundColor: backgroundColor,
        BorderColor: borderColor,
        CaptionSize: captionSize,
        Link: link,
        OpenInNewTab: openInNewTab,
        Id: id,
        Name: id,
        CssClass: new Array(),
        Attributes: new Map(),
        Events: events
    };

    //chkProps.Events.set("OnCheck", "document.testCheck()");

    return (
        <Button {...btnProps}/>
    );
}