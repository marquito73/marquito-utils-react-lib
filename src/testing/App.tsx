import * as React from "react";
import { TestTextBox } from "./TextArea/TextBox";
import { TestCheckBox } from "./Select/CheckBox";
import { TestRadioBox } from "./Select/RadioBox";
import { TestGrid } from "./Grid/Grid";
import { AjaxUtils, Selector, Tabs } from "../lib";
import { TestButton } from "./Button/Button";
import { EnumEvent } from "../lib/Enums";
import { TestTabs } from "./Menu/Tabs";
import { TestCheckListBox } from "./Select/CheckListBox";
import { TestRadioListBox } from "./Select/RadioListBox";

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

        /*AjaxUtils.PostData("https://localhost:7143", "AjxTemplate", "Test", {
            _valeurTest: 154564
        }, new Array(), (response) => {
            const test = "";
            console.log(response);
        }, (error) => {
            console.log(error);
        }, "");*/
    }

    // Tabs
    private getTestTabs = () => {
        const captions: Array<string> = new Array("All", "Button", "Grid", "Select", "TextArea");
        const events: Array<Function> = captions.map(caption => {
            return this.tabsTest(caption);
        });
        const tabContainerIds: Array<string> = captions.map(caption => {
            return "Test";
        });
        return TestTabs("", captions, tabContainerIds, events, "#2196F3", "", "#2196F3", 20);
    }
    public tabsTest = (tabsName) => {
        return () => {
            const select: Selector = new Selector("#testing").Children("#content");

            if (tabsName == "All") {
                select.Children("").SetVisible(true);
            } else {
                select.Children("").SetVisible(false);
                select.Children(`#${tabsName}`).SetVisible(true);
            }

            console.log("Hello " + tabsName + " Tab !");
        }
    }

    // CheckListBox
    public getTestCheckListBox = () => {
        const selecteds: Array<boolean> = new Array(false, false, true, false);
        const values: Array<string> = new Array("0", "1", "2", "3");
        const captions: Array<string> = new Array("Checkbox 0", "Checkbox 1", "Checkbox 2", "Checkbox 3");

        return TestCheckListBox(selecteds, values, captions);
    }

    // RadioListBox
    public getTestRadioListBox = () => {
        const selecteds: Array<boolean> = new Array(false, false, true, false);
        const values: Array<string> = new Array("0", "1", "2", "3");
        const captions: Array<string> = new Array("Radiobox 0", "Radiobox 1", "Radiobox 2", "Radiobox 3");

        return TestRadioListBox(selecteds, values, captions);
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
                            <div id="checklistbox">
                                <this.getTestCheckListBox/>
                            </div>
                            <div id="radiolistbox">
                                <this.getTestRadioListBox/>
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