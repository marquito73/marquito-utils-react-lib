import { EnumEvent } from "../Enums";
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
    public constructor(element: HTMLElement);
    /**
     * A selector
     * 
     * @param elements Elements
     */
    public constructor(elements: Array<HTMLElement>);

    /**
     * A selector
     * 
     * @param mainSelector Element or elements or selector
     */
    public constructor(mainSelector: any) {
        if (Utils.IsNotEmpty(mainSelector)) {
            if (this.IsHtmlElement(mainSelector)) {
                this.MainSelector.push(mainSelector);
            } else if (this.IsHtmlElementArray(mainSelector)) {
                const selector: Array<HTMLElement> = mainSelector as Array<HTMLElement>;
                selector.forEach(element => this.MainSelector.push(element));
            } else if (Utils.IsNotNull(mainSelector.constructor) && mainSelector.constructor.name === "HTMLFormElement") {
                this.MainSelector.push(mainSelector);
            } else {
                document.querySelectorAll(mainSelector).forEach(element => {
                    this.MainSelector.push(element);
                });
            }
        } else {
            if (this.IsHtmlElementArray(mainSelector)) {
                const selector: Array<HTMLElement> = mainSelector as Array<HTMLElement>;
                selector.forEach(element => this.MainSelector.push(element));
            } else {
                document.querySelectorAll(mainSelector).forEach(element => {
                    this.MainSelector.push(element);
                });
            }
        }
    }

    /**
     * Get the count of elements on this selector
     * 
     * @returns The count of elements on this selector
     */
    public Count = () => {
        return this.MainSelector.length;
    }

    /**
     * The selector has at least one element
     * 
     * @returns The selector has at least one element
     */
    public Any = () => {
        return this.Count() >= 1;
    }

    /**
     * Get all elements corresponding to the selector and elements
     * 
     * @param elements Elements
     * @param selector The selector
     * @returns All elements corresponding to the selector and elements
     */
    private GetElements = (elements: Array<HTMLElement>, selector: string, searchParent: boolean) => {
        const elems: Array<HTMLElement> = new Array();

        elements.forEach(element => {
            if (searchParent) {
                const foundElement = element.closest(selector)!;
                if (Utils.IsNotNull(foundElement)) {
                    elems.push(foundElement as HTMLElement);
                }
            } else {
                element.querySelectorAll(selector)!.forEach(node => {
                    if (Utils.IsNotNull(node)) {
                        elems.push(node as HTMLElement);
                    }
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
        let childrens: Array<HTMLElement> = new Array();
        
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
        let childrens: Array<HTMLElement> = new Array();
        
        if (Utils.IsNotEmpty(childrenSelector)) {
            childrens = this.GetElements(this.MainSelector, ":scope " + childrenSelector, false);
        } else {
            childrens = this.GetElements(this.MainSelector, ":scope *", false);
        }

        return new Selector(childrens);
    }

    public Exclude = (excludeSelector: string) => {
        // TODO Exclude element from current selector with the exclude selector
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
        let parents: Array<HTMLElement> = new Array();
        
        if (Utils.IsNotEmpty(parentSelector)) {
            parents = this.GetElements(this.MainSelector, parentSelector, true);
        } else {
            throw new Error("Cannot search the closest element without selector");
        }

        return new Selector(parents);
    }

    public GetDocument = () => {
        return new Selector(this.MainSelector.map(element => element.ownerDocument.documentElement!));
    }

    public GetContentDocument = () => {
        return new Selector(this.MainSelector.map(element => {
            const elem: HTMLIFrameElement = element as HTMLIFrameElement;

            return elem.contentDocument?.documentElement!;
        }));
    }

    public IsHtmlElement = (element: any) => {
        return element instanceof HTMLElement || (!(typeof element === "string") && "innerHTML" in element && "style" in element);
    }

    public IsHtmlElementArray = (element: any) => {
        let isHtmlElementArray: boolean = true;

        if (element instanceof Array) {
            for (const arrayElem in element) {
                isHtmlElementArray = this.IsHtmlElement(element[arrayElem]);
                if (!isHtmlElementArray) {
                    break;
                }
            }
        } else {
            isHtmlElementArray = false;
        }

        return isHtmlElementArray;
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
        this.ForEach(element => {
            if (!element.classList.contains(className)) {
                element.classList.add(className);
            }
        });
    }

    /**
     * Remove css class to all elements matching the selector
     * 
     * @param className The class to remove
     */
    public RemoveClass = (className: string) => {
        this.ForEach(element => element.classList.remove(className));
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
        this.ForEach(element => {
            element.setAttribute(attributeKey, Utils.GetAsString(attributeValue));
        });
    }

    public RemoveAttribute = (attributeKey: string) => {
        // TODO
    }

    public GetData = (dataKey: string) => {
        return this.GetAttribute(`data-${dataKey}`);
    }

    public SetData = (dataKey: string, dataValue: any) => {
        this.SetAttribute(`data-${dataKey}`, dataValue);
    }

    public GetStyle = () => {
        return Utils.Nvl(this.GetAttribute("style") as string);
    }

    public GetStyleMap = () => {
        const currentStyle: Map<string, string> = new Map();

        if (Utils.IsNotNull(this.GetStyle())) {
            const styles: Array<string> = this.GetStyle().split(";").filter(style => style !== "");
    
            styles.forEach((style) => {
                currentStyle.set(style.split(":", 2)[0], style.split(":", 2)[1]);
            });
        }

        return currentStyle;
    }

    public SetStyle = (styleName: string, styleValue: string) => {
        const newStyle: Map<string, string> = new Map();
        newStyle.set(styleName, styleValue);
        this.SetNewStyles(newStyle);
    }

    public SetStyles = (styles: Map<string, string>) => {
        this.SetNewStyles(styles);
    }

    private SetNewStyles = (styles: Map<string, string>) => {
        const sbStyle: StringBuilder = new StringBuilder("");

        const currentStyle: Map<string, string> = this.GetStyleMap();
        styles.forEach((styleValue, styleName) => {
            currentStyle.set(styleName, styleValue);
        });
        currentStyle.forEach((styleValue, styleName) => {
            sbStyle.Append(styleName).Append(":").Append(styleValue).Append(";");
        })
        this.SetAttribute("style", sbStyle.ToString());
    }

    public RemoveStyle = (styleName: string) => {
        // TODO
    }

    public Where = (predicate: (element: HTMLElement) => boolean) => {
        return new Selector(this.GetAll().filter(predicate));
    }

    /**
     * Loop into each element, and call the callback function
     * 
     * @param callback The function called for each element
     */
    public ForEach = (callback: (element: HTMLElement) => void): void => {
        this.MainSelector.forEach(callback);
    }

    /**
     * Add event to elements of this selector
     * 
     * @param event The event
     * @param eventFunction The function call when event occur
     * @param selector The children selector to macth (can be undefined)
     */
    public On = (event: EnumEvent, eventFunction: Function, selector?: string) => {
        // Bind this event on each elements inside this selector, matching selector if specified
        this.ForEach(element => {
            element.addEventListener(EnumEvent[event].toLowerCase(), 
            this.OnEvent(element, eventFunction, selector) as EventListener, true);
        });
        // And for future elements
        if (Utils.IsNotNull(selector)) {
            this.GetDocument().First().addEventListener(EnumEvent[EnumEvent.DOMContentLoaded] as string, () => {
                this.Find(selector!).ForEach(childElement => {
                    childElement.addEventListener(EnumEvent[event].toLowerCase(), 
                    this.OnChildEvent(childElement, eventFunction) as EventListener, true);
                })
            })
        }

        return this;
    }

    /**
     * Remove event to elements of this selector
     * 
     * @param event The event
     * @param eventFunction The function call when event occur
     * @param selector The children selector to macth (can be undefined)
     */
    public Off = (event: EnumEvent, eventFunction: Function, selector?: string) => {
        // Unbind this event on each elements inside this selector, matching selector if specified
        this.ForEach(element => {
            element.removeEventListener(EnumEvent[event].toLowerCase(), 
            this.OnEvent(element, eventFunction, selector) as EventListener, true);
        });
        // And for future elements
        if (Utils.IsNotNull(selector)) {
            this.GetDocument().First().addEventListener(EnumEvent[EnumEvent.DOMContentLoaded] as string, () => {
                this.Find(selector!).ForEach(childElement => {
                    childElement.removeEventListener(EnumEvent[event].toLowerCase(), 
                    this.OnChildEvent(childElement, eventFunction) as EventListener, true);
                })
            })
        }

        return this;
    }

    /**
     * Return a function for on / off an event for the selector
     * 
     * @param element The event element
     * @param eventFunction The function call when event occur
     * @param selector The children selector to macth (can be undefined)
     * @returns A function for on / off an event for the selector
     */
    private OnEvent = (element: HTMLElement, eventFunction: Function, selector?: string) => {
        return (event: Event) => {
            if (Utils.IsNotNull(selector)) {
                const target = (event.target as HTMLElement).closest(selector!);
    
                if (target) {
                    eventFunction.call(this, target, event);
                }
            } else {
                eventFunction.call(this, element, event);
            }
        }
    }

    /**
     * Return a function for on / off an event for a child element
     * 
     * @param childElement The child element
     * @param eventFunction The function call when event occur
     * @returns A function for on / off an event for a child element
     */
    private OnChildEvent = (childElement: HTMLElement, eventFunction: Function) => {
        return (event: Event) => {
            eventFunction.call(this, childElement, event);
        };
    }

    public Trigger = (eventName: EnumEvent, eventData: object | undefined) => {
        this.ForEach(element => {
            element.dispatchEvent(new CustomEvent(EnumEvent[eventName].toString().toLowerCase(), 
            {detail: eventData}))
        });
    }

    public SetIframeSource = (viewURL: string) => {
        (this.First() as HTMLIFrameElement).src = viewURL;
    }
}