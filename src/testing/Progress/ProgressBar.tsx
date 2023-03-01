import React from "react";
import { ProgressBar } from "../../lib/Components/Progress/ProgressBar";
import { ProgressBarProps } from "../../lib/Components/Progress/ProgressBar";
import { EnumEvent } from "../../lib/Enums";


export const TestProgressBar = (value: number, progressColor: string, changeElementEvent: EnumEvent, 
    changeElementId: string, changeValueFunction: Function) => {

    // Checkbox
    const chkProps: ProgressBarProps = {
        Percent: value,
        ProgressColor: progressColor,
        ChangeElementEvent: changeElementEvent,
        ChangeElementId: changeElementId,
        ChangeValueFunction: changeValueFunction,
        HideValue: false,
        ContainerId: "progressbar",
        Id: "pbTest",
        Name: "pbTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    chkProps.Events.set(EnumEvent.Check, Function("document.testCheck()"));

    return (
        <ProgressBar {...chkProps}/>
    );
}