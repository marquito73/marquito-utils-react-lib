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
        this.props.CssClass.push("GridCell-React");
        this.props.CssClass.push("grid_content_" + EnumContentType[this.props.CellType].toLowerCase());
        this.props.Attributes.set("colNumber", Utils.GetAsString(this.props.ColNumber));
    }

    render() {
        return (
            <this.getCellComponent/>
        );
    }

    private getCellComponent = () => {

        let component: JSX.Element;

        // TODO Gérer si cela est éditable ou non

        if (this.props.IsEditable) {
            switch (this.props.CellType) {
                case EnumContentType.Text:
                case EnumContentType.Number:
                    const sVal: string = Utils.GetAsString(this.props.Value);

                    component = this.getTextBox(sVal);
                    break;
                case EnumContentType.Boolean:
                    const bVal: boolean = Utils.GetAsBoolean(this.props.Value);

                    component = this.getCheckBox("TODO", bVal);
                    break;
                case EnumContentType.Date:
                    const dVal: Date = Utils.GetAsDate(this.props.Value);

                    component = this.GetDatePicker(dVal);
                    break;
                default:
                    component = this.getLabel(Utils.GetAsString(this.props.Value));
                    break;
            } 
        } else {
            component = this.getLabel(Utils.GetAsString(this.props.Value));
        }

        return (
            <td 
                id={"td" + this.getCellExtensionId()}
                data-colnumber={Utils.GetAsString(this.props.ColNumber)}
                className={this.GetOwnCssClass()}
            >
                {component}
            </td>
        );
    }

    private getTextBox = (value: string) => {
        const txtProps: TextBoxProps = {
            Value: value,
            PlaceHolder: "",
            ReadOnly: false,
            SpellCheck: false,
            Id: "txt" + this.getCellExtensionId(),
            Name: "txt" + this.getCellExtensionName(),
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
            Type: "text",
        }

        return (
            <TextBox {...txtProps}/>
        );
    }

    private getCheckBox = (value: string, selected: boolean) => {
        const chkProps: CheckRadioBoxProps = {
            Value: value,
            Caption: "",
            Selected: selected,
            Type: "checkbox",
            Id: "chk" + this.getCellExtensionId(),
            Name: "chk" + this.getCellExtensionName(),
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
            Id: "dp" + this.getCellExtensionId(),
            Name: "dp" + this.getCellExtensionName(),
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return (
            <DatePicker {...dpProps}/>
        );
    }

    private getLabel = (value: string) => {
        const txtProps: LabelProps = {
            Text: value,
            BoldText: false,
            TextColor: "red",
            TextSize: 15,
            For: "",
            Id: "lbl" + this.getCellExtensionId(),
            Name: "lbl" + this.getCellExtensionName(),
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return (
            <Label {...txtProps}/>
        );
    }

    private getCellExtensionName = () => {
        const sbCell:StringBuilder = new StringBuilder("_");
        
        sbCell.Append("")
            .Append(this.props.ColName);

        return sbCell.ToString();
    }

    private getCellExtensionId = () => {
        const sbCell:StringBuilder = new StringBuilder("_");
        
        sbCell.Append("")
            .Append(Utils.GetAsString(this.props.RowNumber))
            .Append(Utils.GetAsString(this.props.ColNumber))
            .Append(this.props.ColName);

        return sbCell.ToString();
    }
}