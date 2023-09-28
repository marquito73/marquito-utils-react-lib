import React, { RefObject, useRef } from "react";
import { hasFlag } from "country-flag-icons";
import { countries } from "countries-list";
import { Option, OptionProps } from "../../Option";
import { EnumEvent, EnumInputType } from "../../../../Enums";
import { Selector, Utils } from "../../../../Utils";
import "./css/CountryFlagListBox.scss";
import { Component, ComponentProps, ComponentState } from "../../../Component";
import { FlagUtils } from "../../../../Utils/FlagUtils";

/**
 * Country flag list box props
 */
export interface CountryFlagListBoxProps extends ComponentProps {
    /**
     * Filter country can be displayed and choose
     */
    FilterCountries: Array<string>,
    /**
     * The selected flag
     */
    SelectedFlag: string,
}

/**
 * Country flag list box states
 */
export interface CountryFlagListBoxState extends ComponentState {
    /**
     * The selected flag
     */
    SelectedFlagValue: string
}

export class CountryFlagListBox<Props extends CountryFlagListBoxProps> 
extends Component<Props & CountryFlagListBoxProps, CountryFlagListBoxState> {

	constructor(props: Props & CountryFlagListBoxProps, state: CountryFlagListBoxState) {
        super(props, state);
        
        let selectedFlag: string;
        if (Utils.IsEmpty(this.props.FilterCountries)) {
            if (Utils.IsNotEmpty(this.props.SelectedFlag)) {
                selectedFlag = this.props.SelectedFlag;
            } else {
                // Choose first by default
                selectedFlag = this.GetCountryOptions()[0].Value;
            }
        } else {
            if (Utils.IsNotEmpty(this.props.SelectedFlag) && this.props.FilterCountries.includes(this.props.SelectedFlag)) {
                selectedFlag = this.props.SelectedFlag;
            } else {
                // Choose first by default
                selectedFlag = this.props.FilterCountries[0];
            }
        }
        
        this.state = {
            SelectedFlagValue: selectedFlag,
        }

        this.props.CssClass.push("CountryFlagListBox-React");
        this.props.CssClass.push("ContentBox-React");
    }

    render() {
        return(
            <div
                id={this.GetContainerId(this.props.Id)}
                className={this.GetOwnCssClass()}
            >
                <div
                    id={`${this.props.Id}SelectedFlag`}
                    className="SelectedFlag"
                    onClick={this.HandleFlagSelectedClick}
                    onMouseLeave={this.HandleMouseLeave}
                >
                    <this.RenderSelectedFlag/>
                </div>
                <this.GetSelectOptions/>
            </div>
        );
    };

    /**
     * Get options for the flag list box
     * 
     * @returns Options for the flag list box
     */
    private GetSelectOptions = () => {
        return (
            <div
                id={`${this.props.Id}_options`}
                className="ContentBoxOptions"
                onMouseLeave={this.HandleMouseLeave}
            >
                {
                    this.GetCountryOptions().map((option) => {
                        return (
                            {...this.GetOption(option)}
                        );
                    })
                }
            </div>
        );
    }

    /**
     * Get option for the flag list box
     * 
     * @param option The option to display
     * @returns Option for the flag list box
     */
    private GetOption = (option: OptionProps) => {
        return (
            <div 
                id={this.GetContainerId(option.Id)}
                key={option.Id}
				{...this.props.Attributes}
                className={this.GetOwnCssClass()}
                onClick={this.OnOptionClick}
                data-countryCode={option.Value}
            >
                {FlagUtils.GetFlagComponent(option.Value)}
            </div>
        );
    }

    /**
     * When user click on a flag, the flag must to be appear at the top, as the choosen flag
     * 
     * @param event Click event on a flag
     */
    private OnOptionClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const countryCode: string = new Selector(event.currentTarget).GetAttribute("data-countryCode");
        this.setState({SelectedFlagValue: countryCode}, () => {
            this.forceUpdate();
        });
    }

    /**
     * Render the selected flag
     * 
     * @returns The flag rendered
     */
    private RenderSelectedFlag = () => {
        let flag: JSX.Element;

        if (Utils.IsNotEmpty(this.state.SelectedFlagValue)) {
            // The flag
            flag = FlagUtils.GetFlagComponent(this.state.SelectedFlagValue);
        } else {
            flag = (
                <div>

                </div>
            );
        }

        return flag;
    }
    
    /**
     * Get the flag country options
     * 
     * @returns The flag country options
     */
    private GetCountryOptions = (): Array<OptionProps> => {
        return Object.entries(countries)
        .filter((isoCode) => hasFlag(isoCode[0]))
        .filter((isoCode) => Utils.IsEmpty(this.props.FilterCountries) || this.props.FilterCountries.includes(isoCode[0]))
        .map((isoCode) => {
            const option: OptionProps = {
                Caption: isoCode[1].name,
                Value: isoCode[0],
                Selected: false,
                CheckType: EnumInputType.Country,
                Id: `opt${isoCode[0]}`,
                Name: `opt${isoCode[0]}`,
                CssClass: new Array(),
                Attributes: new Map(),
                Events: new Map()
            };

            return option;
        });
    }

    /**
     * Handle when the user click on the flag selected, for open flag list
     * 
     * @param event Event when the user click on the flag selected
     */
    private HandleFlagSelectedClick = (event: React.PointerEvent<HTMLDivElement>) => {
        const contentBoxOptions: Selector = new Selector(event.currentTarget)
        .Parent().Children(".ContentBoxOptions");

        if (contentBoxOptions.HasClass("opened")) {
            contentBoxOptions.RemoveClass("opened");
        } else {
            contentBoxOptions.AddClass("opened");
        }
    }

    /**
     * Handle when the user exit the flag list box
     * 
     * @param event Event when the user exit the flag list box
     */
    private HandleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        const contentBox: Selector = new Selector(event.currentTarget).Closest(".CountryFlagListBox-React");

        const summary: Selector = contentBox.Children(".SelectedFlag:hover");
        const options: Selector = contentBox.Children(".ContentBoxOptions:hover");

        if (summary.Count() == 0 && options.Count() == 0) {
            contentBox.Children(".ContentBoxOptions").RemoveClass("opened");
        }
    }
}