import * as React from "react";
import * as Components from "./lib/index";
import { CheckRadioBoxProps, CheckBox, RadioBox } from "./lib/index";

export default class App extends React.Component<{}, {}> {
    render() {
        // Checkbox
        const chkProps: CheckRadioBoxProps = {
            Caption: "Test checkbox",
            Value: "on",
            Selected: true,
            Type: "checkbox",
            ContainerId: "checkbox",
            Id: "chkTest",
            Name: "chkTest",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        };

        // Radioboxs
        const rbPropsOne: CheckRadioBoxProps = {
            Caption: "Test radiobox 1",
            Value: "on",
            Selected: true,
            Type: "radio",
            ContainerId: "radiobox",
            Id: "rbTest1",
            Name: "rbTest",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        };
        const rbPropsTwo: CheckRadioBoxProps = {
            Caption: "Test radiobox 2",
            Value: "on",
            Selected: true,
            Type: "radio",
            ContainerId: "radiobox",
            Id: "rbTest2",
            Name: "rbTest",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        };

        return (
            <div>
                <h1>View for testing components</h1>
                <div id="testing">
                    <div id="checkbox">
                        <CheckBox {...chkProps}></CheckBox>
                    </div>
                    <div id="radiobox">
                        <RadioBox {...rbPropsOne}></RadioBox>
                        <RadioBox {...rbPropsTwo}></RadioBox>
                    </div>
                </div>
            </div>
        );
    }
}