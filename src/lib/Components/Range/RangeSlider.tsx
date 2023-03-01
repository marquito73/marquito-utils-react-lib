import React from "react";
import { EnumEvent } from "../../Enums";
import { Component, ComponentProps } from "../Component";
import "./css/RangeSlider.scss";

export interface RangeSliderProps extends ComponentProps {
	/**
	 * Value of range slider
	 * */
	Value: number,
    /**
     * Minimum value of range slider
     */
    MinValue: number,
    /**
     * Maximum value of range slider
     */
    MaxValue: number,
	/**
	 * Step between values
	 */
	Step: number
}
export class RangeSlider<Props extends RangeSliderProps> extends Component<Props & RangeSliderProps, {}> {
	constructor(props: Props & RangeSliderProps) {
		super(props);
		this.props.CssClass.push("RangeSlider-React");
	}
    render() {

        return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
			>
				<input
					id={this.props.Id} 
                    type="range"
                    value={this.props.Value}
                    min={this.props.MinValue}
                    max={this.props.MaxValue}
                    step={this.props.Step}
					onChange={this.HandleRangeSliderChange}
				/>
			</div>
        );
    }

	private HandleRangeSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log("New value : " + event.target.value);
		this.ExecuteFunction(EnumEvent.Change);
	}
}