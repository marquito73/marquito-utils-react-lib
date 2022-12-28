/**
 * Custom Function
 */
export class CustomFunction {
    /**
     * The function
     */
    private Function: Function;
    /**
     * Parameters
     */
    private Parameters: Array<any>;

    /**
     * A custom function
     * 
     * @param func The function
     * @param params The parameters
     */
    constructor(func: Function, ...params: any[]) {
        this.Function = func;
        this.Parameters = params;
    }

    /*public GetFunction = () => {
        return 
    }*/
}