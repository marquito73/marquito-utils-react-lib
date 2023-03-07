import * as React from "react";
import ReactHtmlParser from "html-react-parser";
import { EnumEvent, EnumTitleType } from "../../Enums";
import {Component, ComponentProps, ComponentState} from "../Component";
import CSS from 'csstype';
import "./css/Popup.scss";
import { AjaxUtils, Point, Selector, Utils } from "../../Utils";
import { IconButton, IconButtonProps } from "../Button";
import { Title, TitleProps } from "../TextArea";

export interface PopupProps extends ComponentProps {
    /**
     * Width of the popup
     */
    Width: number,
    /**
     * Height of the popup
     */
    Height: number,
    /**
     * Title of the popup
     */
    Title: string,
    /**
     * Callback function when popup is closed
     */
    ClosePopupCallback: Function,
    /**
     * Init the popup in extended size ?
     */
    ExtendedWhenOpen: boolean,
    ContentUrl: string
}

export interface PopupState extends ComponentState {
    /**
     * The popup is currently in move ?
     */
    IsInMove: boolean,
    /**
     * Last touch position
     */
    TouchMovePoint: Point,
    /**
     * The popup is currently extended ?
     */
    IsExtended: boolean,
    /**
     * 
     */
    PopupContent: string
}

export class Popup<Props extends PopupProps> extends Component<Props & PopupProps, PopupState> {
	constructor(props: Props & PopupProps, state: Props & PopupState) {
		super(props);
		this.props.CssClass.push("Popup-React");
        if (this.props.ExtendedWhenOpen) {
            this.props.CssClass.push("PopupMaxSize");
        }
        this.state = {
            IsInMove: false,
            TouchMovePoint: new Point(0, 0),
            IsExtended: this.props.ExtendedWhenOpen,
            PopupContent: ""
        }
	}

    componentDidMount() {
        new Selector("html").On(EnumEvent.MouseUp, this.StopMoving)
            .On(EnumEvent.MouseMove, this.Move)
            .On(EnumEvent.TouchEnd, this.StopMoving)
            .On(EnumEvent.TouchMove, this.Move);
    }
  
    componentWillUnmount() {
        // TODO Find a solution, for remove event without use id (not present in the DOM at this time)
        new Selector(`#${this.props.Id}`).GetDocument().Off(EnumEvent.MouseUp, this.StopMoving)
            .Off(EnumEvent.MouseMove, this.Move)
            .Off(EnumEvent.TouchEnd, this.StopMoving)
            .Off(EnumEvent.TouchMove, this.Move);
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

    /**
     * Get the header of the popup
     * 
     * @returns The header of the popup
     */
    private GetHeader = () => {
        // The popup title
        const popupTitle: TitleProps = {
            Text: this.props.Title,
            BoldText: true,
            TextColor: "deepskyblue",
            TextSize: 15,
            TitleType: EnumTitleType.H2,
            ContainerId: "",
            Id: `${this.props.Id}Title`,
            Name: `${this.props.Name}Title`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }
        popupTitle.CssClass.push("PopupTitle");
        // Min size popup button
        const minSizePopupButton = this.getHeaderPopupButton("icon-shrink2", "ReducePopup", "Reduce popup size", this.ReducePopupSize);
        // Max size popup button
        const maxSizePopupButton = this.getHeaderPopupButton("icon-enlarge2", "ExtendsPopup", "Extends popup size", this.ExtendsPopupSize);
        // Close popup button
        const closePopupButton = this.getHeaderPopupButton("icon-cancel-circle", "ClosePopup", "Close popup", this.ClosePopup);

        return (
            <div
                id={`${this.props.Id}Header`}
                className="PopupHeader"
                onMouseDown={this.HandleMouseDown}
                onTouchStart={this.HandleTouchStart}
            >
                <Title {...popupTitle}/>
                <div
                    id={`${this.props.Id}PopupButtons`}
                    className="PopupButtons"
                >
                    {minSizePopupButton}
                    {maxSizePopupButton}
                    {closePopupButton}
                </div>
            </div>
        );
    }

    /**
     * Get header button
     * 
     * @param iconClass The button class
     * @param buttonName The button name
     * @param caption The caption displayed when mouse hovering the button
     * @param clicFunction The function called when mouse clic the button
     * @returns A header button
     */
    private getHeaderPopupButton = (iconClass: string, buttonName: string, caption: string, clicFunction: Function) => {
        const closePopupProps: IconButtonProps = {
            IconClass: iconClass,
            IconColor: "black",
            Caption: caption,
            Link: "",
            OpenOnNewTab: false,
            ContainerId: "",
            Id: `${this.props.Id}${buttonName}`,
            Name: `${this.props.Name}${buttonName}`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }
        closePopupProps.Events.set(EnumEvent.Click, clicFunction);
        return (
            <IconButton {...closePopupProps}/>
        );
    }

    /**
     * Get the content of the popup
     * 
     * @returns The content of the popup
     */
    private GetContent = () => {
        return (
            <div
                id={`${this.props.Id}Content`}
                className="PopupContent"
            >
                {ReactHtmlParser(this.state.PopupContent)}
            </div>
        );
    }

    /**
     * Get the footer of the popup
     * 
     * @returns The footer of the popup
     */
    private GetFooter = () => {
        return (
            <div
                id={`${this.props.Id}Footer`}
                className="PopupFooter"
            >

            </div>
        );
    }

    /**
     * Close the popup
     */
    private ClosePopup = () => {
        if (!this.props.CssClass.includes("PopupHide")) {
            this.props.CssClass.push("PopupHide");
			if (Utils.IsNotNull(this.props.ClosePopupCallback)) {
				this.props.ClosePopupCallback?.(this.props);
			}
            this.forceUpdate();
        }
    }

    /**
     * Open the popup
     */
    private OpenPopup = () => {
        const index = this.props.CssClass.indexOf("PopupHide");
        if (this.props.CssClass.includes("PopupHide") && index != -1) {
            this.props.CssClass.splice(index, 1);
            
            if (Utils.IsNotEmpty(this.props.ContentUrl) && Utils.IsEmpty(this.state.PopupContent)) {
                AjaxUtils.PostDataWithUrl(this.props.ContentUrl, {}, new Array, (popupContent: string) => {
                    console.log("Test load popup");
                    this.setState({PopupContent: popupContent}, this.forceUpdate);
                }, (error: any) => {

                }, "");
            }
        }
    }

    /**
     * Cancel the popup maximum size and return to the previous size
     */
    private ReducePopupSize = () => {
        if (this.state.IsExtended) {
            this.setState({IsExtended: false}, () => {
                const index = this.props.CssClass.indexOf("PopupMaxSize");
                if (this.props.CssClass.includes("PopupMaxSize") && index != -1) {
                    this.props.CssClass.splice(index, 1);
                    this.forceUpdate();
                }
            });
        }
    }

    /**
     * Extends the popup size to his maximum (relative to relative parent)
     */
    private ExtendsPopupSize = () => {
        if (!this.state.IsExtended) {
            this.setState({IsExtended: true}, () => {
                if (!this.props.CssClass.includes("PopupMaxSize")) {
                    this.props.CssClass.push("PopupMaxSize");
                    this.forceUpdate();
                }
            });
        }
    }

    /**
     * Handle the mouse mouse down in the popup header, for start moving the popup
     * 
     * @param event The event of mouse down
     */
    private HandleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.buttons === 1) {
            this.StartMoving(new Point(0, 0));
        }
    }

    /**
     * Handle the touch start in the popup header, for start moving the popup
     * 
     * @param event The event of touch start
     */
    private HandleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch: React.Touch = event.touches[0];
        this.StartMoving(new Point(touch.screenX, touch.screenY));
    }

    /**
     * Start moving the popup
     * 
     * @param movePoint The move point
     */
    private StartMoving = (movePoint: Point) => {
        if (!this.state.IsExtended) {
            this.setState({IsInMove: true, TouchMovePoint: movePoint}, () => {
                if (!this.props.CssClass.includes("PopupMove")) {
                    this.props.CssClass.push("PopupMove");
                    this.forceUpdate();
                }
            });
        }
    }

    /**
     * Handle the mouse mouse up in the current document, for stop moving the popup
     * 
     * @param event The event of mouse up
     */
    private StopMoving = (event: Event) => {
        if (!this.state.IsExtended) {
            this.setState({IsInMove: false, TouchMovePoint: new Point(0, 0)}, () => {
                const index = this.props.CssClass.indexOf("PopupMove");
                if (this.props.CssClass.includes("PopupMove") && index != -1) {
                    this.props.CssClass.splice(index, 1);
                    this.forceUpdate();
                }
            });
        }
    }

    /**
     * Handle the mouse moving the popup
     * 
     * @param event The event of mouse move
     */
    private Move = (event: Event) => {
        if (this.state.IsInMove && !this.state.IsExtended) {
            // The selector of the popup container
            const popupSelector: Selector = new Selector(`#${this.props.Id}_cnt`);
            // Get the new position (left top corner) of the popup
            const newPopupPosition: Point = this.CalculateNewPopupPosition(this.GetMovePoint(event));
            // Affect new position to the popup
            const stylesMap: Map<string, string> = new Map();
            stylesMap.set("left", `${newPopupPosition.X}px`);
            stylesMap.set("top", `${newPopupPosition.Y}px`);
            stylesMap.set("bottom", `auto`);
            stylesMap.set("right", `auto`);
            popupSelector.SetStyles(stylesMap);

            if (event instanceof TouchEvent) {
                const touch: Touch = event.touches[0];
                this.setState({TouchMovePoint: new Point(touch.screenX, touch.screenY)});
            }
        }
    }

    /**
     * Get the move point
     * 
     * @param event Mouse or Touch event
     * @returns The move point for calculate new popup position
     */
    private GetMovePoint = (event: Event) => {
        let movePoint: Point;

        if (event instanceof TouchEvent) {
            const touch: Touch = event.touches[0];
            // Get the last move Point
            movePoint = new Point(touch.screenX, touch.screenY).SubstractPoint(this.state.TouchMovePoint);
            console.log("Test");
        } else {
            const mouseEvent: MouseEvent = event as MouseEvent;

            movePoint = new Point(mouseEvent.movementX, mouseEvent.movementY);
        }

        return movePoint;
    }

    /**
     * Calculate the new position of the popup
     * 
     * @param event The event contain the movement x and y
     * @returns The new position of the popup
     */
    private CalculateNewPopupPosition = (movePoint: Point) => {
        // The selector of the popup container
        const popupSelector: Selector = new Selector(`#${this.props.Id}_cnt`);
        // Calculate the new position of 
        const newPopupPosition: Point = new Point(popupSelector.First().offsetLeft, popupSelector.First().offsetTop);
        // Add the x movement
        newPopupPosition.AddX(movePoint.X);
        // Add the y movement
        newPopupPosition.AddY(movePoint.Y);

        return newPopupPosition;
    }
}