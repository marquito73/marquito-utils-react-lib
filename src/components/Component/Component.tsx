import * as React from "react";

/**
 * Main components properties
 * */
export interface ComponentProps {
	ContainerId: string,
	Id: string,
	CssClass: Array<string>,
	Attributes: Map<String, String>,
	Events: Map<String, String>
	//Events
}

/**
 * Main component class
 * */
export default abstract class Component<Props>
	extends React.Component<Props & ComponentProps, {}> {

	LogProperties = () => {
		console.table(this.props);
    }
}