import * as React from "react";
import { StringBuilder } from "../../Utils";


/**
 * Main components properties
 * */
 export interface ComponentProps {
	/**
	 * Id of the container of component
	 */
	ContainerId: string,
	/**
	 * Id of the component
	 */
	Id: string,
	/**
	 * Name of the component
	 */
	Name: string
	/**
	 * Css class of the component
	 */
	CssClass: Array<string>,
	/**
	 * Attributes of the component
	 */
	Attributes: Map<string, string>,
	/**
	 * Events of the component
	 */
	Events: Map<string, string>
}

/**
 * Main components properties
 * */
export interface ComponentState {

}

/**
 * Main component class
 * */
export abstract class Component<Props extends ComponentProps, State extends ComponentState>
	extends React.Component<Props & ComponentProps, State & ComponentState> {

	public LogProperties = () => {
		console.table(this.props);
    }

	protected GetOwnContainerId = () => {
		return this.GetContainerId(this.props.Id);
	}

	protected GetContainerId = (id: string) => {
		return id + "_cnt";
	}
	
	protected GetConstructedAttributes = () => {
		const sbAttributes: StringBuilder = new StringBuilder(" ");

		this.props.Attributes.forEach((value: string, key: string) => {
			sbAttributes.Append(this.GetConstructedAttribute(key, value));
		});

		return sbAttributes.ToString();
	}

	protected GetConstructedAttribute = (attributeName: string, attributeValue: string) => {
		const sbAttribute: StringBuilder = new StringBuilder("=");

		sbAttribute.Append(attributeName).Append(attributeValue);

		return sbAttribute.ToString();
	}

	protected GetOwnCssClass = () => {
		return this.GetCssClass(this.props.CssClass);
	}

	protected GetCssClass = (cssClass: Array<string>) => {
		const sbCssClass: StringBuilder = new StringBuilder(" ");

		cssClass.forEach(sbCssClass.Append);

		return sbCssClass.ToString();
	}

	protected GetOwnCssAttribute = () => {
		return this.GetCssAttribute(this.props.CssClass);
	}

	protected GetCssAttribute = (cssClass: Array<string>) => {
		const cssAttr: Map<string, string> = new Map();
		
		return cssAttr.set("className", this.GetCssClass(cssClass));
	}
}