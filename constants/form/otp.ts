import { z } from "zod"
import type { InputProps } from "@/utils/registryEntity"
import { phoneRegex } from "../regex"

export const otpSchema = z.object({
    code: z.string("validation.otp.required").min(6, "validation.otp.min").max(6, "validation.otp.min"),
    phone: z.string("validation.phoneNumber.required").regex(phoneRegex, "validation.phoneNumber.invalid")
})

export const otpFields: InputProps[] = [
    {
        type: "otp",
        name: "code",
        englishPlaceholder: "verification code",
        persianPlaceholder: "کد تایید",
        otpContainerClassName: "mt-10",
        errorClass: "text-center mt-3"
    }
]

export type OtpSchema = z.infer<typeof otpSchema>