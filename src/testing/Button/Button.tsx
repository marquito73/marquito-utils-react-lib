import React from "react";
import { Button, ButtonProps, CheckBox, CheckRadioBoxProps } from "../../lib";


export const TestButton = (caption: string, link: string) => {

    // Button
    const btnProps: ButtonProps = {
        Caption: caption,
        Link: link,
        ContainerId: "button",
        Id: "btnTest",
        Name: "btnTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    //chkProps.Events.set("OnCheck", "document.testCheck()");

    return (
        <Button {...btnProps}/>
    );
}