import * as React from "react";
import { useEffect } from "react";
import { EnumEvent } from "../../Enums";
import { Selector, StringBuilder, Utils } from "../../Utils";
import {Component, ComponentProps, ComponentState} from "../Component";
import "./css/ProgressBar.scss";

export interface ProgressBarProps extends ComponentProps {
	/**
	 * Percentage of the progress
	 * */
	Percent: number,
    ProgressColor: string,
	ChangeElementEvent: EnumEvent,
	ChangeElementId: string,
	ChangeValueFunction: Function,
	HideValue: boolean
}

export interface ProgressBarState extends ComponentState {
    /**
     * Date, value updated when change
     */
    PercentValue: number
}

export class ProgressBar<Props extends ProgressBarProps> 
extends Component<Props & ProgressBarProps, ProgressBarState> {

	constructor(props: Props & ProgressBarProps, state: ProgressBarState) {
        super(props, state);
        this.state = {
            PercentValue: this.props.Percent
        }
		this.props.CssClass.push("ProgressBar-React");

		if (this.props.HideValue) {
			this.props.CssClass.push("HiddenValue");
		}
    }

	componentDidMount() {
		new Selector(`#${this.props.ChangeElementId}`).On(this.props.ChangeElementEvent, this.OnChangeValue);
	}

	componentWillUnmount() {
		new Selector(`#${this.props.ChangeElementId}`).Off(this.props.ChangeElementEvent, this.OnChangeValue);
	}

	private OnChangeValue = () => {
		let newValue: number = this.props.ChangeValueFunction(this.state.PercentValue) as number;
		if (newValue < 0) {
			newValue= 0;
		} else if (newValue > 100) {
			newValue = 100;
		}
		this.setState({PercentValue: newValue}, 
			this.ExecuteFunction(EnumEvent.Change));
	}

	render() {

		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
			>
                <div
                    id={this.props.Id}
                    className="progress"
                    style={{width: `${this.state.PercentValue}%`, backgroundColor: this.props.ProgressColor}}
                />
                <label className="ProgressBarValue">{`${this.state.PercentValue} %`}</label>
			</div>
		);
	}

	private HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log("New value : " + event.target.value);
		this.setState({PercentValue: Utils.GetAsNumber(event.target.value)}, 
			this.ExecuteFunction(EnumEvent.Change));
	}
}