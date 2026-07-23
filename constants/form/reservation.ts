import type { InputProps } from "@/utils/registryEntity"
import { z } from "zod"
import { phoneRegex } from "../regex"

export const reservationSchema = z.object({
    fullName: z.string("validation.fullName.required").min(3, "validation.fullName.min"),
    phoneNumber: z.string("validation.phoneNumber.required").regex(phoneRegex, "validation.phoneNumber.invalid"),
    title: z.string("validation.title.required").min(5, "validation.title.min"),
    description: z.string().min(5, "validation.description.min").optional(),
    preferredDate: z.date("validation.preferredDate.required"),
    preferredTime: z.string("validation.preferredTime.required").min(1, "validation.preferredTime.required")
})


export const reservationFields: InputProps[] = [
    {
        type: "text",
        name: "fullName",
        englishPlaceholder: "full name",
        persianPlaceholder: "نام و نام خانوادگی",
        className: "w-full"
    },
    {
        type: "text",
        name: "phoneNumber",
        englishPlaceholder: "phone number",
        persianPlaceholder: "شماره تماس",
        className: "w-full"
    },
    {
        type: "text",
        name: "title",
        englishPlaceholder: "Subject",
        persianPlaceholder: "موضوع",
        className: "w-full"
    },
    {
        type: "text",
        name: "description",
        englishPlaceholder: "Description (optional)",
        persianPlaceholder: "توضیحات (اختیاری)",
        className: "w-full"
    },
    {
        type: "datePicker",
        name: "preferredDate",
        englishPlaceholder: "Select Date",
        persianPlaceholder: "تاریخ را انتخاب کنید",
        triggerClassName: "w-full"
    },
    {
        type: "timePicker",
        name: "preferredTime",
        englishPlaceholder: "Select Time",
        persianPlaceholder: "زمان را انتخاب کنید",
        triggerClassName: "w-full"
    }
]