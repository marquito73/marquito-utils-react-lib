import * as React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { EnumEvent, EnumLang } from "../../Enums";
import { LangUtils, Utils } from "../../Utils";
import {Component, ComponentProps, ComponentState} from "../Component";
import "react-datepicker/dist/react-datepicker.css";  
import "./css/DatePicker.scss";

export interface DatePickerProps extends ComponentProps {
	/**
	 * Date
	 * */
	Date: Date,
    /**
     * Minumum date
     */
    MinimumDate: Date | undefined,
    /**
     * Maximum date
     */
    MaximumDate: Date | undefined,
	/**
	 * Placeholder of the datepicker
	 * */
	PlaceHolder: string,
    /**
     * Language for the datepicker
     */
    Language: EnumLang
}

export interface DatePickerState extends ComponentState {
    /**
     * Date, value updated when change
     */
    DateValue: Date
}

export class DatePicker<Props extends DatePickerProps> extends Component<Props & DatePickerProps, DatePickerState> {

    constructor(props: Props & DatePickerProps, state: DatePickerState) {
        super(props, state);
        this.state = {
            DateValue: this.props.Date
        }
    }

	render() {
        this.AddCssClass("DatePicker-React");
        // Register the language choosen
        registerLocale("lang", LangUtils.GetLocalForLang(this.props.Language));
        return(
            <div
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}
                {...this.props.Attributes}
            >
                <ReactDatePicker
                    id={this.props.Id}
                    name={this.props.Name}
                    selected={this.state.DateValue}
                    minDate={this.props.MinimumDate}
                    maxDate={this.props.MaximumDate}
                    showYearDropdown={true}
                    todayButton={true}
                    placeholderText={this.props.PlaceHolder}
                    locale="lang"
                    onChange={(date: Date) => {
                        this.setState({DateValue: date}, this.ExecuteFunction(EnumEvent.Change));
                    }}
                />
            </div>
        );
    }

    private HandleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({DateValue: Utils.GetAsDate(event.target.value)}, this.ExecuteFunction(EnumEvent.Change));
    }
}