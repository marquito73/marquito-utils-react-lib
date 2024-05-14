import React from "react";
import { ToastManagerProps, ToastManager } from "../../lib";


export const TestToastManager = () => {
    // ToastManager
    const toastManagerProps: ToastManagerProps = {
        Id: "toastManager",
        Name: "toastManager",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map()
    };

    return (
        <ToastManager {...toastManagerProps}/>
    );
}