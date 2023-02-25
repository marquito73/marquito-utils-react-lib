import * as React from "react";
import { StringBuilder, Utils } from "../../Utils";
import CSS from 'csstype';
import { EnumEvent } from "../../Enums";
import "./css/Component.scss"


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
	Events: Map<EnumEvent, Function>
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

	protected LogProperties = () => {
		console.table(this.props);
		console.table(this.state);
    }

	protected ExecuteFunction = (eventKey: EnumEvent) => {
		return () => {
			const eventFunction: Function | undefined = this.props.Events.get(eventKey);
			if (Utils.IsNotNull(eventFunction)) {
				eventFunction?.(this.props, this.state);
			}
		}
	}

	protected GetOwnId = () => {
		return this.props.Id;
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

	protected GetStyleImportant = (cssStyle: string) => {
		const sbStyle: StringBuilder = new StringBuilder(" ");

		sbStyle.Append(cssStyle).Append("!important");
		
		return sbStyle.ToString();
	}
}