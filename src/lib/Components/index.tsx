import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {Button, ButtonProps} from "./Button";
import { Grid, GridProps } from "./Grid";
import { Tabs, TabsProps } from "./Menu";
import {CheckBox, RadioBox, CheckRadioBoxProps} from "./Select";
import {TextBox, TextBoxProps} from "./TextArea";

export * from "./Button";
export * from "./Component";
export * from "./Grid";
export * from "./Menu";
export * from "./Select";
export * from "./TextArea";
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

	/**
	 * Create checkbox
	 * 
	 * @param props Checkbox properties
	 */
	public static createCheckBox(props: CheckRadioBoxProps) {
		const _props: CheckRadioBoxProps = { ...props };
		const root = createRoot(document.getElementById(_props.ContainerId) as HTMLElement);
		root.render(<CheckBox {..._props} />);
	}

	/**
	 * Create radiobox
	 * 
	 * @param props Radiobox properties
	 */
	public static createRadioBox(props: CheckRadioBoxProps) {
		const _props: CheckRadioBoxProps = { ...props };
		const root = createRoot(document.getElementById(_props.ContainerId) as HTMLElement);
		root.render(<RadioBox {..._props} />);
	}

	/**
	 * Create button
	 * 
	 * @param props Button properties
	 */
	public static createButton(props: ButtonProps) {
		const _props: ButtonProps = { ...props };
		const root = createRoot(document.getElementById(_props.ContainerId) as HTMLElement);
		root.render(<Button {..._props} />);
	}

	/**
	 * Create tabs
	 * 
	 * @param props Tabs properties
	 */
	public static createTabs(props: TabsProps) {
		const _props: TabsProps = { ...props };
		const root = createRoot(document.getElementById(_props.ContainerId) as HTMLElement);
		root.render(<Tabs {..._props} />);
	}

	/**
	 * Create grid
	 * 
	 * @param props Grid properties
	 */
	public static createGrid(props: GridProps) {
		const _props: GridProps = { ...props };
		const root = createRoot(document.getElementById(_props.ContainerId) as HTMLElement);
		root.render(<Grid {..._props} />);
	}
}