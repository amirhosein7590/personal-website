"use client"

import Form from "@/components/modules/form";
import { useTranslations } from "next-intl";
import { memo } from "react";

function Reservation({ locale }: { locale: string }) {
    const submitHandler = (data: unknown) => {
        console.log("data => ", data);
    }

    const t = useTranslations("HomePage")

    return <Form
        entityName="Reservation"
        submitBtnText={t("Reservation.ConsultationReserve")}
        submitFn={submitHandler}
        inputsContainerClass="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mb-5"
        locale={locale} />
}

export default memo(Reservation)