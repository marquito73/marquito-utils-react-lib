import { EnumToastType } from "../../Enums";

export class ToastMessage {
    public Guid: string;
    public Type: EnumToastType;
    public Title: string;
    public Message: string;
    public MessageDate: Date;

    constructor(guid: string, type: EnumToastType, title: string, message: string) {
        this.Guid = guid;
        this.Type = type;
        this.Title = title;
        this.Message = message;
        this.MessageDate = new Date();
    }
}