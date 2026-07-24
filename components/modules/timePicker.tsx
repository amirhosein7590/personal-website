"use client"

import { memo, useCallback, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { useTranslations } from 'next-intl';
import { Clock, X } from 'lucide-react';
import { latinHours, persianHours } from '@/constants/ui/calendar/hours';
import { latinMinutes, persianMinute } from '@/constants/ui/calendar/minutes';
import { cn } from '@/lib/utils';
import { isLangPersian } from '@/utils/i18n/isLangPersian';

type TimePickerProps = {
    locale: string,
    triggerClassName?: string,
    value: string,
    onChange: (...event: unknown[]) => void,
    placeholder: string
}

type TimeState = {
    hour: string;
    minute: string;
}


type TimeTypes = "hour" | "minute"
type ChangeTime = (action: TimeTypes, value: string) => void


function TimePicker({
    locale,
    triggerClassName,
    value,
    onChange,
    placeholder
}: TimePickerProps) {
    const [time, setTime] = useState<TimeState>({
        hour: "",
        minute: ""
    });
    const [open, setOpen] = useState<boolean>(false)

    const t = useTranslations("Global");
    const placeHolderGenerator = useCallback(() => {
        if (value) return <span className='text-sm'>{value}</span>
        else return <span className='text-sm text-gray-400'>{placeholder}</span>
    }, [value, placeholder])

    const handleChangeTime: ChangeTime = (action, value) => {
        if (!action || value?.trim()?.length < 1) return
        setTime(prev => ({
            ...prev,
            [action]: value
        }));
    }

    const resetTimeHandler = (event: React.MouseEvent) => {
        event.stopPropagation()
        onChange("");
        setOpen(false)
    }

    const confirmHandler = () => {
        if (time.hour && !time.minute) {
            onChange(`${time.hour}:00`)
        } else if (!time.hour) {
            onChange("")
        } else {
            onChange(`${time.hour}:${time.minute}`)
        }
        setOpen(false)
    }

    const hours = isLangPersian(locale) ? persianHours : latinHours;
    const minutes = isLangPersian(locale) ? persianMinute : latinMinutes

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={
                <Button type='button'
                    className={cn(
                        "relative w-full bg-slate-700/40",
                        "cursor-pointer flex items-center! justify-between!",
                        " border border-bg-slate-900/40 p-4 hover:bg-slate-70/40 rounded-md",
                        triggerClassName

                    )}
                >
                    {placeHolderGenerator()}
                    {value ? (
                        <div
                            className={`absolute ${isLangPersian(locale) ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 z-10 cursor-pointer p-1 hover:opacity-70`}
                            onClick={(e) => resetTimeHandler(e)}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <X color='white' size={18} />
                        </div>
                    ) : (
                        <Clock color='white' className={`absolute ${isLangPersian(locale) ? "left-4" : "right-4"} top-1/2 -translate-y-1/2`} size={18} />
                    )}
                </Button>
            } />

            <PopoverContent>
                <div className="times flex flex-col">
                    <div className="flex justify-between gap-x-3">
                        <div className="hours scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-accent-blue flex flex-col w-1/2 max-h-50 overflow-y-auto">
                            <p className='text-sm text-center mb-2'>{t("Hour")}</p>
                            {hours.map(hour => (
                                <Button
                                    key={hour}
                                    onClick={event => handleChangeTime("hour", event.currentTarget.textContent)} variant="ghost"
                                    className={cn(
                                        "outline-none w-7 mx-auto cursor-pointer",
                                        time.hour == hour ? "bg-accent-blue hover:bg-accent-blue" : "bg-transparent hover:bg-slate-800/40"
                                    )} size="sm">{hour}</Button>
                            ))}
                        </div>

                        <div className="minutes scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-accent-blue flex flex-col w-1/2 max-h-50 overflow-y-auto">
                            <p className='text-sm text-center mb-2'>{t("Minute")}</p>
                            {minutes.map(minute => (
                                <Button
                                    key={minute}
                                    onClick={event => handleChangeTime("minute", event.currentTarget.textContent)} variant="ghost"
                                    className={cn(
                                        "cursor-pointer outline-none w-7 mx-auto",
                                        time.minute == minute ? "bg-accent-blue hover:bg-accent-blue" : "bg-transparent hover:bg-slate-800/40"
                                    )}
                                    size="sm">{minute}</Button>
                            ))}
                        </div>
                    </div>
                    <div className="confirm-cancel-buttons mt-5 border-t pt-5 pb-2 border-b-slate-700/40 flex items-center justify-between">
                        <Button
                            variant="ghost"
                            className="confirm-btn w-1/2 text-center cursor-pointer text-accent-blue hover:text-accent-blue"
                            onClick={confirmHandler}
                        >{t("Confirm")}</Button>
                        <Button
                            variant="ghost"
                            className="w-1/2 text-center cursor-pointer text-red-600 hover:text-red-600"
                            onClick={() => setOpen(false)}
                        >{t("Cancel")}</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover >
    )
}

export default memo(TimePicker)
