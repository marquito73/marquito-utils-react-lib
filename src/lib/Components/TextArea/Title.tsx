import * as React from "react";
import {Component, ComponentProps} from "../Component";
import { Utils } from "../../Utils";
import CSS from 'csstype';
import { EnumTitleType } from "../../Enums";
import "./css/Title.scss";

export interface TitleProps extends ComponentProps {
	/**
	 * Caption of title
	 * */
	Text: string,
	/**
	 * Text is bold ?
	 */
	BoldText: boolean,
	/**
	 * Text color
	 */
    TextColor: string,
	/**
	 * Text size
	 */
    TextSize: number,
    /**
     * Title type
     */
    TitleType: EnumTitleType
}

export class Title<Props extends TitleProps> extends Component<Props & TitleProps, {}> {
	render() {
        const cssStyles: CSS.Properties = {};
        if (Utils.IsNotEmpty(this.props.BoldText)) {
            cssStyles.fontWeight = "bold";
        }
        if (Utils.IsNotEmpty(this.props.TextColor)) {
            cssStyles.color = this.props.TextColor;
        }
        if (Utils.IsNotEmpty(this.props.TextSize)) {
            cssStyles.fontSize = this.props.TextSize + "px";
        }

		this.props.CssClass.push("Title-React");
		
		return (
			<div 
				id={this.GetOwnContainerId()} 
				className={this.GetOwnCssClass()}
			>
				<h1 
					id={this.props.Id} 
					style={cssStyles}
				>
                    {this.props.Text}
                </h1>
			</div>
		);
	}

    /*private GetTitle = () => {
        return(
            {...switch() {
                case EnumTitleType.H1:
                    break;
            }}
        );
    }*/
}