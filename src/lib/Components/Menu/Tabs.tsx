import React from "react";

import "./css/Tabs.scss";
import { Button, ButtonProps } from "../Button";
import { EnumEvent } from "../../Enums";
import { Component, ComponentProps } from "../Component";
import { Tab, TabProps } from "./Tab";

export interface TabsProps extends ComponentProps {
    Tabs: Array<TabProps>
}

export class Tabs<Props extends TabsProps> 
extends Component<Props & TabsProps, {}> {
    render() {
        this.props.CssClass.push("Tabs-React");

        return (
            <div
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}
            >
                {this.GetTabs()}
            </div>
        );
    }

    private GetTabs = () => {
        return (
            this.props.Tabs.map((tabProps) => {
                return this.GetTab(tabProps);
            })
        );
    }

    private GetTab = (tabProps: TabProps) => {
        return (
            <Tab {...tabProps}/>
        );
    }
}