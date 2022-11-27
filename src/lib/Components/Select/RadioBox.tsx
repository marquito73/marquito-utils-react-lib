import {CheckRadioBoxProps, CheckRadioBox} from "./CheckRadioBox";
import "./css/RadioBox.css"

export class RadioBox<Props extends CheckRadioBoxProps> extends CheckRadioBox<Props & CheckRadioBoxProps> {
    render() {
        this.props.CssClass.push("RadioBox-React");

        this.LogProperties();

        return (
            super.render()
        );
    }
}