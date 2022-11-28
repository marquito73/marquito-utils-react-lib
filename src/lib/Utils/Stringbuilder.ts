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