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
        return value === undefined || value == null;
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
    public static GetAsString = (value: any) => {
        return String(value);
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

    public static Nvl = (value: any) => {
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