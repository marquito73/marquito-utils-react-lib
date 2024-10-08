import React from "react";
import { DatePickerProps, DatePicker, EnumEvent, EnumLang } from "../../lib";


export const TestDatePicker = (date: Date, onChangeCallback: Function) => {

    const events: Map<EnumEvent, Function> = new Map();
    events.set(EnumEvent.Change, onChangeCallback);

    // DatePicker
    const txtProps: DatePickerProps = {
        Date: date,
        MinimumDate: new Date("1998/07/10"),
        MaximumDate: new Date("1998/07/30"),
        PlaceHolder: "Select a date",
        Language: EnumLang.FR,
        Id: "txtDate",
        Name: "txtDate",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: events,
        HasBorder: false,
        BackgroundColor: "grey",
        BrightnessWhenHoverFocus: false,
    };

    return (
        <DatePicker {...txtProps}/>
    );
}