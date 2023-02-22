import { StringBuilder } from "./Stringbuilder";
import { Utils } from "./Utils";

/**
 * Simple Selector
 */
// TODO Replace Array by Set
export class Selector {
    /**
     * Main selector
     */
    private MainSelector: Array<HTMLElement> = new Array();

    /**
     * A selector
     * 
     * @param mainSelector Main selector as string
     */
    public constructor(mainSelector: string);
    /**
     * A selector
     * 
     * @param element Element
     */
    public constructor(element: Element);
    /**
     * A selector
     * 
     * @param elements Elements
     */
    public constructor(elements: Array<Element>);

    /**
     * A selector
     * 
     * @param mainSelector Element or elements or selector
     */
    public constructor(mainSelector: any) {
        if (Utils.IsNotEmpty(mainSelector)) {
            if (mainSelector instanceof HTMLElement) {
                this.MainSelector.push(mainSelector);
            } else if (mainSelector instanceof Array<HTMLElement>) {
                mainSelector.forEach(element => this.MainSelector.push(element));
            } else {
                const element: HTMLElement = document.querySelector(mainSelector)!;
                this.MainSelector.push(element);
            }
        } else {
            const element: HTMLElement = document.querySelector(mainSelector)!;
            this.MainSelector.push(element);
        }
    }

    /**
     * Get all elements corresponding to the selector and elements
     * 
     * @param elements Elements
     * @param selector The selector
     * @returns All elements corresponding to the selector and elements
     */
    private GetElements = (elements: Array<Element>, selector: string, searchParent: boolean) => {
        const elems: Array<Element> = new Array();

        elements.forEach(element => {
            if (searchParent) {
                elems.push(element.closest(selector)!);
            } else {
                element.querySelectorAll(selector)!.forEach(node => {
                    elems.push(node);
                });
            }
        });

        return elems;
    }

    /**
     * Get all elements
     * 
     * @returns All elements
     */
    public GetAll = () => {
        return this.MainSelector;
    }

    /**
     * Get an element
     * 
     * @returns An element
     */
    public Get = (elementNumber: number) => {
        return this.MainSelector[elementNumber];
    }

    /**
     * Get first element
     * 
     * @returns First element
     */
    public First = () => {
        return this.Get(0);
    }
    
    /**
     * Get childrens of elements
     * 
     * @param childrenSelector Selector
     * @returns Childrens of elements
     */
    public Children = (childrenSelector: string) => {
        let childrens: Array<Element> = new Array();
        
        if (Utils.IsNotEmpty(childrenSelector)) {
            childrens = this.GetElements(this.MainSelector, ":scope > " + childrenSelector, false);
        } else {
            childrens = this.GetElements(this.MainSelector, ":scope > *", false);
        }

        return new Selector(childrens);
    }
    
    /**
     * Get closest childrens of elements
     * 
     * @param childrenSelector Selector
     * @returns Closest childrens of elements
     */
    public Find = (childrenSelector: string) => {
        let childrens: Array<Element> = new Array();
        
        if (Utils.IsNotEmpty(childrenSelector)) {
            childrens = this.GetElements(this.MainSelector, ":scope " + childrenSelector, false);
        } else {
            childrens = this.GetElements(this.MainSelector, ":scope *", false);
        }

        return new Selector(childrens);
    }
    
    /**
     * Get parents of elements
     * 
     * @returns Parents of elements
     */
    public Parent = () => {
        return new Selector(this.MainSelector.map(element => element.parentElement!));
    }
    
    /**
     * Get closest parents of elements
     * 
     * @param parentSelector Selector
     * @returns Closest parents of elements
     */
    public Closest = (parentSelector: string) => {
        let parents: Array<Element> = new Array();
        
        if (Utils.IsNotEmpty(parentSelector)) {
            parents = this.GetElements(this.MainSelector, parentSelector, true);
        } else {
            throw new Error("Cannot search the closest element without selector");
        }

        return new Selector(parents);
    }

    /**
     * Elements matching the selector has css class ?
     * 
     * @param className The class to search
     * @returns Elements matching the selector has css class ?
     */
    public HasClass = (className: string) => {
        return this.MainSelector.filter(element => element.classList.contains(className)).length > 0;
    }

    /**
     * Add css class to all elements matching the selector
     * 
     * @param className The class to add
     */
    public AddClass = (className: string) => {
        this.MainSelector.forEach(element => element.classList.add(className));
    }

    /**
     * Remove css class to all elements matching the selector
     * 
     * @param className The class to remove
     */
    public RemoveClass = (className: string) => {
        this.MainSelector.forEach(element => element.classList.remove(className));
    }

    public SetVisible = (visible: boolean) => {
        if (visible) {
            this.RemoveClass("hidden");
        } else {
            this.AddClass("hidden");
        }
    }

    public GetAttribute = (attributeKey: string) => {
        let attributeValue: any = null;

        if (this.MainSelector.length == 1) {
            attributeValue = this.MainSelector[0].getAttribute(attributeKey);
        }

        return attributeValue;
    }

    public SetAttribute = (attributeKey: string, attributeValue: any) => {
        this.MainSelector.forEach(element => {
            element.setAttribute(attributeKey, Utils.GetAsString(attributeValue));
        });
    }

    public RemoveAttribute = (attributeKey: string) => {
        // TODO
    }

    public GetStyle = () => {
        return this.GetAttribute("style");
    }

    public SetStyle = (styleName: string, styleValue: string) => {
        const sbStyle: StringBuilder = new StringBuilder("");

        let currentStyle: string = this.GetStyle();
        //sbStyle.Append(this.GetStyle()).Append(styleName).Append(":").Append(styleValue).Append(";");

        sbStyle.Append(styleName).Append(":").Append(styleValue).Append(";");
        
        this.SetAttribute("style", sbStyle.ToString());
    }

    public RemoveStyle = (styleName: string) => {
        // TODO
    }

    public ForEach = (callback: (element: Element) => void) => {
        this.MainSelector.forEach(callback);
    }
}