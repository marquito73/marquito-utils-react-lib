import * as React from "react";
import { Component, ComponentProps } from "../Component";
import { StringBuilder, Utils } from "../../Utils";
import { EnumContentType, EnumLang } from "../../Enums";
import { CheckBox, CheckRadioBoxProps } from "../Select";
import { TextBox, TextBoxProps } from "../TextArea/TextBox";
import { DatePicker, DatePickerProps, Label, LabelProps } from "../TextArea";

export interface CellProps extends ComponentProps {
    Value: Object,
    IsEditable: boolean,
    RowNumber: number,
    ColNumber: number,
    ColName: string,
    CellType: EnumContentType
}

export class Cell<Props extends CellProps> extends Component<Props & CellProps, {}> {
    constructor(props: Props & CellProps) {
        super(props);
        this.AddCssClass("GridCell-React");
        this.AddCssClass(`grid_content_${EnumContentType[this.props.CellType].toLowerCase()}`);
        this.props.Attributes.set("colNumber", Utils.GetAsString(this.props.ColNumber));
    }

    render() {
        return (
            <this.GetCellComponent/>
        );
    }

    private GetCellComponent = () => {
        let component: JSX.Element;

        if (this.props.IsEditable) {
            switch (this.props.CellType) {
                case EnumContentType.Text:
                case EnumContentType.Number:
                    const sVal: string = Utils.GetAsString(this.props.Value);

                    component = this.GetTextBox(sVal);
                    break;
                case EnumContentType.Boolean:
                    const bVal: boolean = Utils.GetAsBoolean(this.props.Value);

                    component = this.GetCheckBox("TODO", bVal);
                    break;
                case EnumContentType.Date:
                    const dVal: Date = Utils.GetAsDate(this.props.Value);

                    component = this.GetDatePicker(dVal);
                    break;
                default:
                    component = this.GetLabel(Utils.GetAsString(this.props.Value));
                    break;
            } 
        } else {
            component = this.GetLabel(Utils.GetAsString(this.props.Value));
        }

        return (
            <td 
                id={"td" + this.GetCellExtensionId()}
                data-colnumber={Utils.GetAsString(this.props.ColNumber)}
                className={this.GetOwnCssClass()}
            >
                {component}
            </td>
        );
    }

    private GetTextBox = (value: string) => {
        const txtProps: TextBoxProps = {
            Value: value,
            PlaceHolder: "",
            ReadOnly: false,
            SpellCheck: false,
            Id: "txt" + this.GetCellExtensionId(),
            Name: "txt" + this.GetCellExtensionName(),
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
            Type: "text",
            HasBorder: true,
            BackgroundColor: "none",
            BrightnessWhenHoverFocus: false,
        }

        return (
            <TextBox {...txtProps}/>
        );
    }

    private GetCheckBox = (value: string, selected: boolean) => {
        const chkProps: CheckRadioBoxProps = {
            Value: value,
            Caption: "",
            Selected: selected,
            Type: "checkbox",
            Id: "chk" + this.GetCellExtensionId(),
            Name: "chk" + this.GetCellExtensionName(),
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return (
            <CheckBox {...chkProps}/>
        );
    }

    private GetDatePicker = (value: Date) => {
        const dpProps: DatePickerProps = {
            Date: value,
            MinimumDate: undefined,
            MaximumDate: undefined,
            PlaceHolder: "",
            Language: EnumLang.FR,
            Id: "dp" + this.GetCellExtensionId(),
            Name: "dp" + this.GetCellExtensionName(),
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
            HasBorder: true,
            BackgroundColor: "",
            BrightnessWhenHoverFocus: false,
        }

        return (
            <DatePicker {...dpProps}/>
        );
    }

    private GetLabel = (value: string) => {
        const txtProps: LabelProps = {
            Text: value,
            BoldText: false,
            TextColor: "red",
            TextSize: 15,
            For: "",
            Id: "lbl" + this.GetCellExtensionId(),
            Name: "lbl" + this.GetCellExtensionName(),
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return (
            <Label {...txtProps}/>
        );
    }

    private GetCellExtensionName = () => {
        return new StringBuilder("_").Append("").Append(this.props.ColName).ToString();
    }

    private GetCellExtensionId = () => {
        return new StringBuilder("_").Append("").Append(Utils.GetAsString(this.props.RowNumber))
            .Append(Utils.GetAsString(this.props.ColNumber)).Append(this.props.ColName).ToString();
    }
}