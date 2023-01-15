import React from "react";
import { Grid, GridProps, RowProps, ColumnProps, CellProps } from "../../lib";
import { EnumCheckMode, EnumContentType } from "../../lib/Enums";

export const TestGrid = () => {

    const getGridColumn = (caption: string, colNum: number, colType: EnumContentType) => {
        const colProps: ColumnProps = {
            Caption: caption,
            ColNumber: colNum,
            ColGroup: "",
            ColType: colType,
            IsEditable: true,
            CheckMode: EnumCheckMode.Default,
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
    cols.push(getGridColumn("Col string", 0, EnumContentType.Text));
    cols.push(getGridColumn("Col number", 1, EnumContentType.Number));
    cols.push(getGridColumn("Col boolean", 2, EnumContentType.Boolean));

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
    cells.push(getGridCell(cols[1], 1, 967));
    cells.push(getGridCell(cols[2], 1, false));
    rows.push(getGridRow(1, cells));
    // Row three
    cells = new Array();
    cells.push(getGridCell(cols[0], 2, "Test ligne 2"));
    cells.push(getGridCell(cols[1], 2, 78));
    cells.push(getGridCell(cols[2], 2, true));
    rows.push(getGridRow(1, cells));
    // Row fourth
    cells = new Array();
    cells.push(getGridCell(cols[0], 3, "Test ligne 3"));
    cells.push(getGridCell(cols[1], 3, 934));
    cells.push(getGridCell(cols[2], 3, false));
    rows.push(getGridRow(1, cells));

    const gridProps: GridProps = {
        RowsToLoadEachTime: 10,
        UseInfiniteScroll: true,
        RootUrl: "https://localhost:7143",
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