import * as React from "react";
import { EnumEvent } from "../../Enums";
import {Component, ComponentProps, ComponentState} from "../Component";
import CSS from 'csstype';
import "./css/Popup.scss";
import { Point, Selector, Utils } from "../../Utils";
import { IconButton, IconButtonProps } from "../Button";

export interface PopupProps extends ComponentProps {
    Width: number,
    Height: number,
    ClosePopupCallback: Function
}

export interface PopupState extends ComponentState {
    IsInMove: boolean,
    DownPos: Point
}

export class Popup<Props extends PopupProps> extends Component<Props & PopupProps, PopupState> {
	constructor(props: Props & PopupProps, state: Props & PopupState) {
		super(props);
		this.props.CssClass.push("Popup-React");
        this.state = {
            IsInMove: false,
            DownPos: new Point(0, 0)
        }
	}

    componentDidMount() {
        new Selector("html").On(EnumEvent.MouseUp, this.HandleMouseUp)
            .On(EnumEvent.MouseMove, this.HandleMouseMove);
    }
  
    componentWillUnmount() {
        //new Selector("html").On(EnumEvent.MouseUp, this.HandleMouseUp);
        new Selector(`#${this.props.Id}`).GetDocument().Off(EnumEvent.MouseUp, this.HandleMouseUp)
            .Off(EnumEvent.MouseMove, this.HandleMouseMove);
    }

	render() {
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.Width)) {
            cssStyles.width = `${this.props.Width}px`;
        }
        if (Utils.IsNotEmpty(this.props.Height)) {
            cssStyles.height = `${this.props.Height}px`;
        }
		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
                style={cssStyles}
			>
                <this.GetHeader/>
                <this.GetContent/>
                <this.GetFooter/>
			</div>
		);
	}

    private GetHeader = () => {
        // Close popup button
        const closePopupProps: IconButtonProps = {
            IconClass: "icon-cancel-circle",
            IconColor: "black",
            Caption: "Close popup",
            Link: "",
            OpenOnNewTab: false,
            ContainerId: "",
            Id: `${this.props.Id}ClosePopup`,
            Name: `${this.props.Name}ClosePopup`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }
        closePopupProps.Events.set(EnumEvent.Click, this.ClosePopup);

        return (
            <div
                id={`${this.props.Id}Header`}
                className="PopupHeader"
                onMouseDown={this.HandleMouseDown}
            >
                <div
                    id={`${this.props.Id}Title`}
                    className="PopupTitle"
                >

                </div>
                <div
                    id={`${this.props.Id}PopupButtons`}
                    className="PopupButtons"
                >
                    <IconButton {...closePopupProps}/>
                </div>
            </div>
        );
    }

    private GetContent = () => {
        return (
            <div
                id={`${this.props.Id}Content`}
                className="PopupContent"
            >

            </div>
        );
    }

    private GetFooter = () => {
        return (
            <div
                id={`${this.props.Id}Footer`}
                className="PopupFooter"
            >

            </div>
        );
    }

    private ClosePopup = () => {
        if (!this.props.CssClass.includes("PopupHide")) {
            this.props.CssClass.push("PopupHide");
			if (Utils.IsNotNull(this.props.ClosePopupCallback)) {
				this.props.ClosePopupCallback?.(this.props);
			}
            this.forceUpdate();
        }
    }

    private OpenPopup = () => {
        const index = this.props.CssClass.indexOf("PopupHide");
        if (this.props.CssClass.includes("PopupHide") && index != -1) {
            this.props.CssClass.slice(index, 1);
            this.forceUpdate();
        }
    }

    private HandleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        // this.setState({IsInMove: true}, () => console.log("Mouse down for popup"));

            const popupElementPos = new Selector(`#${this.props.Id}_cnt`).First().getBoundingClientRect();
            const mousePos: Point = new Point(event.clientX, event.clientY);
            console.log(mousePos);
            const popupPos: Point = new Point(popupElementPos.x, popupElementPos.y);
        this.setState({IsInMove: true, DownPos: this.CalculateNewPopupPosition(mousePos, popupPos)});
    }

    private HandleMouseMove = (e: Event) => {
        const event: MouseEvent = e as MouseEvent;
        if (this.state.IsInMove) {
            //console.log("Mouse move");
            const popupSelector: Selector = new Selector(`#${this.props.Id}_cnt`);
            const popupElementPos = popupSelector.First().getBoundingClientRect();

            const mousePos: Point = new Point(event.clientX, event.clientY);
            console.log(mousePos);
            const popupPos: Point = new Point(popupElementPos.x, popupElementPos.y);
            //console.log(popupPos);
            // TODO Faux, trouver pourquoi
            const newPopupPosition: Point = this.CalculateNewPopupPosition(mousePos, popupPos).SubstractPoint(this.state.DownPos);
            //console.log(newPopupPosition);

            const stylesMap: Map<string, string> = new Map();
            stylesMap.set("left", `${newPopupPosition.X}px !important`);
            stylesMap.set("top", `${newPopupPosition.Y}px !important`);
            stylesMap.set("bottom", `auto !important`);
            stylesMap.set("right", `auto !important`);
            popupSelector.SetStyles(stylesMap);
        }
    }

    private HandleMouseUp = (event: Event) => {
        // this.setState({IsInMove: false}, () => console.log("Mouse up for popup"));
        this.setState({IsInMove: false});
    }

    private CalculateNewPopupPosition = (mousePos: Point, popupPos: Point) => {
        return mousePos.SubstractPoint(popupPos).GetAbsolutePoint();
    }
}