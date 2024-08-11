import * as React from "react";
import {Component, ComponentProps} from "../Component";
import "./css/ImageContainer.scss";

export interface ImageContainerProps extends ComponentProps {
    /**
     * Image content
     */
    ImageContent: string,
}

export class ImageContainer<Props extends ImageContainerProps> extends Component<Props & ImageContainerProps, {}> {
	constructor(props: Props & ImageContainerProps) {
		super(props);
        this.AddCssClass("ImageContainer-React");
	}

	render() {
		return (
			<div 
				id={this.GetOwnContainerId()} 
				{...this.props.Attributes}
				className={this.GetOwnCssClass()}
			>
                <img
                    id={this.GetOwnId()} 
                    src={this.props.ImageContent}
                />
			</div>
		);
	}
}