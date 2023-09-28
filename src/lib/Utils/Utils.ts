import { StringBuilder } from "./Stringbuilder";

/**
 * Class with useful tools
 */
export class Utils {
    /**
     * Is null or undefined ?
     * 
     * @param value The object to test if is null or undefined
     * @returns Is null or undefined ?
     */
    public static IsNull = (value: any) => {
        return value == undefined || value == null;
    }

    /**
     * Is not null and not undefined ?
     * 
     * @param value The object to test if is not null and not undefined
     * @returns Is not null and not undefined ?
     */
    public static IsNotNull = (value: any) => {
        return !this.IsNull(value);
    }

    /**
     * Is empty ?
     * 
     * @param value The object to test if is empty
     * @returns Is empty ?
     */
    public static IsEmpty = (value: any) => {
        let isEmpty: boolean = false;

        if (this.IsNull(value)) {
            isEmpty = true;
        } else {
            if (value instanceof String || value === "") {
                isEmpty = true;
            } else if (value instanceof Number || value === 0) {
                isEmpty = true;
            } else if (value instanceof Array) {
                isEmpty = value.length <= 0;
            } else if (value instanceof Map) {
                isEmpty = value.keys.length <= 0;
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
     * Complete string with specified caracter at the left and specific length
     * 
     * @param value The string to complete
     * @param length The length of the final string
     * @param char The char used to complete the string
     * @returns A string completed with specified caracter at the left and specific length
     */
    public static Lpad = (value: string, length: number, char: string) => {
        return value.padStart(length, char);
    }

    /**
     * Complete string with specified caracter at the right and specific length
     * 
     * @param value The string to complete
     * @param length The length of the final string
     * @param char The char used to complete the string
     * @returns A string completed with specified caracter at the right and specific length
     */
    public static Rpad = (value: string, length: number, char: string) => {
        return value.padEnd(length, char);
    }

    /**
     * Convert object to string
     * 
     * @param value Object
     * @returns Object as string
     */
    public static GetAsString = (value: any) => {
        let result: string;

        if (value instanceof Date) {
            const sbDate: StringBuilder = new StringBuilder("-");
            sbDate.Append(Utils.Lpad(Utils.GetAsString(value.getFullYear()), 4, "0"))
            .Append(Utils.Lpad(Utils.GetAsString(value.getMonth() + 1), 2, "0"))
            .Append(Utils.Lpad(Utils.GetAsString(value.getDate()), 2, "0"))
            result = sbDate.ToString();
        } else {
            result = String(value);
        }
        return result;
    }

    public static GetAsDate = (value: any) => {
        return new Date(value);
    }

    public static GetAsNumber = (value: any) => {
        return Number(value);
    }

    /**
     * Convert object to boolean
     * 
     * @param value Object
     * @returns Object as boolean
     */
    public static GetAsBoolean = (value: any) => {
        return value == true || value == "true" || value == "TRUE";
    }

    public static Nvl = <T> (value: T): T => {
		let result: any = value;
		
		if (value instanceof Object) {
			if (value instanceof Array) {
                if (value.length == 0) {
                    result = new Array();
                }
			} else {
                if (Object.keys(value).length == 0) {
                    result = new Map();
                }
			}
		}

		return result;
    }

    public static NvlObject = (value: Object) => {
        if (Object.keys(value).length == 0) {
            value = new Map();
        } else {
            value = Object.entries(value).map(([key, val]) => {
                if (val instanceof Object) {
                    if (val instanceof Array) {
                        if (val.length == 0) {
                            val = new Array();
                        } else {
                            val = this.NvlObject(val);
                        }
                    } else {
                        val = this.NvlObject(val);
                    }
                }
                return [key, val];
            });
        }

        return value;
    }
}