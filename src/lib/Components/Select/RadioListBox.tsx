import { ContentBox, ContentBoxProps } from "./ContentBox";

export class RadioListBox<Props extends ContentBoxProps> 
extends ContentBox<Props & ContentBoxProps> {
    render() {
        this.props.CssClass.push("RadioListBox-React");

        return (
            super.render()
        );
    }
}