import * as React from "react";
import {Component, ComponentProps, ComponentState} from "../Component";
import { ChangeEvent } from 'react';
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

export abstract class CheckRadioBox<Props extends CheckRadioBoxProps> 
extends Component<Props & CheckRadioBoxProps, CheckRadioBoxState> {

    constructor(props: Props & CheckRadioBoxProps, state: CheckRadioBoxState) {
		super(props);
        this.state = {
            IsChecked: this.props.Selected,
        };
    }

    render() {

        return (
            <div 
                id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
                className={this.GetOwnCssClass()}
                onChange={this.OnCheck}
            >
                <label>
                    {this.props.Caption}
                    <this.getBoxInput/>
                </label>
            </div>
        );
    }

    public OnCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement: HTMLInputElement = event.target as HTMLInputElement;
        this.setState({IsChecked: (event.target as HTMLInputElement).checked}, () => {
            this.ExecuteFunction(EnumEvent.Check);
            this.forceUpdate();
        });
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