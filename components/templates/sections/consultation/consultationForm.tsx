"use client"

import Form from "@/components/modules/form";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { trpc } from "@/trpc/client"
import { useContext } from "react";
import { ModalCtx } from "@/providers/ModalProvider";
import { type OtpSchema } from "@/constants/form/otp"
import { type ReservationSchema } from "@/constants/form/reservation";
import { toast } from "sonner"
import CountdownTimer from "@/components/modules/counterDown";

function consultationForm({ locale }: { locale: string }) {
    const modal = useContext(ModalCtx);
    const t = useTranslations("HomePage");
    const tg = useTranslations("Global")
    const { mutateAsync, isPending: createRervationPending } = trpc.reservation.create.useMutation()
    const { mutate, isPending: verifiyReservationPending } = trpc.reservation.verify.useMutation()

    const showModalHandler = (response: ReservationSchema) => {
        modal?.showModal({
            title: tg("VerificationCode"),

            content: ({ closeModal, id }) => {

                const submit = (data: OtpSchema) => {

                    mutate(data, {
                        onSuccess: response => {
                            toast.success(response.message)
                            closeModal(id)
                        },
                        onError: error => {
                            toast.error(error.message);
                        },
                    })
                }

                return (
                    <div className="flex flex-col">
                        <Form
                            entityName="otp"
                            submitFn={submit}
                            isPending={verifiyReservationPending}
                            submitBtnText={tg("Confirm")}
                            locale={locale}
                            defaultValues={{ code: "", phone: response.phoneNumber }}
                            inputsContainerClass="-mt-5"
                            submitBtnClass="!py-1 text-sm w-10/12 mx-auto mt-5"
                        >
                            <CountdownTimer
                                bodyReq={response}
                                className="mt-5"
                                duration={120000}
                                resendText={tg("ResentOtp")}
                                locale={locale}
                            />
                        </Form>
                    </div>
                )
            }
            ,
            size: "sm",
            disablePointerDismissal: true
        })
    }

    return (
        <div className="reservation__container w-full mb-20 mt-10 lg:mt-0">
            <Form
                entityName="Reservation"
                submitBtnText={t("Reservation.ConsultationReserve")}
                submitFn={(data) => mutateAsync(data)}
                afterSubmitFn={showModalHandler}
                formClass="w-full"
                inputsContainerClass="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mb-5"
                locale={locale}
                isPending={createRervationPending}
            />
        </div>
    )
}

export default memo(consultationForm)