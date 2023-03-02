import React from "react";
import { IconButton, IconButtonProps} from "../../lib";
import { EnumEvent } from "../../lib/Enums";


export const TestIconButton = (id: string, caption: string, iconClass: string, iconColor: string, link: string, 
    openOnNewTab: boolean, events: Map<EnumEvent, Function>) => {

    // Button
    const btnProps: IconButtonProps = {
        IconClass: iconClass,
        IconColor: iconColor,
        Caption: caption,
        Link: link,
        OpenOnNewTab: openOnNewTab,
        ContainerId: "button",
        Id: id,
        Name: id,
        CssClass: new Array(),
        Attributes: new Map(),
        Events: events
    };

    return (
        <IconButton {...btnProps}/>
    );
}