import { EnumToastType } from "../../Enums";

export class ToastMessage {
    public Guid: string;
    public Type: EnumToastType;
    public Title: string;
    public Message: string;
    public MessageDate: Date;
    public Duration?: number;
    public Progression: number;

    constructor(guid: string, type: EnumToastType, title: string, message: string, duration?: number) {
        this.Guid = guid;
        this.Type = type;
        this.Title = title;
        this.Message = message;
        this.MessageDate = new Date();
        this.Duration = duration;
        this.Progression = 100;
    }
}