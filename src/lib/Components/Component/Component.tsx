import * as React from "react";
import { Selector, StringBuilder, Utils } from "../../Utils";
import CSS from 'csstype';
import { EnumEvent } from "../../Enums";
import "./css/Component.scss"


/**
 * Main components properties
 * */
 export interface ComponentProps {
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
 * Main components states
 * */
export interface ComponentState {

}

/**
 * Main component class
 * */
export abstract class Component<Props extends ComponentProps, State extends ComponentState>
	extends React.Component<Props & ComponentProps, State & ComponentState> {

	componentDidMount() {
        new Selector("html")
            .Trigger(EnumEvent.ComponentIsMounted, 
            {
                ID: this.props.Id,
				Type: this.constructor.name,
            });
	}

	componentWillUnmount() {
        new Selector("html")
            .Trigger(EnumEvent.ComponentWillUnmounted, 
            {
                ID: this.props.Id,
				Type: this.constructor.name,
            });
	}

	protected LogProperties = () => {
		console.table(this.props);
		console.table(this.state);
    }

	protected ExecuteFunction = (eventKey: EnumEvent, eventData?: object) => {
		return () => {
			const eventFunction: Function | undefined = this.props.Events.get(eventKey);
			if (Utils.IsNotNull(eventFunction)) {
				eventFunction?.(this.props, this.state, eventData);
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
		return `${id}_cnt`;
	}
	
	protected GetConstructedAttributes = () => {
		const sbAttributes: StringBuilder = new StringBuilder(" ");

		this.props.Attributes.forEach((value: string, key: string) => {
			sbAttributes.Append(this.GetConstructedAttribute(key, value));
		});

		return sbAttributes.ToString();
	}

	protected GetConstructedAttribute = (attributeName: string, attributeValue: string) => {
		return `${attributeName}="${attributeValue}"`;
	}

	protected GetOwnCssClass = () => {
		return this.GetCssClass(this.props.CssClass);
	}

	protected GetOwnCssClassWithOthers = (cssClass: Array<string>) => {
		return this.GetCssClass(this.props.CssClass.concat(cssClass));
	}

	protected GetCssClass = (cssClass: Array<string>) => {
		const sbCssClass: StringBuilder = new StringBuilder(" ");

		cssClass.forEach(sbCssClass.Append);

		return sbCssClass.ToString();
	}

	protected AddCssClass = (cssClass: string) => {
		let classAdded: boolean = false;
		if (!this.props.CssClass.includes(cssClass)) {
			this.props.CssClass.push(cssClass);
			classAdded = true;
		}
		return classAdded;
	}

	protected RemoveCssClass = (cssClass: string) => {
		const index = this.props.CssClass.indexOf(cssClass);
        if (this.props.CssClass.includes(cssClass) && index != -1) {
            this.props.CssClass.splice(index);
		}
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

	protected GetComponentSelector = () => {
		return new Selector(this.GetOwnId());
	}
}