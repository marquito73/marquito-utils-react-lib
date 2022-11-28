import * as React from "react";
import { StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component";
import { Column, ColumnProps } from "./Column";
import { Row, RowProps } from "./Row";
import { CellType } from "./Cell";
import "./css/Grid.css";

export interface GridProps extends ComponentProps {
    Columns: Array<ColumnProps>,
    Rows: Array<RowProps>
}

export class Grid<Props extends GridProps> extends Component<Props & GridProps, {}> {


    render() {
        return (
            <div 
                id={this.GetOwnContainerId()}
                className="Grid-React"
            >
                {this.getHeader()}
                {this.getBody()}
            </div>
        );
    }

    private getHeader = () => {

        return (
            <div className="grid_header">
                <table>
                    <colgroup>
                    {
                        this.props.Columns.map((column) => {
                            return (
                                <col className={CellType[column.ColType]}/>
                            );
                        })
                    }
                    </colgroup>
                    <thead>
                        <tr>
                            {
                                this.props.Columns.map((column) => {
                                    return (
                                        <Column {...column}/>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }

    private getBody = () => {
        return (
            <div className="grid_body">
            <table>
                <colgroup>
                    {
                        this.props.Columns.map((column) => {
                            return (
                                <col className={CellType[column.ColType]}/>
                            );
                        })
                    }
                </colgroup>
                <tbody>
                    {
                        this.props.Rows.map((row) => {
                            return (
                                <Row {...row}/>
                            );
                        })
                    }
                </tbody>
            </table>
            </div>
        );
    }
}