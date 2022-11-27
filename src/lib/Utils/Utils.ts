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
}