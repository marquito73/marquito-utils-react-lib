import * as React from "react";
import {Component, ComponentProps} from "../Component";
import { Label, LabelProps } from "../TextArea";
import CSS from 'csstype';
import "./css/FileInput.scss";
import { AjaxUtils, Selector, Utils } from "../../Utils";
import { EnumEvent, EnumToastType } from "../../Enums";
import { ResultContent } from "../../Utils/ResultContent";

export interface FileInputProps extends ComponentProps {
    TextToDisplay: string,
    Color: string,
    TextToDisplaySize: number,
    AuthorizedFileExtensions: Array<string>,
    UploadURL?: string,
}

export class FileInput<Props extends FileInputProps> extends Component<Props & FileInputProps, {}> {
    constructor(props: Props & FileInputProps) {
        super(props);
        this.AddCssClass("FileInput-React");
    }

    render() {
        const cssStyles: CSS.Properties = {
            "--file-input-color": this.props.Color,
        } as CSS.Properties;

        return (
            <div 
                id={this.GetOwnContainerId()} 
                {...this.props.Attributes}
                className={this.GetOwnCssClass()}
                style={cssStyles}
                onDragOver={this.HandleDragOver}
                onDragLeave={this.HandleDragLeave}
                onClick={this.HandleFileClick}
                onDrop={this.HandleFileDrop}
            >
                <input
                    id={this.GetOwnId()} 
                    type="file"
                    onChange={this.HandleFileChange}
                />
                {this.GetLabel()}
            </div>
        );
    }
    
    private GetLabel = () => {
        const txtProps: LabelProps = {
            Text: this.props.TextToDisplay,
            BoldText: false,
            TextColor: this.props.Color,
            TextSize: this.props.TextToDisplaySize,
            For: "",
            Id: `lblFileInput_${this.props.Id}`,
            Name: `lblFileInput_${this.props.Id}`,
            CssClass: new Array(),
            Attributes: new Map(),
            Events: new Map()
        }

        return (
            <Label {...txtProps}/>
        );
    }
    
    private HandleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (this.AddCssClass("DragOver")) {
            this.forceUpdate();
        }
    }
    
    private HandleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        this.RemoveCssClass("DragOver")
        this.forceUpdate();
    }
    
    private HandleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        this.RemoveCssClass("DragOver")
        this.forceUpdate();
        event.preventDefault();
        event.stopPropagation();

        this.UploadFiles(this.GetFiles(event.dataTransfer));
    }

    private HandleFileClick = (event: React.PointerEvent<HTMLDivElement>) => {
        const test = new Selector(`#${this.GetOwnContainerId()}`).Children("input");
        new Selector(`#${this.GetOwnContainerId()}`).Children("input").Trigger(EnumEvent.Click, undefined);
    }

    private HandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Utils.IsNotEmpty(event.target.files)) {
            this.UploadFiles(Array.from(event.target.files as ArrayLike<File>));
        }
    }
    
    private UploadFiles = (files: Array<File>) => {
        if (Utils.IsNotEmpty(this.props.UploadURL) && Utils.IsNotEmpty(files)) {
            AjaxUtils.PostDataWithUrl(this.props.UploadURL!, undefined, undefined, files, (data: ResultContent) => {

            }, undefined);
        }
    }

    private GetFiles = (dataTransfer: DataTransfer): Array<File> => {
        const files: Array<File> = new Array();

        if (dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === 'file') {
                    const file = item.getAsFile()!;
                    if (this.CheckExtension(file.name)) {
                        files.push(file);
                    } else {
                        this.DisplayExtensionError(file.name);
                    }
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...dataTransfer.files].forEach((file, i) => {
                if (this.CheckExtension(file.name)) {
                    files.push(file);
                } else {
                    this.DisplayExtensionError(file.name);
                }
            });
        }

        return files;
    }

    private DisplayExtensionError = (filename: string) => {
        Utils.DisplayToast(EnumToastType.Warning, "Extension not authorized", `Extension of the file ${filename} isn't authorized`, 5000);
    }

    private CheckExtension = (filename: string): boolean => {
        let result = false;

        if (Utils.IsEmpty(this.props.AuthorizedFileExtensions)) {
            result = true;
        } else {
            this.props.AuthorizedFileExtensions.forEach(extension => {
                if (!result) {
                    result = filename.toLowerCase().endsWith(`.${extension}`);
                }
            });
        }

        return result;
    }
}