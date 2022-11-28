import * as React from "react";
import { StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component";
import { CheckBox, CheckRadioBoxProps } from "../Select";
import { TextBox, TextBoxProps } from "../TextArea/TextBox";

/**
 * Cell type
 */
export enum CellType {
    Text,
    Number,
    Boolean
}

export interface CellProps extends ComponentProps {
	/**
	 * Value of cell
	 * */
	Value: any,
	/**
	 * Cell is editable ?
	 * */
     IsEditable: boolean,
     /**
      * Row number
      */
     RowNumber: number,
     /**
      * Col number
      */
     ColNumber: number,
     /**
      * Col name
      */
     ColName: string,
     /**
      * Cell type
      */
     CellType: CellType
}

export class Cell<Props extends CellProps> extends Component<Props & CellProps, {}> {
    render() {
        return (
            <td 
                id={"td" + this.getCellExtensionId()}
            >
                <this.getCellComponent/>
            </td>
        );
    }

    private getCellComponent = () => {

        let component: JSX.Element;

        switch (this.props.CellType) {
            case CellType.Text:
                const sVal: string = Utils.GetAsString(this.props.Value);

                component = this.getTextBox(sVal);
                break;
            case CellType.Boolean:
                const bVal: boolean = Utils.GetAsBoolean(this.props.Value);

                component = this.getCheckBox("TODO", bVal);
                break;
            case CellType.Number:
            default:
                const nVal: string = Utils.GetAsString(this.props.Value);

                component = this.getTextBox(nVal);
                break;
        }

        return (
            <div>
                {component}
            </div>
        );
    }

    private getTextBox = (value: string) => {
        const txtProps: TextBoxProps = {
            Value: value,
            PlaceHolder: "",
            ContainerId: "td" + this.getCellExtensionId(),
            Id: "txt" + this.getCellExtensionId(),
            Name: "txt" + this.getCellExtensionName(),
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return (
            <TextBox {...txtProps}></TextBox>
        );
    }

    private getCheckBox = (value: string, selected: boolean) => {
        const chkProps: CheckRadioBoxProps = {
            Value: value,
            Caption: "",
            Selected: selected,
            Type: "checkbox",
            ContainerId: "td" + this.getCellExtensionId(),
            Id: "chk" + this.getCellExtensionId(),
            Name: "chk" + this.getCellExtensionName(),
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return (
            <CheckBox {...chkProps}></CheckBox>
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