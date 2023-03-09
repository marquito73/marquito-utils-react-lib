import React from "react";
import { RangeSlider, RangeSliderProps } from "../../lib";

export const TestRangeSlider = (value: number, min: number, max: number, step: number) => {

    // Textbox
    const taProps: RangeSliderProps = {
        Value: value,
        MinValue: min,
        MaxValue: max,
        Step: step,
        Id: "rsTest",
        Name: "rsTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    return (
        <RangeSlider {...taProps}/>
    );
}