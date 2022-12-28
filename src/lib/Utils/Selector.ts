import { Utils } from "./Utils";

/**
 * Simple Selector
 */
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
    private GetElements = (elements: Array<Element>, selector: string) => {
        const elems: Array<Element> = new Array();

        elements.forEach(element => {
            element.querySelectorAll(selector)!.forEach(node => {
                elems.push(node);
            });
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
     * @returns Childrens of elements
     */
    public Child = () => {
        return this.Children("");
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
            childrens = this.GetElements(this.MainSelector, ":scope > " + childrenSelector);
        } else {
            childrens = this.GetElements(this.MainSelector, ":scope > *");
        }

        return new Selector(childrens);
    }

    public AddClass = (className: string) => {
        this.MainSelector.forEach(element => element.classList.add(className));
    }

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
}