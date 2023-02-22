import { ContentBox, ContentBoxProps } from "./ContentBox";

export class CheckListBox<Props extends ContentBoxProps> 
extends ContentBox<Props & ContentBoxProps> {
    render() {
        this.props.CssClass.push("CheckListBox-React");

        return (
            super.render()
        );
    }
}