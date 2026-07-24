import { reservationFields, reservationSchema } from "@/constants/form/reservation";


export type InputProps = {
    type: string,
    name: string,
    englishPlaceholder: string,
    persianPlaceholder: string,
    className?: string,
    triggerClassName?: string,
}


export const registryEntity = {
    Reservation: {
        schema: reservationSchema,
        fields: reservationFields
    }
} as const

export type EntityNames = keyof typeof registryEntity;
