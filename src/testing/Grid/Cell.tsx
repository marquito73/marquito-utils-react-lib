import React from "react";
import { CellProps, Cell, StringBuilder, Utils } from "../../lib";
import { EnumContentType } from "../../lib/Enums";


export const TestGridCell = (value: any, cellType: EnumContentType, colName: string) => {

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