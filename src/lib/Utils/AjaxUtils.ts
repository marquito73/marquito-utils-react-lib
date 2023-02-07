import { StringBuilder } from "./Stringbuilder";

export class AjaxUtils {
    public static PostData = (rootUrl: string, ajaxName: string, ajaxAction: string, parameters: Object, filesUpload: Array<File>, 
        doneCallback: Function, failCallback: Function, loadingText: string) => {
            const url = "/home/ajax";

            const constructedUrl = AjaxUtils.GetConstructedUrl(rootUrl, url, ajaxName, ajaxAction, parameters);
            
            AjaxUtils.PostDataWithUrl(constructedUrl, parameters, filesUpload, doneCallback, failCallback, loadingText);
    }

    public static PostDataWithUrl = (ajaxUrl: string, parameters: Object, filesUpload: Array<File>, 
        doneCallback: Function, failCallback: Function, loadingText: string) => {
            const urlSearchParams = new URLSearchParams(ajaxUrl);

            //document.loading.show(loadingText);

            // Manage files
            const formData = new FormData();
            
            if (filesUpload.length > 0) {
                for (var i = 0; i < filesUpload.length; i++) {
                    formData.append("file" + i, filesUpload[i]);
                }
            }

            // TODO Need to be replaced by fetch, axios dont work on application use webpack and this library
            

            fetch(ajaxUrl, {
                method: "POST",
                body: formData
            })
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
                    } finally {
                        console.error(`Error happens during Ajax's request : `, error);
                    }
                });

            // axios.post(ajaxUrl, formData)
            //     .then((response) => {
            //         try {
            //             doneCallback?.(response);
            //         } finally {
            //             //document.loading.hide();
            //         }
            //     })
            //     .catch((error) => {
            //         //document.loading.hide();
            //         try {
            //             failCallback?.(error);
            //         } finally {
            //             console.error(`Error happens during Ajax's request : `, error);
            //         }
            //     });
    }
    
    // Get constructed url for ajax
    private static GetConstructedUrl = (rootUrl: string, url: string, ajaxName: string, ajaxAction: string, parameters: Object) => {
        const sbUrl: StringBuilder = new StringBuilder("");

        sbUrl.Append(rootUrl).Append(url).Append("?")
            .Append("ajax_name").Append("=").Append(ajaxName)
            .Append("&")
            .Append("ajax_action").Append("=").Append(ajaxAction)

        const keys = Object.keys(parameters);
        const values = Object.values(parameters);

        const len = keys.length;

        for (let i = 0; i < len; i++) {
            sbUrl.Append("&").Append(keys[i]).Append("=").Append(values[i]);
        }

        return sbUrl.ToString();
    }
}