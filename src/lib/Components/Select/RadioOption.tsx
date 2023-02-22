import { Option, OptionProps } from "./Option";

export class RadioOption<Props extends OptionProps> 
extends Option<Props & OptionProps> {
    render() {
        this.props.CssClass.push("RadioOption-React");

        return (
            super.render()
        );
    }
}