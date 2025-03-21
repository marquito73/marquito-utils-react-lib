export class MenuEntry {
    public EntryKey: string;
    public IconClass: string;
    public Label: string;
    public Selected: boolean;
    public ViewURL?: string;
    public SubEntries: Array<MenuEntry> = new Array();

    constructor(entryKey: string, iconClass: string, label: string, selected: boolean, viewURL?: string) {
        this.EntryKey = entryKey;
        this.IconClass = iconClass;
        this.Label = label;
        this.Selected = selected;
        this.ViewURL = viewURL;
    }
}