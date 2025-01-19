import { StringBuilder } from "./Stringbuilder";
import * as signalR from "@microsoft/signalr";
import { Utils } from "./Utils";
import { SerializableMap } from "./SerializableMap";
import { EnumEvent, EnumToastType } from "../Enums";
import { manual } from "rimraf";
import { SerializeUtils } from "./SerializeUtils";
import { Selector } from "./Selector";
import { ResultContent } from "./ResultContent";

export class AjaxUtils {
    public static PostData = (rootUrl: string, ajaxName: string, ajaxAction: string, form: string | Selector | undefined, parameters: Record<string, any>, filesUpload: Array<File>, 
        doneCallback: Function, failCallback: Function) => {
            const url = "/home/ajax";

            const constructedUrl = AjaxUtils.GetAjaxConstructedUrl(rootUrl, url, ajaxName, ajaxAction, parameters);
            
            AjaxUtils.PostDataWithUrl(constructedUrl, form, undefined, filesUpload, doneCallback, failCallback);
    }

    public static PostDataWithUrl = (ajaxUrl: string, form: string | Selector | undefined, parameters: Record<string, any> | undefined, filesUpload: Array<File>, 
        doneCallback: Function, failCallback: Function) => {
            // Manage files
            const formData = new FormData();
            
            if (Utils.IsNotEmpty(filesUpload)) {
                for (let i = 0; i < filesUpload.length; i++) {
                    formData.append("file" + i, filesUpload[i]);
                }
            }

            // Form data
            if (Utils.IsNotNull(form) && form !== "") {
                let formElement: HTMLFormElement;
                if (form instanceof Selector) {
                    formElement = form.First() as HTMLFormElement;
                } else {
                    formElement = new Selector(`#${form}`).First() as HTMLFormElement;
                }

                formData.append("form", JSON.stringify(SerializeUtils.GetFormData(formElement).toJSON()));
            }
            // Query parameters
            if (Utils.IsNotEmpty(parameters)) {
                const dataMap: SerializableMap<string, any> = new SerializableMap();

                for (const key in parameters) {
                    const value = parameters[key];

                    dataMap.set(key, value);
                }

                formData.append("parameters", JSON.stringify(dataMap.toJSON()));
            }
            // Need to be replaced by fetch, axios dont work on application use webpack and this library
            fetch(ajaxUrl, {
                method: "POST",
                body: formData,
                redirect: "follow",
            })
                .then((response: Response) => {
                    // If manualy redirect
                    if (response.redirected) {
                        // Redirect manualy browser to new URL
                        window.location.href = response.url;
                        return;
                    }
                    
                    // Return JSON response
                    return response.json();
                })
                .then((response) => {
                    try {
                        const jsonResponse: ResultContent = new ResultContent(response.state, response.title, response.message, response.data);
                        if (jsonResponse.State === "success") {
                            doneCallback?.(response);
                        } else {
                            if (failCallback) {
                                failCallback?.(jsonResponse);
                            } else {
                                Utils.DisplayToast(EnumToastType.Error, "Error happen during request", jsonResponse.Message);
                            }
                        }
                        if (Utils.IsNotNull(form) && form !== "") {
                            if (form instanceof Selector) {
                                form.Trigger(EnumEvent.AjaxReturn, 
                                    {
                                        state: jsonResponse.State, 
                                        response: jsonResponse,
                                    });
                            } else {
                                new Selector(`#${form}`)
                                .Trigger(EnumEvent.AjaxReturn, 
                                    {
                                        state: jsonResponse.State, 
                                        response: jsonResponse,
                                    });
                            }
                        }
                    } finally {
                        // TODO
                    }
                })
                .catch((error) => {
                    try {
                        failCallback?.(error);
                    } catch(err) {
                        //console.error(`Error happens during Ajax's request : `, err);
                        Utils.DisplayToast(EnumToastType.Error, "Error happens during Ajax's request", err as string);
                    }
                });
    }
    public static ChangeLanguage = (rootUrl: string, language: string, 
        failCallback: Function = new Function()) => {
            const url = "/home/language";

            const parameters: Object = {
                "newLanguage": language,
            };

            const constructedUrl = AjaxUtils.GetConstructedUrl(rootUrl, url, parameters);
            
            AjaxUtils.PostDataWithUrl(constructedUrl, "", parameters, new Array(), () => {
                window.location.reload();
            }, failCallback);
    }

    public static GetViewWithUrl = (ajaxUrl: string, doneCallback: Function, failCallback: Function) => {
        const urlSearchParams = new URLSearchParams(ajaxUrl);
        // Need to be replaced by fetch, axios dont work on application use webpack and this library
        fetch(ajaxUrl, {
            method: "POST",
            body: JSON.stringify({
                frag_name: urlSearchParams.get("viewName") as string
            })
        })
            .then((response: Response) => response.text())
            .then((response) => {
                try {
                    doneCallback?.(response);
                } finally {
                    // TODO
                }
            })
            .catch((error) => {
                try {
                    failCallback?.(error);
                } catch(err) {
                    console.error(`Error happens during Ajax's request : `, err);
                }
            });
    }

    private static GetConstructedUrl = (rootUrl: string, url: string, parameters: Record<string, any>) => {
        const sbUrl: StringBuilder = new StringBuilder("");

        sbUrl.Append(url);
        for (const key in parameters) {
            if (!sbUrl.Contains("?")) {
                sbUrl.Append("?").Append(key).Append("=").Append(parameters[key]);
            } else {
                sbUrl.Append("&").Append(key).Append("=").Append(parameters[key]);
            }
        }

        return sbUrl.ToString();
    }
    
    // Get constructed url for ajax
    private static GetAjaxConstructedUrl = (rootUrl: string, url: string, ajaxName: string, ajaxAction: string, parameters: Record<string, any>) => {
        const sbUrl: StringBuilder = new StringBuilder("");

        sbUrl.Append(url).Append("?")
            .Append("ajax_name").Append("=").Append(ajaxName)
            .Append("&")
            .Append("ajax_action").Append("=").Append(ajaxAction);
            
        for (const key in parameters) {
            sbUrl.Append("&").Append(key).Append("=").Append(parameters[key]);
        }

        return sbUrl.ToString();
    }

    /**
     * Get connection with signalR
     * 
     * @param url Url of the hub
     * @param methodName Method name in hub
     * @param callback Callback function when hub send data
     * @returns Connection with signalR
     */
    public static GetSignalRConnection(url: string, methodName: string, callback: Function)/* : HubConnection*/ {
        // Prepare the connection to the signalR hub
        const connection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl(url).build();
        // Execute this function on message reception
        connection.on(methodName, (message) => {
            callback?.(message);
            try {
                callback?.(message);
            } catch(err) {
                console.error(`Error happens when receiving message from ${url} : `, err);
            }
        });
        // Start the connection
        connection.start();

        return connection;
    }
}