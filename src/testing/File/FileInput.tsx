import React from "react";
import { FileInputProps, FileInput } from "../../lib";

export const TestFileInput = () => {
    // File input
    const fileInputProps: FileInputProps = {
        TextToDisplay: "Drag and drop files here",
        Color: "deepskyblue",
        TextToDisplaySize: 20,
        Id: "fileInputTest",
        Name: "fileInputTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
        AuthorizedFileExtensions: new Array(),
    };

    fileInputProps.AuthorizedFileExtensions.push("png");

    return (
        <FileInput {...fileInputProps}/>
    );
}