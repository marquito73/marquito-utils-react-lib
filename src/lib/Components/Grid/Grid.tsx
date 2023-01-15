import React, { UIEvent } from "react";
import { AjaxUtils, Selector, StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps } from "../Component";
import { Column, ColumnProps } from "./Column";
import { Row, RowProps } from "./Row";
import "./css/Grid.scss";
import { EnumContentType } from "../../Enums";
import ReactDOM from "react-dom";

export interface GridProps extends ComponentProps {
    RowsToLoadEachTime: number,
    UseInfiniteScroll: boolean,
    RootUrl: string,
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
                <div 
                id={this.GetOwnId()}
                    className="Grid"
                >
                    <table className="grid">
                        {this.getHeader()}
                        {this.getBody()}
                    </table>
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
                            <Row {...row}/>
                        );
                    })
                }
            </tbody>
        );
    }

    private handleScroll = (e: UIEvent<HTMLDivElement>) => {
        if (this.props.UseInfiniteScroll) {
            this.handleInfiniteScroll(e);
        }
    }

    private handleInfiniteScroll = (e: UIEvent<HTMLDivElement>) => {
        const body: Selector = new Selector(e.currentTarget);

        if (Utils.IsNull(body.GetAttribute("ajaxIsUsed"))) {
            body.SetAttribute("ajaxIsUsed", false);
        }

        if (!Utils.GetAsBoolean(body.GetAttribute("ajaxIsUsed"))) {
            if ((e.currentTarget.scrollTop + e.currentTarget.offsetHeight) 
            >= e.currentTarget.scrollHeight) {
                body.SetAttribute("SetAttribute", true);
                console.log("Scroll en bas réussi !");

                try {
                    // For testing only
                    AjaxUtils.PostData(this.props.RootUrl, "Grid/AjxReactGrid", "getNextRows", {
                        _gridId: this.props.Id
                    }, new Array(), (response: any) => {

                        const gridData: any = response.data;

                        if (Utils.IsNotEmpty(gridData.MESSAGE)) {
                            throw new Error(gridData.MESSAGE);
                        } else {
                            const newRowsProps: Array<RowProps> = gridData.ROWS;

                            //body
                            if (Utils.IsNotEmpty(newRowsProps)) {
                                //e.currentTarget.appendChild()
                                //const gridRoot = ReactDOM.createPortal("", e.currentTarget);
                                newRowsProps.forEach((rowProps) => {
                                    ReactDOM.createPortal(<Row {...rowProps}></Row>, e.currentTarget)
                                })
                            }
                        }

                        //this.props.Rows.push();

                    }, (error: any) => {
                        console.log(error);
                    }, "");
                } catch (e) {
                    console.log(e);
                } finally {
                    body.SetAttribute("ajaxIsUsed", false);
                }
            }
        }
    }
}