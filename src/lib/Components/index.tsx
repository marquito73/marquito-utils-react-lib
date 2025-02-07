import * as React from "react";
import { createRoot } from 'react-dom/client';
import { Button, ButtonProps, IconButton, IconButtonProps } from "./Button";
import { Icon, IconProps } from "./Common";
import { Grid, GridProps } from "./Grid";
import { Tabs, TabsProps } from "./Menu";
import { Popup, PopupProps } from "./Popup";
import { ProgressBar, ProgressBarProps } from "./Progress";
import { CheckBox, RadioBox, CheckRadioBoxProps, ContentBoxProps, CheckListBox, RadioListBox, CountryFlagListBoxProps, CountryFlagListBox } from "./Select";
import { DatePicker, DatePickerProps, Label, LabelProps, TextArea, TextAreaProps, TextBox, TextBoxProps, TextParagraph, TextParagraphProps, Title, TitleProps } from "./TextArea";
import { AjaxUtils, Utils } from "../Utils";
import { Chip, ChipProps } from "./Chip";
import { CustomRadarChart, RadarChartProps } from "./Chart";
import { ToastManager, ToastManagerProps } from "./Toast";
import { EnumToastType } from "../Enums/EnumToastType";
import { ImageContainer, ImageContainerProps } from "./Image";
import { Spinner, SpinnerProps } from "./Spinner";
import { FileInput, FileInputProps } from "./File";

export * from "./Button";
export * from "./Chart";
export * from "./Chip";
export * from "./Common";
export * from "./Component";
export * from "./File";
export * from "./Grid";
export * from "./Image";
export * from "./Menu";
export * from "./Popup";
export * from "./Progress";
export * from "./Range";
export * from "./Select";
export * from "./Spinner";
export * from "./TextArea";
export * from "./Toast";
export {ReactWidgetFactory};
export {AjaxUtils};


export default class ReactWidgetFactory {
	/**
	 * Create button
	 * 
	 * @param props Button properties
	 */
	public static createButton(props: ButtonProps, containerId: string) {
		const _props: ButtonProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<Button {..._props} />);
	}

	/**
	 * Create icon button
	 * 
	 * @param props Icon button properties
	 */
	public static createIconButton(props: IconButtonProps, containerId: string) {
		const _props: IconButtonProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<IconButton {..._props} />);
	}

	/**
	 * Create icon
	 * 
	 * @param props Icon properties
	 */
	public static createIcon(props: IconProps, containerId: string) {
		const _props: IconProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<Icon {..._props} />);
	}

	/**
	 * Create grid
	 * 
	 * @param props Grid properties
	 */
	public static createGrid(props: GridProps, containerId: string) {
		const _props: GridProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<Grid {..._props} />);
	}

	/**
	 * Create tabs
	 * 
	 * @param props Tabs properties
	 */
	public static createTabs(props: TabsProps, containerId: string) {
		const _props: TabsProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<Tabs {..._props} />);
	}

	/**
	 * Create popup
	 * 
	 * @param props Popup properties
	 */
	public static createPopup(props: PopupProps, containerId: string) {
		const _props: PopupProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<Popup {..._props} />);
	}

	/**
	 * Create progress bar
	 * 
	 * @param props Progress bar properties
	 */
	public static createProgressBar(props: ProgressBarProps, containerId: string) {
		const _props: ProgressBarProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<ProgressBar {..._props} />);
	}

	/**
	 * Create checkbox
	 * 
	 * @param props Checkbox properties
	 */
	public static createCheckBox(props: CheckRadioBoxProps, containerId: string) {
		const _props: CheckRadioBoxProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<CheckBox {..._props} />);
	}

	/**
	 * Create radiobox
	 * 
	 * @param props Radiobox properties
	 */
	public static createRadioBox(props: CheckRadioBoxProps, containerId: string) {
		const _props: CheckRadioBoxProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<RadioBox {..._props} />);
	}

	/**
	 * Create checklistbox
	 * 
	 * @param props Checklistbox properties
	 */
	public static createCheckListBox(props: ContentBoxProps, containerId: string) {
		const _props: ContentBoxProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<CheckListBox {..._props} />);
	}

	/**
	 * Create radiolistbox
	 * 
	 * @param props Radiolistbox properties
	 */
	public static createRadioListBox(props: ContentBoxProps, containerId: string) {
		const _props: ContentBoxProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<RadioListBox {..._props} />);
	}

	/**
	 * Create datepicker
	 * 
	 * @param props Datepicker properties
	 */
	public static createDatePicker(props: DatePickerProps, containerId: string) {
		const _props: DatePickerProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<DatePicker {..._props} />);
    }

	/**
	 * Create label
	 * 
	 * @param props Label properties
	 */
	public static createLabel(props: LabelProps, containerId: string) {
		const _props: LabelProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<Label {..._props} />);
    }

	/**
	 * Create textarea
	 * 
	 * @param props Textarea properties
	 */
	public static createTextArea(props: TextAreaProps, containerId: string) {
		const _props: TextAreaProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<TextArea {..._props} />);
    }

	/**
	 * Create textbox
	 * 
	 * @param props Textbox properties
	 */
	public static createTextBox(props: TextBoxProps, containerId: string) {
		const _props: TextBoxProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<TextBox {..._props} />);
    }

	/**
	 * Create title
	 * 
	 * @param props Title properties
	 */
	public static createTitle(props: TitleProps, containerId: string) {
		const _props: TitleProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<Title {..._props} />);
    }

	/**
	 * Create text paragraph
	 * 
	 * @param props Text paragraph properties
	 */
	public static createTextParagraph(props: TextParagraphProps, containerId: string) {
		const _props: TextParagraphProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<TextParagraph {..._props} />);
    }

	/**
	 * Create chip
	 * 
	 * @param props Chip properties
	 */
	public static createChip(props: ChipProps, containerId: string) {
		const _props: ChipProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<Chip {..._props} />);
    }

	/**
	 * Create country flag list box
	 * 
	 * @param props Country flag list box properties
	 */
	public static createCountryFlagListBox(props: CountryFlagListBoxProps, containerId: string) {
		const _props: CountryFlagListBoxProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<CountryFlagListBox {..._props} />);
    }

	/**
	 * Create spinner
	 * 
	 * @param props Spinner properties
	 */
	public static createSpinner(props: SpinnerProps, containerId: string) {
		const _props: SpinnerProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<Spinner {..._props} />);
    }

	/**
	 * Create radar chart
	 * 
	 * @param props Radar chart properties
	 */
	public static createRadarChart(props: RadarChartProps, containerId: string) {
		const _props: RadarChartProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<CustomRadarChart {..._props} />);
    }

	/**
	 * Create image container
	 * 
	 * @param props Image container properties
	 */
	public static createImageContainer(props: ImageContainerProps, containerId: string) {
		const _props: ImageContainerProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<ImageContainer {..._props} />);
    }

	/**
	 * Create file input
	 * 
	 * @param props File input properties
	 */
	public static createFileInput(props: FileInputProps, containerId: string) {
		const _props: FileInputProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<FileInput {..._props} />);
    }

	/**
	 * Create manager manager
	 * 
	 * @param props Manager manager properties
	 */
	public static createToastManager(props: ToastManagerProps, containerId: string) {
		const _props: ToastManagerProps = { ...props };
		const root = createRoot(document.getElementById(containerId) as HTMLElement);
		root.render(<ToastManager {..._props} />);
	}

	public static AjaxUtils(): AjaxUtils {
		return AjaxUtils;
	}

	public static DisplayToast(toastType: EnumToastType, title: string, message: string) {
		Utils.DisplayToast(toastType, title, message);
	}

    public static OpenPopup(popupID: string) {
		Utils.OpenPopup(popupID);
	}
}