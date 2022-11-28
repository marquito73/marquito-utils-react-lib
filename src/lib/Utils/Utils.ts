/**
 * Class with useful tools
 */
export class Utils {
    /**
     * Is empty ?
     * 
     * @param value The string to test if is empty
     * @returns Is empty ?
     */
    public static IsEmpty = (value: string) => {
        let isEmpty: boolean = false;

        if (value == "" || value == undefined) {
            isEmpty = true;
        }

        return isEmpty;
    }

    /**
     * Is not empty ?
     * 
     * @param value The string to test if is not empty
     * @returns Is not empty ?
     */
    public static IsNotEmpty = (value: string) => {
        return !this.IsEmpty(value);
    }

    /**
     * Convert object to string
     * 
     * @param value Object
     * @returns Object as string
     */
    public static GetAsString(value: any) {
        return String(value);
    }

    /**
     * Convert object to boolean
     * 
     * @param value Object
     * @returns Object as boolean
     */
    public static GetAsBoolean(value: any) {
        return Boolean(value);
    }
}