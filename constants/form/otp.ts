import { z } from "zod"
import type { InputProps } from "@/utils/registryEntity"

export const otpSchema = z.object({
    code: z.string("validation.otp.required").min(6, "validation.otp.min").max(6, "validation.otp.min")
})

export const otpFields: InputProps[] = [
    {
        type: "otp",
        name: "code",
        englishPlaceholder: "verification code",
        persianPlaceholder: "کد تایید",
        otpContainerClassName: "mt-10"
    }
]