import * as React from "react";
import {Component, ComponentProps, ComponentState} from "../Component";
import "./css/ToastManager.scss";
import { Selector, ToastMessage, Utils } from "../../Utils";
import { EnumEvent, EnumToastType } from "../../Enums";
import { IconButton, IconButtonProps } from "../Button";
import { Label, LabelProps } from "../TextArea";


export interface ToastManagerProps extends ComponentProps {
}

export interface ToastManagerState extends ComponentState {
    ToastMessages: Map<string, ToastMessage>,
    ToastTimers: Map<string, NodeJS.Timer>,
    ToastTimeouts: Map<string, NodeJS.Timeout>,
}

export class ToastManager<Props extends ToastManagerProps> 
extends Component<Props & ToastManagerProps, ToastManagerState> {
	constructor(props: Props & ToastManagerProps, state: ToastManagerState) {
        super(props);
        this.state = {
            ToastMessages: new Map<string, ToastMessage>(),
            ToastTimers: new Map<string, NodeJS.Timer>(),
            ToastTimeouts: new Map<string, NodeJS.Timeout>(),
        };
        this.AddCssClass("ToastManager-React");
    }

    componentDidMount() {
        new Selector("html").On(EnumEvent.NewToastMessage, 
            this.AddToast, `#${this.GetOwnContainerId()}`);
    }
  
    componentWillUnmount() {
        new Selector("html").Off(EnumEvent.NewToastMessage, 
            this.AddToast, `#${this.GetOwnContainerId()}`);
    }

    render() {
        return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
                
			>
            {
                [...this.state.ToastMessages.values()]
                    .sort((dateOne, dateTwo) => dateOne.MessageDate.getTime() - dateTwo.MessageDate.getTime())
                    .reverse()
                    .map(message => {
                        return (
                            this.RenderToast(message)
                        );
                })
            }
            </div>
        );
    }

    private RenderToast = (toastMessage: ToastMessage) => {
        const toastID: string = `${this.props.Id}Toast_${toastMessage.Guid}`;

        const cssClass: Array<string> = new Array();
        cssClass.push("ToastDuration");

        if (toastMessage.Duration !== undefined && !this.state.ToastTimers.has(toastMessage.Guid)) {
            const durationTimeInterval = toastMessage.Duration / 100;
            
            this.state.ToastTimers.set(toastMessage.Guid, setInterval(() => {
                toastMessage.Progression = toastMessage.Progression - 100 / durationTimeInterval;
                this.forceUpdate();
            }, 100));
            
            this.state.ToastTimeouts.set(toastMessage.Guid, setTimeout(() => {
                this.CloseToast(new Selector(`#${toastID}`));
                clearInterval(this.state.ToastTimers.get(toastMessage.Guid));
            }, toastMessage.Duration));
        } else if (toastMessage.Duration === undefined) {
            cssClass.push("WithoutDuration");
        }

        return (
            <div
                id={toastID}
                className={`Toast-React ${EnumToastType[toastMessage.Type]}`}
                data-toastkey={toastMessage.Guid}
                key={toastMessage.Guid}
            >
                <div className="ToastContainer">
                    <div className="ToastContent">
                        {this.GetTitleLabel(toastMessage.Title, toastMessage.Type)}
                        {this.GetMessageLabel(toastMessage.Message, toastMessage.Type)}
                    </div>
                    {this.GetCloseButton(toastMessage.Guid)}
                </div>
                <div className={this.GetCssClass(cssClass)} style={{ width: `${toastMessage.Progression}%`}}/>
            </div>
        );
    }

    private GetTitleLabel = (title: string, type: EnumToastType) => {
        const cssClass = new Array();
        cssClass.push("toastTitle");
        const titleProps: LabelProps = {
            Text: title,
            For: "",
            BoldText: true,
            TextColor: type === EnumToastType.Warning ? "#000000" : "#E5E5E5",
            TextSize: 18,
            Id: "",
            Name: "",
            CssClass: cssClass,
            Attributes: new Map(),
            Events: new Map(),
        };

        return (
            <Label {...titleProps}/>
        );
    }

    private GetMessageLabel = (message: string, type: EnumToastType) => {
        const cssClass = new Array();
        cssClass.push("toastMessage");
        const titleProps: LabelProps = {
            Text: message,
            For: "",
            BoldText: false,
            TextColor: type === EnumToastType.Warning ? "#000000" : "#E5E5E5",
            TextSize: 14,
            Id: "",
            Name: "",
            CssClass: cssClass,
            Attributes: new Map(),
            Events: new Map(),
        };

        return (
            <Label {...titleProps}/>
        );
    }

    private GetCloseButton = (guidKey: string) => {
        const events: Map<EnumEvent, Function> = new Map();

        events.set(EnumEvent.Click, this.WhenCloseToast);

        const props: IconButtonProps = {
            IconClass: "icon-cancel-circle",
            IconColor: "",
            Caption: "",
            Link: "",
            OpenInNewTab: false,
            Id: `${this.props.Id}ToastCloseButton${guidKey}`,
            Name: "",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: events,
            IconSize: 15,
        };

        return(
            <IconButton {...props}/>
        );
    }

    private WhenCloseToast = (props: IconButtonProps) => {
        const toast: Selector = new Selector(`#${props.Id}_cnt`)
            .Closest(".Toast-React");
            this.CloseToast(toast);
    }

    private CloseToast = (toast: Selector) => {
        /*const toast: Selector = new Selector(`#${toastID}_cnt`)
            .Closest(".Toast-React");*/
        // Add close class
        toast.AddClass("Close");

        this.forceUpdate(() => {
            setTimeout(() => {
                this.state.ToastMessages.delete(toast.GetData("toastKey"));
                this.forceUpdate();
            }, 300);
        });
    }
    
    private AddToast = (target: Element, event: CustomEvent) => {
        this.AddNewToast(event.detail.type, event.detail.title, 
            event.detail.content, event.detail.duration);
    }

    private AddNewToast = (type: EnumToastType, title: string, message: string, duration?: number) => {
        const guidKey: string = Utils.GetNewGUID();
        this.state.ToastMessages.set(guidKey, new ToastMessage(
            guidKey, type, title, message, duration));

        this.forceUpdate();
    }
}