import { Selector } from "./Selector";
import { SerializableMap } from "./SerializableMap";
import { Utils } from "./Utils";

export class SerializeUtils {
    public static SerializeForm = (formElement: HTMLFormElement): string => {
        return JSON.stringify(this.GetFormData(formElement));
    }

    public static GetFormData = (formElement: HTMLFormElement): SerializableMap<string, any> => {
        return new SerializableMap([
            ...this.GetTextBoxs(formElement).entries(),
            ...this.GetTextAreas(formElement).entries(),
            ...this.GetDatePickers(formElement).entries(),
            ...this.GetCheckBoxs(formElement).entries(),
            ...this.GetRadioBoxs(formElement).entries(),
            ...this.GetCheckListBoxs(formElement).entries(),
            ...this.GetRadioListBoxs(formElement).entries(),
        ]);
    }

    private static GetTextBoxs = (formElement: HTMLFormElement): SerializableMap<string, string> => {
        return this.GetTextInputs(formElement, ".TextBox-React");
    }

    private static GetTextAreas = (formElement: HTMLFormElement): SerializableMap<string, string> => {
        return this.GetTextInputs(formElement, ".TextArea-React", "textarea");
    }

    private static GetDatePickers = (formElement: HTMLFormElement): SerializableMap<string, string> => {
        return this.GetTextInputs(formElement, ".DatePicker-React");
    }

    private static GetTextInputs = (formElement: HTMLFormElement, textInputReactClass: string, inputType?: string) : SerializableMap<string, string> => {
        const inputs: SerializableMap<string, string> = new SerializableMap();

        if (Utils.IsEmpty(inputType)) {
            inputType = "input";
        }
        
        new Selector(formElement).Find(textInputReactClass)
            .Where(element => {
                return new Selector(element as HTMLElement).Closest(".Grid-React").Count() === 0;
            })
            .Find(inputType!).ForEach(element => {
                const elem = element as HTMLInputElement;
                inputs.set(elem.id, elem.value);
            });

        return inputs;
    }

    private static GetCheckBoxs = (formElement: HTMLFormElement) : SerializableMap<string, string> => {
        return this.GetCheckRadioBoxs(formElement, ".CheckBox-React");
    }

    private static GetRadioBoxs = (formElement: HTMLFormElement) : SerializableMap<string, string> => {
        return this.GetCheckRadioBoxs(formElement, ".RadioBox-React");
    }

    private static GetCheckRadioBoxs = (formElement: HTMLFormElement, checkRadioInputReactClass: string) : SerializableMap<string, any> => {
        const checkRadios: SerializableMap<string, boolean> = new SerializableMap();
        
        new Selector(formElement).Find(checkRadioInputReactClass)
            .Where(element => {
                return new Selector(element).Closest(".Grid-React").Count() === 0 
                    && new Selector(element).Closest(".ContentBox-React").Count() === 0;
            })
            .Find("input").ForEach(element => {
                const elem = element as HTMLInputElement;
                checkRadios.set(elem.id, elem.checked);
            });

        return checkRadios;
    }

    private static GetCheckListBoxs = (formElement: HTMLFormElement) : SerializableMap<string, any> => {
        return this.GetContentBoxs(formElement, ".CheckListBox-React", ".CheckBox-React");
    }

    private static GetRadioListBoxs = (formElement: HTMLFormElement) : SerializableMap<string, any> => {
        return this.GetContentBoxs(formElement, ".RadioListBox-React", ".RadioBox-React");
    }

    private static GetContentBoxs = (formElement: HTMLFormElement, contentBoxReactClass: string, checkRadioInputReactClass: string) : SerializableMap<string, SerializableMap<string, any>> => {
        const contentBoxs: SerializableMap<string, SerializableMap<string, any>> = new SerializableMap();
        
        new Selector(formElement).Find(contentBoxReactClass)
            .Where(element => {
                return new Selector(element).Closest(".Grid-React").Count() === 0 ;
            })
            .ForEach(element => {
                const elem = element as HTMLDivElement;

                const checkRadioBoxs: SerializableMap<string, any> = new SerializableMap();

                new Selector(elem).Find(checkRadioInputReactClass).Find("input")
                    .ForEach(element => {
                        const subElem = element as HTMLInputElement;
                        checkRadioBoxs.set(subElem.id, subElem.checked);
                    });

                contentBoxs.set(elem.id, checkRadioBoxs);
            });

        return contentBoxs;
    }
}