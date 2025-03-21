import React from "react";
import { SideBar, SideBarProps } from "../../lib";
import { MenuEntry } from "../../lib/Components/SideBar/MenuEnty";

export const TestSideBar = () => {

    const entries: Array<MenuEntry> = new Array();

    const firstEntry: MenuEntry = new MenuEntry("menuEntry0", "icon-bell", "First entry", false);
    firstEntry.SubEntries.push(new MenuEntry("menuEntry00", "icon-book", "First first sub entry", false));
    firstEntry.SubEntries.push(new MenuEntry("menuEntry01", "icon-book", "First second sub entry", false));
    firstEntry.SubEntries.push(new MenuEntry("menuEntry02", "icon-book", "First third sub entry", false));

    const secondEntry: MenuEntry = new MenuEntry("menuEntry1", "icon-bell", "Second entry", true);
    secondEntry.SubEntries.push(new MenuEntry("menuEntry10", "icon-book", "Second first sub entry", false));
    secondEntry.SubEntries.push(new MenuEntry("menuEntry11", "icon-book", "Second second sub entry", true));

    entries.push(firstEntry);
    entries.push(secondEntry);

    // SideBar
    const SideBarProps: SideBarProps = {
        Title: "Side bar de test titre",
        Entries: entries,
        Width: 200,
        BackgroundColor: "rgba(0, 0, 0, 0.2)",
        Id: "sidebarTest",
        Name: "sidebarTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
        EntryColor: "black",
        EntrySelectedColor: "rgba(255, 0, 0, 0.7)",
        EntryHoverColor: "rgba(255, 0, 0, 0.15)",
        ViewContainerID: ""
    };

    return (
        <SideBar {...SideBarProps}/>
    );
}