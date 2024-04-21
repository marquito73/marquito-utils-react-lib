import { Utils } from "./Utils";

/**
 * Simple StringBuilder
 */
export class StringBuilder {

    /**
     * The values
     */
    private Values: Array<string> = new Array();
    /**
     * The separator
     */
    private Separator: string = "";

    /**
     * A string builder
     * 
     * @param separator A separator for differents strings
     */
    constructor(separator: string) {
        this.Separator = separator;
    }

    /**
     * Add string
     * 
     * @param value String to add
     */
    public Append = (value: string) => {
        this.Values.push(value);
        
        return this;
    }

    /**
     * Add tabulation
     */
    public AppendTab = () => {
        this.Append("\t");
    }

    /**
     * Add carriage return
     */
    public AppendReturn = () => {
        this.Append("\n");
    }

    /**
     * Stringbuilder is empty ?
     * 
     * @returns True if Stringbuilder is empty
     */
    public IsEmpty = (): boolean => {
        return Utils.IsEmpty(this.Values);
    }

    /**
     * Stringbuilder contain search value ?
     * 
     * @param searchValue Search value
     * @returns True if Stringbuilder contain search value
     */
    public Contains = (searchValue: string): boolean => {
        let result: boolean = false;

        for (const value in this.Values) {
            if (value.includes(searchValue)) {
                result = true;
                break;
            }
        }

        return result;
    }

    /**
     * Return the string contructed with all strings
     * @returns The string contructed with all strings
     */
    public ToString = () => {
        let finalValue = "";

        this.Values.forEach((value: string) => {
            if (finalValue != "") {
                finalValue += this.Separator;
            }
            finalValue += value;
        });

        return finalValue;
    }
}