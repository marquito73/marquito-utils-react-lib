import { Option, OptionProps } from "./Option";

export class CheckOption<Props extends OptionProps> 
extends Option<Props & OptionProps> {
    render() {
        this.props.CssClass.push("CheckOption-React");

        return (
            super.render()
        );
    }
}