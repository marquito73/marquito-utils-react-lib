import React/*, { UIEvent }*/ from "react";
import { AjaxUtils, Selector, StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component";
import { Column, ColumnProps } from "./Column";
import { Row, RowProps } from "./Row";
import "./css/Grid.scss";
import { EnumContentType } from "../../Enums";
import ReactDOM from "react-dom";
import { CellProps } from "./Cell";
import { Label, LabelProps } from "../TextArea";

export interface GridProps extends ComponentProps {
    RowsToLoadEachTime: number,
    UseInfiniteScroll: boolean,
    RootUrl: string,
    Columns: Array<ColumnProps>,
    Rows: Array<RowProps>,
    TotalOfRows: number
}

export class Grid<Props extends GridProps> extends Component<Props & GridProps, {}> {
    render() {
        return (
            <div 
                id={this.GetOwnContainerId()}
                className="Grid-React"
            >
                <div 
                id={this.GetOwnId()}
                    className="Grid"
                >
                    <table className="grid">
                        {this.getHeader()}
                        {this.getBody()}
                    </table>
                    {this.GetFooter()}
                </div>
            </div>
        );
    }

    private getHeader = () => {
        return (
            <thead 
                id={this.GetContainerId(this.props.Id + "_header")}
                className="gridHeader"
            >
                <tr className="GridRow-React">
                    {
                        this.props.Columns.map((column) => {
                            return (
                                <Column {...column} key={column.Id}/>
                            );
                        })
                    }
                </tr>
            </thead>
        );
    }

    private getBody = () => {
        return (
            <tbody 
                id={this.GetContainerId(this.props.Id + "_body")}
                className="gridBody"
                onScroll={this.handleScroll}
            >
                {
                    this.props.Rows.map((row) => {
                        return (
                            <Row {...row} key={row.Id}/>
                        );
                    })
                }
            </tbody>
        );
    }

    private GetFooter = () => {
        const lblPaginationProps: LabelProps = {
            Text: `${this.props.Rows.length} / ${this.props.TotalOfRows} loaded`,
            For: "",
            BoldText: false,
            TextColor: "black",
            TextSize: 15,
            ContainerId: "",
            Id: this.props.Id + "PaginationLabel",
            Name: this.props.Name + "PaginationLabel",
            CssClass: new Array("GridPagination"),
            Attributes: new Map(),
            Events: new Map()
        }
        return (
            <div
                id={this.GetContainerId(this.props.Id + "_footer")}
                className="gridFooter"
            >
                <label id={this.GetContainerId(this.props.Id + "_emptyFooterLabel")}/>
                <Label {...lblPaginationProps}/>
            </div>
        );
    }

    private handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (this.props.UseInfiniteScroll) {
            this.handleInfiniteScroll(e);
        }
    }

    private handleInfiniteScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const body: Selector = new Selector(e.currentTarget);

        if (Utils.IsNull(body.GetAttribute("ajaxIsUsed"))) {
            body.SetAttribute("ajaxIsUsed", false);
        }

        if (!Utils.GetAsBoolean(body.GetAttribute("ajaxIsUsed"))) {
            if ((e.currentTarget.scrollTop + e.currentTarget.offsetHeight) 
                == e.currentTarget.scrollHeight + 2) {
                body.SetAttribute("ajaxIsUsed", true);
                try {
                    // Call ajax of the grid for get next rows
                    AjaxUtils.PostData(this.props.RootUrl, "Grid/AjxReactGrid", "getNextRows", {
                        _gridId: this.props.Id
                    }, new Array(), (gridData: any) => {
                        if (Utils.IsNotEmpty(gridData.MESSAGE)) {
                            throw new Error(gridData.MESSAGE);
                        } else {
                            // New rows to add
                            const newRowsProps: Array<RowProps> = JSON.parse(gridData.ROWS);
                            //const newRowsProps: Array<RowProps> = gridData.ROWS;
                            
                            if (Utils.IsNotEmpty(newRowsProps)) {
                                newRowsProps.forEach((rowProps) => {
                                    this.props.Rows.push(rowProps);
                                });
                                this.forceUpdate();
                            }
                        }
                    }, (error: any) => {
                        console.error(error);
                    }, "");
                } catch (e) {
                    console.error(e);
                } finally {
                    body.SetAttribute("ajaxIsUsed", false);
                }
            }
        }
    }
}