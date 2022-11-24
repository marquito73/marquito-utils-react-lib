import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import TextBox, { TextBoxProps } from "./TextArea";

export { default as Component, ComponentProps } from "./Component";
export { default as TextBox, TextBoxProps } from "./TextArea";
export {ReactWidgetFactory};


export default class ReactWidgetFactory {
	public static test() {
		console.log("Test react réussi !");
	}

	/**
	 * Create textbox
	 * 
	 * @param props Textbox properties
	 */
	public static createTextBox(props: TextBoxProps) {
		const _props: TextBoxProps = { ...props };
		const root = createRoot(document.getElementById(_props.ContainerId) as HTMLElement);
		root.render(<TextBox {..._props} />);
    }
}