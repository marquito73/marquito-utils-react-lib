import React from "react";
import { SpinnerProps, Spinner } from "../../lib";


export const TestSpinner = (spinnerIcon: string) => {
    // Spinner
    const spinnerProps: SpinnerProps = {
        SpinnerIcon: spinnerIcon,
        SpinnerIconColor: "red",
        Id: "spinnerTest",
        Name: "spinnerTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    return (
        <Spinner {...spinnerProps}/>
    );
}