import * as React from "react";
import {Component, ComponentProps, ComponentState} from "../Component";
import { Label, LabelProps } from "../TextArea";
import { MenuEntry } from "./MenuEnty";
import { Icon, IconProps } from "../Common";
import { Selector, Utils } from "../../Utils";
import CSS from 'csstype';
import "./css/SideBar.scss";


export interface SideBarProps extends ComponentProps {
    Title: string,
    Entries: Array<MenuEntry>,
    Width: number,
    BackgroundColor: string,
    EntryColor: string,
    EntrySelectedColor: string,
    EntryHoverColor: string,
    ViewContainerID: string,
}

export interface SideBarState extends ComponentState {
    CurrentlySelectedEntry: string,
}

export class SideBar<Props extends SideBarProps> 
extends Component<Props & SideBarProps, SideBarState> {
    constructor(props: Props & SideBarProps, state: SideBarState) {
        super(props);
        this.AddCssClass("SideBar-React");

        this.state = {
            CurrentlySelectedEntry: "",
        };
    }

    render() {
        const cssStyles: CSS.Properties = {
            width: `${this.props.Width}px`,
            backgroundColor: this.props.BackgroundColor,
            "--entry-selected-color": this.props.EntrySelectedColor,
            "--entry-hover-color": this.props.EntryHoverColor,
        } as CSS.Properties;

        return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
                style={cssStyles}
			>
                <div className="SideBarEntries">
                    {
                        this.props.Entries.map((entry) => this.RenderEntry(entry))
                    }
                </div>
            </div>
        );
    }

    private RenderEntry = (entry: MenuEntry) => {
        const cssClass: Array<string> = new Array();
        cssClass.push("SideBarEntry");
        if (entry.Selected) {
            cssClass.push("Selected");
            cssClass.push("Open");
        }

        return (
            <div
                id={this.GetContainerId(entry.EntryKey)} 
                key={entry.EntryKey}
                className={this.GetCssClass(cssClass)}
                >
                    <div className="EntryHeader" onClick={this.ClickEntryHeader(entry.EntryKey, Utils.IsNotEmpty(entry.SubEntries))}>
                        <div className="HeaderMain">
                        <Icon {...this.GetEntryIconProps(entry)}/>
                        <Label {...this.GetEntryLabelProps(entry)}/>
                        </div>
                        {Utils.IsNotEmpty(entry.SubEntries) && <Icon {...this.GetEntryChevronIconProps(entry)}/>}
                    </div>
                    <div className="EntrySubEntries">
                        {
                            entry.SubEntries.map((entry) => this.RenderEntry(entry))
                        }
                    </div>
            </div>
        );
    }

    private GetEntryIconProps = (entry: MenuEntry): IconProps => {
        return {
            IconClass: entry.IconClass,
            IconColor: this.props.EntryColor,
            IconSize: 20,
            Id: `${entry.EntryKey}_entryIcon`,
            Name: `${entry.EntryKey}_entryIcon`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
        };
    }

    private GetEntryLabelProps = (entry: MenuEntry): LabelProps => {
        return {
            Text: entry.Label,
            For: "",
            BoldText: true,
            TextColor: this.props.EntryColor,
            TextSize: 12,
            Id: `${entry.EntryKey}_entryLabel`,
            Name: `${entry.EntryKey}_entryLabel`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map(),
        };
    }

    private GetEntryChevronIconProps = (entry: MenuEntry): IconProps => {
        const cssClass: Array<string> = new Array();
        cssClass.push("FoldIcon");

        return {
            IconClass: "icon-circle-down",
            IconColor: this.props.EntryColor,
            IconSize: 14,
            Id: `${entry.EntryKey}_entryIcon`,
            Name: `${entry.EntryKey}_entryIcon`,
            CssClass: cssClass,
            Attributes: new Map(),
            Events: new Map(),
        };
    }

    private GetAllEntries = (): Array<MenuEntry> => {
        const allEntries: Array<MenuEntry> = new Array();

        this.props.Entries.forEach(subEntry => allEntries.push(subEntry));

        return this.GetAllSubEntries(allEntries);
    }

    private GetAllSubEntries = (entries: Array<MenuEntry>): Array<MenuEntry> => {
        entries.forEach(entry => {
            if (Utils.IsNotEmpty(entry.SubEntries)) {
                this.GetAllSubEntries(entry.SubEntries).forEach(subEntry => entries.push(subEntry));
            }
        });

        return entries;
    }

    private ClickEntryHeader = (entryKey: string, hasSubEntries: boolean) => {
        return () => {
            this.SelectEntry(entryKey, hasSubEntries);
            if (hasSubEntries) {
                this.FoldUnfoldSubEntries(entryKey);
            }

            const entry: MenuEntry = this.GetAllEntries().filter(x => x.EntryKey === entryKey)[0];

            if (Utils.IsEmpty(entry.SubEntries)) {
                if (Utils.IsNotNull(entry.ViewURL)) {
                    new Selector(`iframe#${this.props.ViewContainerID}`).SetIframeSource(entry.ViewURL!);
                }

                this.setState({CurrentlySelectedEntry: entryKey});
            } else {
                this.setState({CurrentlySelectedEntry: ""});
            }
        }
    }

    private FoldUnfoldSubEntries = (entryKey: string) => {
        const entrySelector: Selector = new Selector(`#${this.GetContainerId(entryKey)}`);
        const isOpen: boolean = entrySelector.HasClass("Open");

        entrySelector.Parent().Children(".SideBarEntry").RemoveClass("Open");
        if (!isOpen) {
            entrySelector.AddClass("Open");
        }
    }

    private SelectEntry = (entryKey: string, hasSubEntries: boolean) => {
        const entrySelector: Selector = new Selector(`#${this.GetContainerId(entryKey)}`);
        const isSelected: boolean = entrySelector.HasClass("Selected");

        entrySelector.Parent().Find(".SideBarEntry").RemoveClass("Selected");
        if (!isSelected || !hasSubEntries) {
            entrySelector.AddClass("Selected");
        }
    }
}