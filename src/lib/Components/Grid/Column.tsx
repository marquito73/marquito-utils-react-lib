import * as React from "react";
import { EnumCheckMode, EnumContentType } from "../../Enums";
import { Selector, StringBuilder, Utils } from "../../Utils";
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

    constructor(props: Props & ColumnProps) {
        super(props);
        this.props.CssClass.push("GridColumn-React");
        this.props.CssClass.push("grid_" + EnumCheckMode[this.props.CheckMode].toLowerCase());
        this.props.CssClass.push("grid_content_" + EnumContentType[this.props.ColType].toLowerCase());
    }

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
                <div 
                    className="resizer"
                    onMouseDown={this.handleResizeMouseDown}
                    onMouseUp={this.handleResizeMouseUp}
                    onMouseMove={this.handleResizeMouseMove}
                />
            </th>
        );
    }

    private handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        new Selector(e.currentTarget).Parent().SetAttribute("currentResize", true);
    }

    private handleResizeMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        new Selector(e.currentTarget).Parent().SetAttribute("currentResize", false);
    }

    // TODO Trouver le moyen de détecter le mouseup pendant le mousemove, pour interrompre le resize
    // TODO Trouver un moyen de forcer les noms de colonnes à avoir une taille minimale
    private handleResizeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Header cell selector
        const headerCellSelector: Selector = new Selector(e.currentTarget).Parent();

        if (Utils.GetAsBoolean(headerCellSelector.GetAttribute("currentResize"))) {
            // Body cells selector
            const cellsSelector: Selector = headerCellSelector.Closest("table")
                .Find("tbody").Children("tr").Children(`td[data-colnumber="${this.props.ColNumber}"`);
            // Calculate the new width
            const newWidth: number = headerCellSelector.First().clientWidth + e.movementX - 10;
            // Affect this new width to cells
            headerCellSelector.SetStyle("width", newWidth + "px !important");
            cellsSelector.SetStyle("width", newWidth + "px !important");
        }
    }
}