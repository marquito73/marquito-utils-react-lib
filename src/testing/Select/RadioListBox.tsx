import React from "react";
import { OptionProps } from "../../lib/Components/Select/Option";
import { RadioListBox } from "../../lib/Components/Select/RadioListBox";
import { ContentBoxProps } from "../../lib/Components/Select/ContentBox";
import { EnumInputType } from "../../lib";

export const TestRadioListBox = (selecteds: Array<boolean>, values: Array<string>, captions: Array<string>) => {

    const optionsProps: Array<OptionProps> = new Array();

    captions.forEach((caption, i) => {
        const optionProps: OptionProps = {
            Caption: caption,
            Selected: selecteds[i],
            Value: values[i],
            CheckType: EnumInputType.Radio,
            ContainerId: "",
            Id: `optRbTest${i}`,
            Name: `optRbTest`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        optionsProps.push(optionProps);
    });

    const checkListBoxProps: ContentBoxProps = {
        IsEditable: true,
        Options: optionsProps,
        SelectedValue: "",
        PlaceHolder: "Test",
        ContainerId: "",
        Id: "crbTest",
        Name: "crbTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    }

    return (
        <RadioListBox {...checkListBoxProps} />
    );
}