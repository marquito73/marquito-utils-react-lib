import React from "react";
import { TabProps, Tabs, TabsProps } from "../../lib";


export const TestTabs = (tabsContainerId: string, captions: Array<string>, tabContainerIds: Array<string>, events: Array<Function>, 
    captionColor: string, backgroundColor: string, borderColor: string, captionSize: number) => {

    const tabProps: Array<TabProps> = new Array();

    captions.forEach((caption, i) => {
        const tabProp: TabProps = {
            OnClick: events[i],
            TabContainerId: tabContainerIds[i],
            Caption: caption,
            BoldCaption: true,
            CaptionColor: captionColor,
            BackgroundColor: backgroundColor,
            BorderColor: borderColor,
            CaptionSize: captionSize,
            Link: "",
            ContainerId: "tab",
            Id: "tabTest" + i,
            Name: "tabTest",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        tabProps.push(tabProp);
    })

    const tabsProps: TabsProps = {
        Tabs: tabProps,
        TabsContainerId: tabsContainerId,
        ContainerId: "tabsbar",
        Id: "tabsTest",
        Name: "tabsTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    }

    return (
        <Tabs {...tabsProps}/>
    );
}