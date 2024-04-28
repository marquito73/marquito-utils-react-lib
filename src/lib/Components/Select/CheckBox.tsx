import {CheckRadioBoxProps, CheckRadioBox, CheckRadioBoxState} from "./CheckRadioBox";
import "./css/CheckBox.scss";

export class CheckBox<Props extends CheckRadioBoxProps> 
extends CheckRadioBox<Props & CheckRadioBoxProps> {
    render() {
        this.AddCssClass("CheckBox-React");
        
        return (
            super.render()
        );
    }
}