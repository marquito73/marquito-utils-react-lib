import React, {useState} from "react";
import { Component, ComponentProps } from "../Component";
import { Utils } from "../../Utils";
import "./css/Button.scss";

export interface AbstractButtonProps extends ComponentProps {
    Caption: string,
    Link: string,
    OpenOnNewTab: boolean
}

export abstract class AbstractButton<Props extends AbstractButtonProps> extends Component<Props & AbstractButtonProps, {}> {
	constructor(props: Props & AbstractButtonProps) {
		super(props);
	}

    protected GetLink = () => {
        let link = undefined;

        if (Utils.IsNotEmpty(this.props.Link)) {
            link = this.props.Link;
        }

        return link;
    }

    protected GetTarget = () => {
        let target = undefined;

        if (this.props.OpenOnNewTab) {
            target = "_blank";
        }

        return target;
    }
}