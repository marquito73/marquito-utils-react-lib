import Flags from "country-flag-icons/react/3x2";
import React from "react";

export class FlagUtils {
    public static GetFlagComponent = (flagCode: string) : JSX.Element => {
        const FlagComponent = Flags[flagCode.toUpperCase() as keyof typeof Flags];

        return (
            <FlagComponent
                title={flagCode.toUpperCase()}
            >
            </FlagComponent>
        );
    }
}