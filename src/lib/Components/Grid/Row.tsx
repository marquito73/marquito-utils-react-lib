import * as React from "react";
import { StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component";
import { Cell, CellProps } from "./Cell";

export interface RowProps extends ComponentProps {
    Cells: Array<CellProps>,
    RowNumber: number
}

export class Row<Props extends RowProps> extends Component<Props & RowProps, {}> {


    render() {
        return (
            <tr 
                id={this.props.Id}
                className="GridRow-React"
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