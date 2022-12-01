import * as React from "react";
import { TestTextBox } from "./TextArea/TextBox";
import { TestCheckBox } from "./Select/CheckBox";
import { TestRadioBox } from "./Select/RadioBox";
import { TestGrid } from "./Grid/Grid";
import { CellType } from "../lib";
import { TestButton } from "./Button/Button";

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
        return TestButton("Test button", "https://www.google.com");
    }

    render() {
        return (
            <div>
                <h1>View for testing components</h1>
                <div id="testing">
                    <div id="textbox">
                        <this.getTestTextBox/>
                    </div>
                    <div id="checkbox">
                        <this.getTestCheckBox/>
                    </div>
                    <div id="radiobox">
                        <this.getTestRadioBoxOne/>
                        <this.getTestRadioBoxTwo/>
                    </div>
                    <div id="grid">
                        <this.getTestGrid/>
                    </div>
                    <div id="grid">
                        <this.getTestButton/>
                    </div>
                </div>
            </div>
        );
    }
}