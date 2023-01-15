import React from "react";

import "./css/Tabs.scss";
import { Button, ButtonProps } from "../Button";
import { EnumEvent } from "../../Enums";
import { Component, ComponentProps } from "../Component";
import { Tab, TabProps } from "./Tab";
import axios from "axios";

export interface TabsProps extends ComponentProps {
    Tabs: Array<TabProps>,
    TabsContainerId: string
}

export class Tabs<Props extends TabsProps> extends Component<Props & TabsProps, {}> {
    render() {
        this.props.CssClass.push("Tabs-React");

        return (
            <nav
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}
            >
                {this.GetTabs()}
            </nav>
        );
    }

    private GetTabs = () => {
        let isFirst: boolean = true;

        return (
            this.props.Tabs.map((tabProps) => {
                if (isFirst) {
                    tabProps.CssClass.push("active");
                }
                isFirst = false;
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