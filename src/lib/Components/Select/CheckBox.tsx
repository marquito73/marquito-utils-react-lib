import {CheckRadioBoxProps, CheckRadioBox, CheckRadioBoxState} from "./CheckRadioBox";
import "./css/CheckBox.scss"

export class CheckBox<Props extends CheckRadioBoxProps> 
extends CheckRadioBox<Props & CheckRadioBoxProps, CheckRadioBoxState> {
    render() {
        this.props.CssClass.push("CheckBox-React");

        this.state = {
            IsChecked: true
        }

        //this.LogProperties();

        return (
            super.render()
        );
    }
}