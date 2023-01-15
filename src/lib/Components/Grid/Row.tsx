import * as React from "react";
import { StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component";
import { Cell, CellProps } from "./Cell";

export interface RowProps extends ComponentProps {
    RowNumber: number,
    Cells: Array<CellProps>
}

export class Row<Props extends RowProps> extends Component<Props & RowProps, {}> {
    render() {
        this.props.CssClass.push("GridRow-React");
        return (
            <tr 
                id={this.props.Id}
                className={this.GetOwnCssClass()}
            >
                {
                        this.props.Cells.map((cell) => {
                            return (
                                <Cell {...cell}/>
                            );
                        })
                    }
            </tr>
        );
    }
}