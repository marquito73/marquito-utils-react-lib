import * as React from "react";
import { EnumCheckMode, EnumContentType, EnumEvent } from "../../Enums";
import { Selector, StringBuilder, Utils } from "../../Utils";
import { Component, ComponentProps, ComponentState } from "../Component";
import "./css/Column.scss";

export interface ColumnProps extends ComponentProps {
    Caption: string,
    ColNumber: number,
    ColGroup: string,
    ColType: EnumContentType
    IsEditable: boolean,
    CheckMode: EnumCheckMode
}

export interface ColumnState extends ComponentState {
    CurrentResize: boolean,
}

export class Column<Props extends ColumnProps> extends Component<Props & ColumnProps, ColumnState> {
    constructor(props: Props & ColumnProps, state: Props & ColumnState) {
        super(props);

        this.AddCssClass("GridColumn-React");
        this.AddCssClass(`grid_${EnumCheckMode[this.props.CheckMode].toLowerCase()}`);
        this.AddCssClass(`grid_content_${EnumContentType[this.props.ColType].toLowerCase()}`);

        this.state = {
            CurrentResize: false,
        };
    }

    render() {
        return (
            <th 
                id={this.props.Id}
                className={this.GetOwnCssClass()}
            >
                {this.props.Caption}
                <div 
                    className="resizer"
                    onMouseDown={this.HandleResizeMouseDown}
                />
            </th>
        );
    }

    private HandleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        this.setState({CurrentResize: true});

        new Selector(e.currentTarget).GetDocument().On(EnumEvent.MouseUp, this.HandleResizeMouseUp);
        new Selector(e.currentTarget).GetDocument().On(EnumEvent.MouseMove, this.HandleResizeMouseMove);
    }

    private HandleResizeMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        this.setState({CurrentResize: false});
        new Selector(e.currentTarget).GetDocument().Off(EnumEvent.MouseMove, this.HandleResizeMouseMove);
    }
    
    private HandleResizeMouseMove = (element: HTMLElement, event: React.MouseEvent<HTMLElement>) => {
        if (this.state.CurrentResize) {
            // Header cell selector
            const headerCellSelector: Selector = new Selector(`#${this.props.Id}`);
            // Body cells selector
            const cellsSelector: Selector = headerCellSelector.Closest(".Grid").Find("tbody").Children("tr")
                .Children(`td[data-colnumber="${this.props.ColNumber}"`);
            // Calculate the new width
            //const newWidth: number = headerCellSelector.First().clientWidth + event.movementX - 10;
            const newWidth = element.scrollLeft + event.clientX - headerCellSelector.First().getBoundingClientRect().x - 10;

            if (newWidth > 0) {
                // Affect this new width to the column
                headerCellSelector.SetStyle("width", newWidth + "px !important");
                // and body cells selector
                cellsSelector.SetStyle("width", newWidth + "px !important");
            }
        }
    }
}