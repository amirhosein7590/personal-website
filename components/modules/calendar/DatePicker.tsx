"use client"

import React, { useCallback } from "react"
import { Calendar } from "./calendar"
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { Button } from "../button";
import { Calendar1Icon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { isLangPersian } from "@/utils/i18n/isLangPersian";

type PersianCalendarProps = {
    className?: string,
    locale: string,
    triggerClassName?: string,
    value: Date,
    onChange: (...event: unknown[]) => void,
    placeholder: string
}

export function DatePicker({
    className,
    locale,
    triggerClassName,
    value,
    onChange,
    placeholder
}: PersianCalendarProps) {
    const [open, setOpen] = React.useState<boolean>(false) // open , close popover

    const numerals = isLangPersian(locale) ? "arab" : "latn";

    const placeHolderGenerator = useCallback(() => {
        if (value) {
            const selectedDate = new Date(value).toLocaleDateString(isLangPersian(locale) ? "fa-IR" : "en", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })
            return isLangPersian(locale) ? selectedDate.split(" ").reverse().join(" ").replace(",", "") : selectedDate
        } else return placeholder
    }, [value, locale, placeholder])

    const selectTodayHandler = () => {
        const today = new Date(Date.now());
        onChange(today);
        setOpen(false)
    }

    const selectDateHandler = (selectedDate: Date | undefined) => {
        onChange(selectedDate);
        setOpen(false)
    }

    const resetDateHandler = (event: React.MouseEvent) => {
        event.stopPropagation()
        onChange(undefined);
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                render={
                    <Button
                        variant={"outline"}
                        data-empty={!value}
                        className={cn(
                            "relative bg-slate-700/40 cursor-pointer hover:bg-slate-700/40",
                            "w-53 p-4 justify-between text-left font-normal",
                            triggerClassName,
                            !value && "text-gray-400 hover:text-gray-400"
                        )}>
                        {placeHolderGenerator()}
                        {value ? <div
                            className={`absolute ${isLangPersian(locale) ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 z-10 cursor-pointer p-1 hover:opacity-70`}
                            onClick={(e) => resetDateHandler(e)}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <X color='white' size={30} />
                        </div>
                            : <Calendar1Icon />}
                    </Button>} />
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    numerals={numerals}
                    selected={value}
                    onSelect={selectDateHandler}
                    className={className}
                    webLang={locale}
                    selectTodayHandler={selectTodayHandler}
                />
            </PopoverContent>
        </Popover>
    )
}