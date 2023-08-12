import * as React from "react";
import { Utils } from "../../Utils";
import CSS from 'csstype';
import { Label, LabelProps } from "../TextArea";

import "./css/Chip.scss";

/**
 * Chip's props
 */
export interface ChipProps extends LabelProps {
	/**
	 * Label's caption
	 * */
	ChipColor: string,
	/**
	 * Tooltip's caption
	 * */
	TooltipText: string,
	/**
	 * Chip has a border ?
	 */
	HasBorder: boolean,
}

/**
 * Chip component, useful for show short informations
 */
export class Chip<Props extends ChipProps> extends Label<Props & ChipProps> {
	constructor(props: Props & ChipProps) {
        super(props);
		this.props.CssClass.push("Chip-React");
		
		if (this.props.HasBorder) {
			this.props.CssClass.push("hasBorder");
		}
    }

	render() {
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.BoldText)) {
            cssStyles.backgroundColor = this.props.ChipColor;
        }
		return (
			<div 
				id={this.GetOwnContainerId()} 
				className={this.GetOwnCssClass()}
                style={cssStyles}
				title={this.props.TooltipText}
			>
                <this.GetChipLabel/>
			</div>
		);
	}

	/**
	 * Get chip label
	 * 
	 * @returns Chip label
	 */
	private GetChipLabel = () => {
		const chipLabelProps: LabelProps = {
			Text: this.props.Text,
			For: this.props.For,
			BoldText: this.props.BoldText,
			TextColor: this.props.TextColor,
			TextSize: this.props.TextSize,
			Id: `${this.props.Id}Label`,
			Name: `${this.props.Name}Label`,
			CssClass: new Array(),
			Attributes: new Map(),
			Events: new Map(),
		};

		return (
			<Label {...chipLabelProps}/>
		);
	}
}