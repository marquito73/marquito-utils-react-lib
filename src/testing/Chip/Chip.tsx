import React from "react";
import { ChipProps, Chip } from "../../lib";

export const TestChip = (chipColor: string) => {
    // Chip
    const chipProps: ChipProps = {
        TooltipText: "Typescript language",
        HasBorder: true,
        ChipColor: chipColor,
        Text: "Typescript",
        For: "",
        BoldText: false,
        TextColor: "rgba(94, 234, 212, 1)",
        TextSize: 12,
        Id: "chipTest",
        Name: "chipTest",
        CssClass: new Array(),
        Attributes: new Map(),
        Events: new Map(),
    };

    return (
        <Chip {...chipProps}/>
    );
}