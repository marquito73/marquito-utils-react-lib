/**
 * Class with useful tools
 */
export class Utils {
    /**
     * Is empty ?
     * 
     * @param value The object to test if is empty
     * @returns Is empty ?
     */
    public static IsEmpty = (value: any) => {
        let isEmpty: boolean = false;

        if (value == undefined) {
            isEmpty = true;
        } else {
            if (value instanceof String || value == "") {
                isEmpty = true;
            } else if (value instanceof Number || value == 0) {
                isEmpty = true;
            }
        }

        return isEmpty;
    }

    /**
     * Is not empty ?
     * 
     * @param value The object to test if is not empty
     * @returns Is not empty ?
     */
    public static IsNotEmpty = (value: any) => {
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