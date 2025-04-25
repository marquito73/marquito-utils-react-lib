import React from "react";
import { AjaxUtils, Selector, StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps, ComponentState } from "../Component";
import { Column, ColumnProps } from "./Column";
import { Row, RowProps } from "./Row";
import "./css/Grid.scss";
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

export interface GridState extends ComponentState {
    AjaxIsUsed: boolean,
}

export class Grid<Props extends GridProps> extends Component<Props & GridProps, GridState> {
    constructor(props: Props & GridProps, state: Props & GridState) {
		super(props);

        this.AddCssClass("Grid-React");

        this.state = {
            AjaxIsUsed: false,
        };
    }

    render() {
        return (
            <div 
                id={this.GetOwnContainerId()}
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
            >
                <table 
                    id={this.GetOwnId()}
                    className="Grid">
                    {this.GetHeader()}
                    {this.GetBody()}
                </table>
                {this.GetFooter()}
            </div>
        );
    }

    private GetHeader = () => {
        return (
            <thead 
                id={this.GetContainerId(this.props.Id + "_header")}
                className="GridHeader"
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

    private GetBody = () => {
        return (
            <tbody 
                id={this.GetContainerId(this.props.Id + "_body")}
                className="GridBody"
                onScroll={this.HandleScroll}
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
            Id: this.props.Id + "PaginationLabel",
            Name: this.props.Name + "PaginationLabel",
            CssClass: new Array("GridPagination"),
            Attributes: new Map(),
            Events: new Map()
        }
        return (
            <div
                id={this.GetContainerId(this.props.Id + "_footer")}
                className="GridFooter"
            >
                <label id={this.GetContainerId(this.props.Id + "_emptyFooterLabel")}/>
                <Label {...lblPaginationProps}/>
            </div>
        );
    }

    private HandleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (this.props.UseInfiniteScroll) {
            this.HandleInfiniteScroll(e);
        }
    }

    private HandleInfiniteScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (!this.state.AjaxIsUsed) {
            if ((e.currentTarget.scrollTop + e.currentTarget.offsetHeight) >= e.currentTarget.scrollHeight) {
                this.setState({AjaxIsUsed: true});
                try {
                    // Call ajax of the grid for get next rows
                    AjaxUtils.PostData(this.props.RootUrl, "Grid/AjxReactGrid", "getNextRows", undefined, {
                        _gridId: this.props.Id
                    }, new Array(), (gridData: any) => {
                        if (Utils.IsNotEmpty(gridData.MESSAGE)) {
                            throw new Error(gridData.MESSAGE);
                        } else {
                            let newRowsProps: Array<RowProps> = gridData.ROWS;
                            newRowsProps = newRowsProps.map((row) => {
                                row.CssClass = Utils.Nvl(row.CssClass);
                                row.Events = Utils.Nvl(row.Events);
                                row.Attributes = Utils.Nvl(row.Attributes);
                                row.Cells = Utils.Nvl(row.Cells).map((cell: CellProps) => {
                                    cell.CssClass = Utils.Nvl(cell.CssClass);
                                    cell.Events = Utils.Nvl(cell.Events);
                                    cell.Attributes = Utils.Nvl(cell.Attributes);
                                    return cell;
                                });
                                return row;
                            });
                            
                            if (Utils.IsNotEmpty(newRowsProps)) {
                                newRowsProps.forEach((rowProps) => {
                                    this.props.Rows.push(rowProps);
                                });
                                this.forceUpdate();
                            }
                        }
                    }, (error: any) => {
                        console.error(error);
                    });
                } catch (e) {
                    console.error(e);
                } finally {
                    this.setState({AjaxIsUsed: false});
                }
            }
        }
    }
}