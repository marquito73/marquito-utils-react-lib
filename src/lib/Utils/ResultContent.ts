export class ResultContent {
    public State: string;
    public Title: string;
    public Message: string;
    public Data: object;

    constructor(state = "", title = "", message = "", data = {}) {
        this.State = state;
        this.Title = title;
        this.Message = message;
        this.Data = data;
    }
}