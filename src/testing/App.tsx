import * as React from "react";
import { TestTextBox } from "./TextArea/TextBox";
import { TestCheckBox } from "./Select/CheckBox";
import { TestRadioBox } from "./Select/RadioBox";
import { TestGrid } from "./Grid/Grid";
import { ButtonProps, DatePickerProps, DatePickerState, Icon, IconProps, Popup, PopupProps, Selector, Tabs, Utils } from "../lib";
import { TestButton } from "./Button/Button";
import { TestIconButton } from "./Button/IconButton";
import { EnumEvent } from "../lib/Enums";
import { TestTabs } from "./Menu/Tabs";
import { TestCheckListBox } from "./Select/CheckListBox";
import { TestRadioListBox } from "./Select/RadioListBox";
import { TestDatePicker } from "./TextArea/DatePicker";
import { TestProgressBar } from "./Progress/ProgressBar";
import { TestTextArea } from "./TextArea/TextArea";
import { TestRangeSlider } from "./Range/RangeSlider";
import { TestChip } from "./Chip/Chip";
import { TestCountryListBox } from "./Select/CountryListBox";
import { TestCountryFlagListBox } from "./Select/CountryFlagListBox";
import { TestRadarChart } from "./Chart/CustomRadarChart";

export default class App extends React.Component<{}, {}> {

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

        events.set(EnumEvent.Click, this.buttonMethod);

        return TestButton("btnTest", "Test button", "#2196F3", "", "#2196F3", 20, "//www.google.fr", true, events);
    }
    // IconButton
    private getTestIconButton = () => {
        const events: Map<EnumEvent, Function> = new Map();

        events.set(EnumEvent.Click, this.buttonMethod);

        return TestIconButton("ibtnTest", "Test icon button", "icon-cancel-circle", "red", "//www.google.fr", true, events);
    }
    public buttonMethod() {
        console.log("Hello world !");
    }

    // Icone
    private getTestIcon = () => {
        const iconProps: IconProps = {
            IconClass: "icon-home",
            IconColor: "blue",
            Id: "iTest",
            Name: "iTest",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return (
            <Icon {...iconProps}/>
        );
    }

    // Tabs
    private getTestTabs = () => {
        const captions: Array<string> = new Array("All", "Component", "Button", "Grid", "Select", "TextArea", "Chip", 
            "Progress", "Range", "Chart", "Popup");
        const events: Array<Function> = captions.map(caption => {
            return this.tabsTest(caption);
        });
        const tabContainerIds: Array<string> = captions.map(caption => {
            return "Test";
        });
        return TestTabs("", captions, events, "#2196F3", "", "#2196F3", 20);
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
        const selecteds: Array<boolean> = new Array(false, false, false, false);
        const values: Array<string> = new Array("0", "1", "2", "3");
        const captions: Array<string> = new Array("Radiobox 0", "Radiobox 1", "Radiobox 2", "Radiobox 3");

        return TestRadioListBox(selecteds, values, captions);
    }

    public getTestCountryListBox = () => {
        return TestCountryListBox();
    }

    public getTestCountryFlagListBox = () => {
        return TestCountryFlagListBox();
    }

    // Textbox
    private getTestTextBox = () => {
        return TestTextBox("Test value", "Tap some text here ...");
    }
    // DatePicker
    private getTestDatePicker = () => {
        return TestDatePicker(new Date("1998/07/16"), this.OnChangeDate);
    }
    // Textarea
    private getTestTextArea = () => {
        return TestTextArea("Test value for textarea", "Tap some text here ...");
    }
    
    // Chip
    private getTestChip = () => {
        return TestChip("rgba(45,212,191,0.1)");
    }

    // ProgressBar
    private getTestProgressBar = () => {
        return TestProgressBar(5, "red", EnumEvent.Click, "btnProgress", (progressValue: number) => {
            console.log("Test");

            return progressValue + 10;
        });
    }
    private getButtonIncreaseProgress = () => {
        const events: Map<EnumEvent, Function> = new Map();
        //pbTest

        events.set(EnumEvent.Click, this.modifyProgress);
        return TestButton("btnProgress", "Increase progress", "black", "gray", "", 20, "", false, events);
    }
    public modifyProgress = () => {
        //const progressValueInput: HTMLInputElement = new Selector("#pbTest_cnt").Children(".ProgressBarValue")
            // .First() as HTMLInputElement;

        //progressValueInput.value = Utils.GetAsString(Utils.GetAsNumber(progressValueInput.value) + 10);
    }

    // RangeSlider
    private getTestRangeSlider = () => {
        return TestRangeSlider(20, 1, 40, 0.2);
    }

    // Popup
    private getTestPopup = () => {
        const okButtonProps: ButtonProps = {
            BoldCaption: false,
            CaptionColor: "red",
            BackgroundColor: "white",
            BorderColor: "",
            CaptionSize: 20,
            Caption: "Ok",
            Link: "",
            OpenInNewTab: false,
            Id: "btnOkPopup",
            Name: "btnOkPopup",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
        };
        const cancelButtonProps: ButtonProps = {
            BoldCaption: false,
            CaptionColor: "red",
            BackgroundColor: "white",
            BorderColor: "",
            CaptionSize: 20,
            Caption: "Cancel",
            Link: "",
            OpenInNewTab: false,
            Id: "btnCancelPopup",
            Name: "btnCancelPopup",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
        };
        const validateButtonProps: ButtonProps = {
            BoldCaption: false,
            CaptionColor: "red",
            BackgroundColor: "white",
            BorderColor: "",
            CaptionSize: 20,
            Caption: "Validate",
            Link: "",
            OpenInNewTab: false,
            Id: "btnValidatePopup",
            Name: "btnValidatePopup",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
        };

        const popupProps: PopupProps = {
            Width: 300,
            Height: 150,
            Title: "Popup de test",
            ClosePopupCallback: this.HandleClosePopup,
            ExtendedWhenOpen: false,
            ElementIdForOpenPopup: "iTest_cnt",
            ContentUrl: "",
            Id: "popupTest",
            Name: "popupTest",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
            ReloadEachTimeOpened: false,
            OkButton: okButtonProps,
            CancelButton: cancelButtonProps,
            ValidateButton: validateButtonProps,
            CanBeResized: false,
            CanBeMoved: false,
        }

        return (
            <Popup {...popupProps}>

            </Popup>
        );
    }

    private HandleClosePopup = (props) => {
        console.log(props);
    }

    // RadarChart
    private getTestRadarChart = () => {
        return TestRadarChart();
    }

    private OnChangeDate = (props: DatePickerProps, state: DatePickerState) => {
        console.log(props);
        console.log(state);
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
                            <div id="iconbutton">
                                <this.getTestIconButton/>
                            </div>
                        </div>
                        <div id="Component">
                            <div id="icon">
                                <this.getTestIcon/>
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
                            <div id="countrylistbox">
                                <this.getTestCountryListBox/>
                            </div>
                            <div id="countryflaglistbox">
                                <this.getTestCountryFlagListBox/>
                            </div>
                        </div>
                        <div id="TextArea">
                            <div id="textbox">
                                <this.getTestTextBox/>
                            </div>
                            <div id="textarea">
                                <this.getTestTextArea/>
                            </div>
                            <div id="datepicker">
                                <this.getTestDatePicker/>
                            </div>
                        </div>
                        <div id="Chip">
                            <div id="chip">
                                <this.getTestChip/>
                            </div>
                        </div>
                        <div id="Progress">
                            <div id="progressbar">
                                <this.getTestProgressBar/>
                                <this.getButtonIncreaseProgress/>
                            </div>
                        </div>
                        <div id="Range">
                            <div id="rangeslider">
                                <this.getTestRangeSlider/>
                            </div>
                        </div>
                        <div id="Popup">
                            <div id="popup">
                                <this.getTestPopup/>
                            </div>
                        </div>
                        <div id="Chart">
                            <div id="radarchart">
                                {<this.getTestRadarChart/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
