import {CheckRadioBoxProps, CheckRadioBox} from "./CheckRadioBox";
import "./css/CheckBox.css"

export class CheckBox<Props extends CheckRadioBoxProps> extends CheckRadioBox<Props & CheckRadioBoxProps> {
    render() {
        this.props.CssClass.push("CheckBox-React");

        this.LogProperties();

        return (
            super.render()
        );
    }
}