import z from "zod";
import { reservationFields, reservationSchema } from "@/constants/form/reservation";

export type Entities = "Reservation";

export type InputProps = {
    type: string,
    name: string,
    englishPlaceholder: string,
    persianPlaceholder: string,
    className?: string,
    triggerClassName?: string,
}

export const registryEntity: Record<Entities, {
    schema: z.ZodObject<any>
    fields: InputProps[]
}> = {
    Reservation: {
        schema: reservationSchema,
        fields: reservationFields
    }
}