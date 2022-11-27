import * as React from "react";
import {Component, ComponentProps} from "../Component";
import { useState } from 'react';
import "./css/CheckRadioBox.css";

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

export abstract class CheckRadioBox<Props extends CheckRadioBoxProps> extends Component<Props & CheckRadioBoxProps> {
    
    render() {
        return (
            <div 
                id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
                className={this.GetOwnCssClass()}
            >
                <label>
                    {this.props.Caption}
                    <this.getBoxInput/>
                </label>
            </div>
        );
    }

	/*render() {
        let inputValue = "off";
        if (this.props.Selected)
        {
            inputValue = "on";
            this.props.Attributes.set("checked", "");
        }
		return (
			// <div id={this.props.Id + "_cnt"} className="Label-React">
                
			// </div>
            <input 
                id={this.props.Id} 
                name={this.props.Name} 
                type={this.props.Type} 
                defaultValue={inputValue} 
                {...this.props.Attributes}
                />
		);
	}*/

    protected getBoxInput = () => {
        let inputValue = "off";
        if (this.props.Selected)
        {
            inputValue = "on";
            // this.props.Attributes.set("checked", "");
        }
        //this.props.Attributes.set("value", this.props.Value);
        return (
            <>
                <input 
                    id={this.props.Id} 
                    name={this.props.Name} 
                    type={this.props.Type} 
                    defaultValue={inputValue} 
                    {...this.props.Attributes}
                />
                <span id={this.props.Id + "Box"} >

                </span>
            </>
        );
    }

    /*protected getBoxLabel = () => {
        const labelProps: LabelProps = {
            Text: this.props.Caption,
            For: this.props.Id,
            Id: this.props.Id + "Label",
            ContainerId: this.GetOwnContainerId(),
            Name: this.props.Name + "Label",
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        };

        return (
            <Label {...labelProps}></Label>
        );
    }*/
}