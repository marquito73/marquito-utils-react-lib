import {CheckRadioBoxProps, CheckRadioBox, CheckRadioBoxState} from "./CheckRadioBox";
import "./css/RadioBox.scss"

export class RadioBox<Props extends CheckRadioBoxProps> 
extends CheckRadioBox<Props & CheckRadioBoxProps, CheckRadioBoxState> {
    render() {
        this.props.CssClass.push("RadioBox-React");

        //this.LogProperties();

        return (
            super.render()
        );
    }
}