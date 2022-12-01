import * as React from "react";
import { StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component";
import { CellType } from "./Cell";
import "./css/Column.scss";

export interface ColumnProps extends ComponentProps {
    Caption: string,
    ColNumber: number,
    ColGroup: string,
    ColType: CellType
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
}