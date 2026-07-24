import React from "react"
import { DatePicker } from "@/components/modules/calendar/DatePicker"
import TimePicker from "@/components/modules/timePicker"
import TextArea from "@/components/modules/textArea"
import Input from "@/components/modules/input"
import InputOtp from "@/components/modules/inputOtp"
import { FieldError } from "react-hook-form"

type Field = {
    value: string | Date,
    name: string,
    onChange: (...event: unknown[]) => void,
    type: string,
    className?: string,
    placeholder: string,
    locale: string,
    triggerClassName?: string,
    error: FieldError | undefined,
    otpContainerClassName ?: string
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
        case "otp": {
            const isInvalid = field.error?.message ? true : false
            return <InputOtp
                maxLength={6}
                isInvalid={isInvalid}
                value={field.value as string}
                onChange={field.onChange}
                containerClassName={field.otpContainerClassName}
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