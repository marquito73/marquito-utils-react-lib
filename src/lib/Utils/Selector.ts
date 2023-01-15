import { Utils } from "./Utils";

/**
 * Simple Selector
 */
// TODO Replace Array by Set
export class Selector {
    /**
     * Main selector
     */
    private MainSelector: Array<Element> = new Array();

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
            if (mainSelector instanceof Element) {
                this.MainSelector.push(mainSelector);
            } else if (mainSelector instanceof Array<Element>) {
                mainSelector.forEach(element => this.MainSelector.push(element));
            } else {
                const element: Element = document.querySelector(mainSelector)!;
                this.MainSelector.push(element);
            }
        } else {
            const element: Element = document.querySelector(mainSelector)!;
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
    public Get = () => {
        return this.MainSelector;
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
    /*public Closest = (parentSelector: string) => {
        let parents: Array<Element> = new Array();
        
        if (Utils.IsNotEmpty(parentSelector)) {
            parents = this.GetElements(this.MainSelector, parentSelector, true);
        } else {
            parents = this.GetElements(this.MainSelector, "*", true);
        }

        return new Selector(parents);
    }*/

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

    public SetAttribute = (attributeKey: string, attributeValue: any) => {
        this.MainSelector.forEach(element => {
            element.setAttribute(attributeKey, Utils.GetAsString(attributeValue));
        });
    }

    public GetAttribute = (attributeKey: string) => {
        let attributeValue: any = null;

        if (this.MainSelector.length == 1) {
            attributeValue = this.MainSelector[0].getAttribute(attributeKey);
        }

        return attributeValue;
    }
}