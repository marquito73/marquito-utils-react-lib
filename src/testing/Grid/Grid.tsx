import React from "react";
import { Grid, GridProps, RowProps, ColumnProps, CellType, CellProps } from "../../lib";

export const TestGrid = () => {

    const getGridColumn = (caption: string, colNum: number, colType: CellType) => {
        const colProps: ColumnProps = {
            Caption: caption,
            ColNumber: colNum,
            ColGroup: "",
            ColType: colType,
            IsEditable: true,
            ContainerId: "",
            Id: "colTest" + colNum,
            Name: "colTest",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return colProps;
    }

    const getGridRow = (rowNum: number, cells: Array<CellProps>) => {
        const rowProps: RowProps = {
            Cells: cells,
            RowNumber: rowNum,
            ContainerId: "",
            Id: "rowTest" + rowNum,
            Name: "rowTest",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return rowProps;
    }

    const getGridCell = (column: ColumnProps, rowNum: number, value: any) => {
        const cellProps: CellProps = {
            Value: value,
            IsEditable: column.IsEditable,
            RowNumber: rowNum,
            ColNumber: column.ColNumber,
            ColName: column.Name,
            CellType: column.ColType,
            ContainerId: "",
            Id: "cellTest",
            Name: "cellTest",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return cellProps;
    } 

    // Cols
    const cols: Array<ColumnProps> = new Array();
    cols.push(getGridColumn("Col string", 0, CellType.Text));
    cols.push(getGridColumn("Col number", 1, CellType.Number));
    cols.push(getGridColumn("Col boolean", 2, CellType.Boolean));

    // Rows
    const rows: Array<RowProps> = new Array();
    // Row one
    let cells: Array<CellProps> = new Array();
    cells.push(getGridCell(cols[0], 0, "Test ligne 0"));
    cells.push(getGridCell(cols[1], 0, 24));
    cells.push(getGridCell(cols[2], 0, true));
    rows.push(getGridRow(0, cells));
    // Row two
    cells = new Array();
    cells.push(getGridCell(cols[0], 1, "Test ligne 1"));
    cells.push(getGridCell(cols[1], 2, 967));
    cells.push(getGridCell(cols[2], 3, false));
    rows.push(getGridRow(1, cells));

    const gridProps: GridProps = {
        Columns: cols,
        Rows: rows,
        ContainerId: "grid",
        Id: "gridTest",
        Name: "gridTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    return (
        <Grid {...gridProps} />
    );
}