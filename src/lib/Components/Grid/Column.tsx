import * as React from "react";
import { EnumCheckMode, EnumContentType } from "../../Enums";
import { StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component";
import "./css/Column.scss";

export interface ColumnProps extends ComponentProps {
    Caption: string,
    ColNumber: number,
    ColGroup: string,
    ColType: EnumContentType
    IsEditable: boolean,
    CheckMode: EnumCheckMode
}

export class Column<Props extends ColumnProps> extends Component<Props & ColumnProps, {}> {


    render() {

        this.props.CssClass.push("GridColumn-React");
        this.props.CssClass.push("grid_" + EnumCheckMode[this.props.CheckMode].toLowerCase());
        this.props.CssClass.push("grid_content_" + EnumContentType[this.props.ColType].toLowerCase());

        return (
            <th 
                id={this.props.Id}
                className={this.GetOwnCssClass()}
            >
                {this.props.Caption}
            </th>
        );
    }
}

/*export interface ColumnProps extends ComponentProps {
    Caption: string,
    ColNumber: number,
    ColGroup: string,
    ColType: EnumContentType
    IsEditable: boolean
}

export class Column<Props extends ColumnProps> extends Component<Props & ColumnProps, {}> {

    render() {
        return (
            <th 
                id={this.props.Id}
                className="GridColumn-React"
            >
                {this.props.Caption}
            </th>
        );
    }
}*/