import * as React from "react";
import {Component, ComponentProps, ComponentState} from "../Component";
import "./css/ToastManager.scss";
import { Selector, ToastMessage, Utils } from "../../Utils";
import CSS from 'csstype';
import { EnumEvent, EnumToastType } from "../../Enums";
import { IconButton, IconButtonProps } from "../Button";
import { Label, LabelProps } from "../TextArea";


export interface ToastManagerProps extends ComponentProps {
}

export interface ToastManagerState extends ComponentState {
    ToastMessages: Map<string, ToastMessage>,
}

export class ToastManager<Props extends ToastManagerProps> 
extends Component<Props & ToastManagerProps, ToastManagerState> {
	constructor(props: Props & ToastManagerProps, state: ToastManagerState) {
        super(props);
        this.state = {
            ToastMessages: new Map<string, ToastMessage>(),
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
                /*this.state.ToastMessages.values.map((toastMessage) => {
                    return (
                        this.RenderToast(toastMessage)
                    );
                })*/
                [...this.state.ToastMessages.values()].map(message => {
                    return (
                        this.RenderToast(message)
                    );
                })
            }
            </div>
        );
    }

    private RenderToast = (toastMessage: ToastMessage) => {
        return (
            <div
                id={`${this.props.Id}Toast${toastMessage.Guid}`}
                className={`Toast-React ${EnumToastType[toastMessage.Type]}`}
                data-toastkey={toastMessage.Guid}
                key={toastMessage.Guid}
            >
                
                <div className="ToastContent">
                    {this.GetTitleLabel(toastMessage.Title)}
                    {this.GetMessageLabel(toastMessage.Message)}
                </div>
                {this.GetCloseButton(toastMessage.Guid)}
            </div>
        );
    }

    private GetTitleLabel = (title: string) => {
        const cssClass = new Array();
        cssClass.push("toastTitle");
        const titleProps: LabelProps = {
            Text: title,
            For: "",
            BoldText: true,
            TextColor: "black",
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

    private GetMessageLabel = (message: string) => {
        const cssClass = new Array();
        cssClass.push("toastMessage");
        const titleProps: LabelProps = {
            Text: message,
            For: "",
            BoldText: false,
            TextColor: "black",
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
        // Add close class
        toast.AddClass("Close");

        //this.state.ToastMessages.re(this.state.ToastCounting, 1);

        this.forceUpdate(() => {
            setTimeout(() => {
                this.state.ToastMessages.delete(toast.GetData("toastKey"));
                this.forceUpdate();
            }, 300);
        });
    }

    //$0.dispatchEvent(new CustomEvent("newtoastmessage", {detail: {title: "Titre", content: "Contenu test"}}))
    private AddToast = (target: Element, event: CustomEvent) => {
        this.AddNewToast(event.detail.type, event.detail.title, 
            event.detail.content);
    }

    private AddNewToast = (type: EnumToastType, title: string, message: string) => {
        const guidKey: string = Utils.GetNewGUID();
        this.state.ToastMessages.set(guidKey, new ToastMessage(
            guidKey, type, title, message));

        this.forceUpdate();
    }
}