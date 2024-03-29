import * as React from "react";
import {Component, ComponentProps, ComponentState} from "../Component";
import { useState, ChangeEvent } from 'react';
import "./css/CheckRadioBox.scss";
import { EnumEvent } from "../../Enums";

export interface CheckRadioBoxProps extends ComponentProps {
	/**
	 * Caption of checkbox/radiobox
	 * */
	Caption: string,
	/**
	 * Value of checkbox/radiobox
	 * */
	Value: string,
    /**
     * The checkbox/radiobox is selected ?
     */
    Selected: boolean,
    /**
     * Checkbox or radiobox ?
     */
    Type: string
}

export interface CheckRadioBoxState extends ComponentState {
    IsChecked: boolean
}

export abstract class CheckRadioBox<Props extends CheckRadioBoxProps, State extends CheckRadioBoxState> 
extends Component<Props & CheckRadioBoxProps, State & CheckRadioBoxState> {

    protected IsChecked:boolean = this.props.Selected;

    render() {

        const toggleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.IsChecked = event.target.checked;
            console.log(event.target.value + " : " + this.IsChecked);

            this.ExecuteFunction(EnumEvent.Check);
        }

        return (
            <div 
                id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
                className={this.GetOwnCssClass()}
                onChange={toggleCheck}
            >
                <label>
                    {this.props.Caption}
                    <this.getBoxInput/>
                </label>
            </div>
        );
    }

    private getBoxInput = () => {
        return (
            <>
                <input 
                    id={this.props.Id} 
                    name={this.props.Name} 
                    type={this.props.Type} 
                    defaultValue={this.props.Value} 
                    defaultChecked={this.props.Selected}
                    {...this.props.Attributes}
                    className="hidden"
                />
                <span 
                    id={this.props.Id + "Box"}
                >

                </span>
            </>
        );
    }
}