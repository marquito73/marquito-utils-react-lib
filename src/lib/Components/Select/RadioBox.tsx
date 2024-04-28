import {CheckRadioBoxProps, CheckRadioBox, CheckRadioBoxState} from "./CheckRadioBox";
import "./css/RadioBox.scss"

export class RadioBox<Props extends CheckRadioBoxProps> 
extends CheckRadioBox<Props & CheckRadioBoxProps> {
    render() {
        this.AddCssClass("RadioBox-React");

        return (
            super.render()
        );
    }
}