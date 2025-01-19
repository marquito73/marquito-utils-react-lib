import * as React from "react";
import { EnumEvent, EnumTitleType, EnumToastType } from "../../Enums";
import {Component, ComponentProps, ComponentState} from "../Component";
import CSS from 'csstype';
import "./css/Popup.scss";
import { AjaxUtils, Point, Selector, SerializeUtils, Utils } from "../../Utils";
import { Button, ButtonProps, IconButton, IconButtonProps } from "../Button";
import { Title, TitleProps } from "../TextArea";
import { ResultContent } from "../../Utils/ResultContent";

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
    /**
     * The url for get the popup content
     */
    ContentUrl: string,
    /**
     * Reload the content of the popup each time the popup is open ?
     */
    ReloadEachTimeOpened: boolean,
    /**
     * The element, when clicked, open and load the popup
     */
    ElementIdForOpenPopup: string,
    /**
     * The popup can be resized ?
     */
    CanBeResized: boolean,
    /**
     * The popup can be moved ?
     */
    CanBeMoved: boolean,
    /**
     * The main color used for style this popup
     */
    MainStyleColor: string,
    /**
     * Main background color
     */
    MainBackgroundColor: string,
    /**
     * Iframe background color
     */
    IframeBackgroundColor: string,
    /**
     * The ok button
     */
    OkButton?: ButtonProps,
    /**
     * The ok button url
     */
    OkButtonUrl?: string,
    /**
     * The cancel button
     */
    CancelButton?: ButtonProps,
    /**
     * The cancel button url
     */
    CancelButtonUrl?: string,
    /**
     * The validate button
     */
    ValidateButton?: ButtonProps,
    /**
     * The validate button url
     */
    ValidateButtonUrl?: string,
    /**
     * The close URL
     */
    CloseUrl?: string,
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
     * The popup content
     */
    PopupContent: string,
    /**
     * Current content url
     */
    CurrentContentUrl: string
}

export class Popup<Props extends PopupProps> extends Component<Props & PopupProps, PopupState> {
    iframeRef: React.RefObject<HTMLIFrameElement>;
	constructor(props: Props & PopupProps, state: Props & PopupState) {
		super(props);
        this.AddCssClass("Popup-React");
        this.AddCssClass("PopupHide");
        if (this.props.ExtendedWhenOpen) {
            this.AddCssClass("PopupMaxSize");
        }
        this.state = {
            IsInMove: false,
            TouchMovePoint: new Point(0, 0),
            IsExtended: this.props.ExtendedWhenOpen,
            PopupContent: "",
            CurrentContentUrl: ""
        }
        this.iframeRef = React.createRef();
	}

    componentDidMount() {
        super.componentDidMount();
        new Selector("html").On(EnumEvent.MouseUp, this.StopMoving)
            .On(EnumEvent.MouseMove, this.Move)
            .On(EnumEvent.TouchEnd, this.StopMoving)
            .On(EnumEvent.TouchMove, this.Move);

            if (this.props.ElementIdForOpenPopup !== "" && this.props.ElementIdForOpenPopup !== undefined) {
                new Selector("html").On(EnumEvent.Click, this.OpenPopup, `#${this.props.ElementIdForOpenPopup}`);
            }

        new Selector(`#${this.GetOwnContainerId()}`).On(EnumEvent.OpenPopup, this.OpenPopup);
    }
  
    componentWillUnmount() {
        // TODO Find a solution, for remove event without use id (not present in the DOM at this time)
        new Selector("html").Off(EnumEvent.MouseUp, this.StopMoving)
            .Off(EnumEvent.MouseMove, this.Move)
            .Off(EnumEvent.TouchEnd, this.StopMoving)
            .Off(EnumEvent.TouchMove, this.Move);

            if (this.props.ElementIdForOpenPopup !== "" && this.props.ElementIdForOpenPopup !== undefined) {
                new Selector("html").Off(EnumEvent.Click, this.OpenPopup, `#${this.props.ElementIdForOpenPopup}`);
            }

            new Selector(`#${this.GetOwnContainerId()}`).Off(EnumEvent.OpenPopup, this.OpenPopup);
    }

	render() {
        let width: number = this.props.Width;
        if (Utils.IsEmpty(width) || width < 300) {
            width = 300;
        }
        let height: number = this.props.Height;
        if (Utils.IsEmpty(height) || height < 250) {
            height = 250;
        }
        const cssStyles: CSS.Properties = {};
        cssStyles.width = `${width}px`;
        cssStyles.height = `${height}px`;

        if (Utils.IsNotEmpty(this.props.MainBackgroundColor)) {
            cssStyles.backgroundColor = this.props.MainBackgroundColor;
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
            TextColor: this.props.MainStyleColor,
            TextSize: 15,
            TitleType: EnumTitleType.H2,
            Id: `${this.props.Id}Title`,
            Name: `${this.props.Name}Title`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }
        popupTitle.CssClass.push("PopupTitle");
        // Min size popup button
        const minSizePopupButton = this.GetHeaderPopupButton("icon-shrink2", "ReducePopup", "Reduce popup size", 
            this.props.CanBeResized, this.ReducePopupSize);
        // Max size popup button
        const maxSizePopupButton = this.GetHeaderPopupButton("icon-enlarge2", "ExtendsPopup", "Extends popup size", 
            this.props.CanBeResized, this.ExtendsPopupSize);
        // Close popup button
        const closePopupButton = this.GetHeaderPopupButton("icon-cancel-circle", "ClosePopup", "Close popup", 
            true, this.GetActionMethodCall(this.props.CloseUrl));

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
    private GetHeaderPopupButton = (iconClass: string, buttonName: string, caption: string, isEnabled: boolean, clicFunction: Function) => {
        const closePopupProps: IconButtonProps = {
            IconClass: iconClass,
            IconColor: "black",
            Caption: caption,
            Link: "",
            OpenInNewTab: false,
            Id: `${this.props.Id}${buttonName}`,
            Name: `${this.props.Name}${buttonName}`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
            IconSize: 15,
        }

        if (!isEnabled) {
            closePopupProps.CssClass.push("disabled");
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
        const cssStyles: CSS.Properties = {};

        if (Utils.IsNotEmpty(this.props.IframeBackgroundColor)) {
            cssStyles.backgroundColor = this.props.IframeBackgroundColor;
        }

        return (
            <div
                id={`${this.props.Id}Content`}
                className="PopupContent"
                style={cssStyles}
            >
                <iframe
                    id={`${this.props.Id}Iframe`}
                    className="PopupIframe"
                    ref={this.iframeRef}
                    src={this.state.CurrentContentUrl}
                >
                    
                </iframe>
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
            <div
                id={`${this.props.Id}PopupFooterButtons`}
                className="PopupFooterButtons"
            >
                {this.GetFooterPopupButton(this.props.OkButton, this.props.OkButtonUrl)}
                {this.GetFooterPopupButton(this.props.CancelButton, this.props.CancelButtonUrl)}
                {this.GetFooterPopupButton(this.props.ValidateButton, this.props.ValidateButtonUrl)}
            </div>
            </div>
        );
    }

    private GetActionMethodCall = (buttonUrl?: string) => {
        return (props: ButtonProps) => {
            if (Utils.IsNotEmpty(buttonUrl)) {
                // Form element inside the popup
                const iframeForm: Selector = new Selector(`#${props.Id}_cnt`).Closest(".Popup-React").Children(".PopupContent")
                    .Children(".PopupIframe").GetContentDocument().Children("body").Children("form");
    
                AjaxUtils.PostDataWithUrl(buttonUrl!, iframeForm, undefined, new Array(), this.ClosePopup, (error: any) => {
                    let message: string;
                    let title: string = "Error happen when close popup";
    
                    if (error instanceof Error) {
                        message = error.message;
                    } else if (error instanceof ResultContent) {
                        title = error.Title;
                        message = error.Message;
                    } else {
                        message = error;
                    }

                    console.error(title);
    
                    Utils.DisplayToast(EnumToastType.Error, title, message);
    
                });
            } else {
                this.ClosePopup();
            }
        };
    }

    /**
     * Get footer button
     * 
     * @param button The button to add to footer
     * @returns A footer button
     */
    private GetFooterPopupButton = (button?: ButtonProps, buttonUrl?: string) => {
        if (Utils.IsNotNull(button)) {
            const buttonProps: ButtonProps = button!;

            buttonProps.BoldCaption = true;

            buttonProps.CaptionColor = this.props.MainStyleColor;
            
            buttonProps.Events.set(EnumEvent.Click, this.GetActionMethodCall(buttonUrl));

            return (
                <Button {...buttonProps!}/>
            );
        } else {
            return "";
        }
    }

    /**
     * Close the popup
     */
    private ClosePopup = () => {
        if (this.AddCssClass("PopupHide")) {
            
            const spinnerSelector: Selector = this.FindSpinner();
            
            if (spinnerSelector.Count() > 0) {
                spinnerSelector.AddClass("hidden");
            }

			if (Utils.IsNotNull(this.props.ClosePopupCallback)) {
				this.props.ClosePopupCallback?.(this.props);
                if (this.props.ReloadEachTimeOpened) {
                    // We need to reload the popup content next time popup is opened
                    this.setState({CurrentContentUrl: ""});
                }
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

            const spinnerSelector: Selector = this.FindSpinner();
            
            if (spinnerSelector.Count() > 0) {
                spinnerSelector.RemoveClass("hidden");
            }

            this.forceUpdate();
            if (Utils.IsEmpty(this.state.CurrentContentUrl)) {
                if (Utils.IsNotEmpty(this.props.ContentUrl)) {
                    this.setState({CurrentContentUrl: this.props.ContentUrl}, () => {
                        this.RemoveCssClass("PopupHide");
                        this.forceUpdate();
                    });
                }
            } else {
                this.RemoveCssClass("PopupHide");
                this.forceUpdate();
            }
        }
    }

    private FindSpinner = (): Selector => {
        const popupSelector: Selector = new Selector(`#${this.props.Id}_cnt`);

        let spinnerSelector: Selector;
        if (popupSelector.Parent().HasClass("Popup-React-Container")) {
            // Case for C#, if used with the library MarquitoUtils.Web.React
            spinnerSelector = popupSelector.Parent().Parent();
        } else {
            spinnerSelector = popupSelector.Parent();
        }

        return spinnerSelector.Find(".Spinner-React");
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
                if (this.AddCssClass("PopupMaxSize")) {
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
        if (event.buttons === 1 && this.props.CanBeMoved) {
            this.StartMoving(new Point(0, 0));
        }
    }

    /**
     * Handle the touch start in the popup header, for start moving the popup
     * 
     * @param event The event of touch start
     */
    private HandleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        if (this.props.CanBeMoved) {
            const touch: React.Touch = event.touches[0];
            this.StartMoving(new Point(touch.screenX, touch.screenY));
        }
    }

    /**
     * Start moving the popup
     * 
     * @param movePoint The move point
     */
    private StartMoving = (movePoint: Point) => {
        if (!this.state.IsExtended) {
            this.setState({IsInMove: true, TouchMovePoint: movePoint}, () => {
                if (this.AddCssClass("PopupMove")) {
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
     * @param eventTarget Popup element
     * @param event The event of mouse move
     */
    private Move = (eventTarget: HTMLElement, event: Event) => {
        if (this.state.IsInMove && !this.state.IsExtended) {
            // The selector of the popup container
            const popupSelector: Selector = new Selector(`#${this.props.Id}_cnt`);
            // Get the new position (left top corner) of the popup
            const newPopupPosition: Point = this.CalculateNewPopupPosition(this.GetMovePoint(eventTarget, event));
            // Get the max point on bottom right corner
            const popupParent: HTMLElement = popupSelector.Parent().First();
            const bottomRightMaxPoint: Point = new Point(popupParent.clientWidth, popupParent.clientHeight);
            // Affect new position to the popup if popup are inside container
            if (newPopupPosition.X >= 0 && newPopupPosition.Y >= 0 
                && (newPopupPosition.X + popupSelector.First().clientWidth) <= bottomRightMaxPoint.X 
                && (newPopupPosition.Y + popupSelector.First().clientHeight) <= bottomRightMaxPoint.Y) {
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
    }

    /**
     * Get the move point
     * 
     * @param eventTarget Popup element
     * @param event Mouse or Touch event
     * @returns The move point for calculate new popup position
     */
    private GetMovePoint = (eventTarget: HTMLElement, event: Event) => {
        let movePoint: Point;

        if (event instanceof TouchEvent) {
            const touch: Touch = event.touches[0];
            // Get the last move Point
            movePoint = new Point(touch.screenX, touch.screenY).SubstractPoint(this.state.TouchMovePoint);
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