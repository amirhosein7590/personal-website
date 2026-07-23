import React from "react"
import { DatePicker } from "@/components/modules/calendar/DatePicker"
import TimePicker from "@/components/modules/timePicker"
import TextArea from "@/components/modules/textArea"
import Input from "@/components/modules/input"

type Field = {
    value: string | Date,
    name: string,
    onChange: (...event: unknown[]) => void,
    type: string,
    className?: string,
    placeholder: string,
    locale: string,
    triggerClassName?: string
}

export function renderFields(field: Field) {
    switch (field.type) {
        case "datePicker": {
            return <DatePicker
                locale={field.locale}
                onChange={field.onChange}
                value={field.value as Date}
                className={field.className}
                triggerClassName={field.triggerClassName}
                placeholder={field.placeholder}
            />
        }
        case "timePicker": {
            return <TimePicker
                locale={field.locale}
                onChange={field.onChange}
                value={field.value as string}
                triggerClassName={field.triggerClassName}
                placeholder={field.placeholder}
            />
        }
        case "textarea": {
            return <TextArea
                name={field.name}
                onChange={field.onChange}
                value={field.value as string}
                className={field.className}
                placeholder={field.placeholder}
            />
        }
        default: {
            return <Input
                type={field.type}
                name={field.name}
                onChange={field.onChange}
                value={field.value as string}
                className={field.className}
                placeholder={field.placeholder}
            />
        }
    }
}