import * as React from "react";
import { TestTextBox } from "./TextArea/TextBox";
import { TestCheckBox } from "./Select/CheckBox";
import { TestRadioBox } from "./Select/RadioBox";
import { TestGrid } from "./Grid/Grid";
import { CellType, Selector } from "../lib";
import { TestButton } from "./Button/Button";
import { EnumEvent } from "../lib/Enums";
import { TestTabs } from "./Menu/Tabs";

export default class App extends React.Component<{}, {}> {

    // Textbox
    private getTestTextBox = () => {
        return TestTextBox("Test value", "Tap some text here ...");
    }
    // Checkbox
    private getTestCheckBox = () => {
        return TestCheckBox(true, "0");
    }
    // Radiobox
    private getTestRadioBoxOne = () => {
        return TestRadioBox(false, "0");
    }
    private getTestRadioBoxTwo = () => {
        return TestRadioBox(true, "1");
    }
    // Grid
    private getTestGrid = () => {
        return TestGrid();
    }
    // Button 
    private getTestButton = () => {
        const events: Map<EnumEvent, Function> = new Map();

        events.set(EnumEvent.OnClick, this.buttonMethod);

        return TestButton("Test button", "#2196F3", "", "#2196F3", 20, "", events);
    }
    public buttonMethod() {
        console.log("Hello world !");
    }

    // Tabs
    private getTestTabs = () => {
        const captions: Array<string> = new Array("All", "Button", "Grid", "Select", "TextArea");
        const events: Array<Function> = captions.map(caption => {
            return this.tabsTest(caption);
        })
        return TestTabs(captions, events, "#2196F3", "", "#2196F3", 20);
    }
    public tabsTest = (tabsName) => {
        return () => {
            const select: Selector = new Selector("#testing").Children("#content");

            if (tabsName == "All") {
                select.Child().SetVisible(true);
            } else {
                select.Child().SetVisible(false);
                select.Children(`#${tabsName}`).SetVisible(true);
            }

            console.log("Hello " + tabsName + " Tab !");
        }
    }

    render() {
        return (
            <div>
                <h1>View for testing components</h1>
                <div id="testing">
                    <div id="tabsbar">
                        <this.getTestTabs/>
                    </div>
                    <div id="content">
                        <div id="Button">
                            <div id="button">
                                <this.getTestButton/>
                            </div>
                        </div>
                        <div id="Grid">
                            <div id="grid">
                                <this.getTestGrid/>
                            </div>
                        </div>
                        <div id="Select">
                            <div id="checkbox">
                                <this.getTestCheckBox/>
                            </div>
                            <div id="radiobox">
                                <this.getTestRadioBoxOne/>
                                <this.getTestRadioBoxTwo/>
                            </div>
                        </div>
                        <div id="TextArea">
                            <div id="textbox">
                                <this.getTestTextBox/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}