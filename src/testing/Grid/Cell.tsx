import React from "react";
import { CellProps, Cell, CellType, StringBuilder, Utils } from "../../lib";


export const TestGridCell = (value: any, cellType: CellType, colName: string) => {

    const getCellExtensionName = (colName: string) => {
        const sbCell:StringBuilder = new StringBuilder("_");
        
        sbCell.Append("")
            .Append(colName);

        return sbCell.ToString();
    }

    const getCellExtensionId = (colName: string, rowNumber: number, colNumber: number) => {
        const sbCell:StringBuilder = new StringBuilder("_");
        
        sbCell.Append("")
            .Append(Utils.GetAsString(rowNumber))
            .Append(Utils.GetAsString(colNumber))
            .Append(colName);

        return sbCell.ToString();
    }

    // Cell
    const cellProps: CellProps = {
        Value: value,
        IsEditable: false,
        RowNumber: 0,
        ColNumber: 0,
        ColName: colName,
        CellType: cellType,
        ContainerId: "gridCell",
        Id: getCellExtensionId(colName, 0, 0),
        Name: getCellExtensionName(colName),
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    return (
        <Cell {...cellProps}/>
    );
}