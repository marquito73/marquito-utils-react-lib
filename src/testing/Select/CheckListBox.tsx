import React from "react";
import { OptionProps } from "../../lib/Components/Select/Option";
import { CheckListBox } from "../../lib/Components/Select/CheckListBox";
import { ContentBoxProps } from "../../lib/Components/Select/ContentBox";
import { EnumInputType } from "../../lib";

export const TestCheckListBox = (selecteds: Array<boolean>, values: Array<string>, captions: Array<string>) => {

    const optionsProps: Array<OptionProps> = new Array();

    captions.forEach((caption, i) => {
        const optionProps: OptionProps = {
            Caption: caption,
            Selected: selecteds[i],
            Value: values[i],
            CheckType: EnumInputType.Check,
            ContainerId: "",
            Id: `optChkTest${i}`,
            Name: `optChkTest${i}`,
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
        Id: "clbTest",
        Name: "clbTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    }

    return (
        <CheckListBox {...checkListBoxProps} />
    );
}