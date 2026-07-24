import { reservationFields, reservationSchema } from "@/constants/form/reservation";
import { otpFields, otpSchema } from "@/constants/form/otp"

export type InputProps = {
    type: string,
    name: string,
    englishPlaceholder: string,
    persianPlaceholder: string,
    className?: string,
    triggerClassName?: string,
    otpContainerClassName?: string,
    errorClass ?: string
}


export const registryEntity = {
    Reservation: {
        schema: reservationSchema,
        fields: reservationFields
    },
    otp: {
        fields: otpFields,
        schema: otpSchema
    }
} as const

export type EntityNames = keyof typeof registryEntity;
