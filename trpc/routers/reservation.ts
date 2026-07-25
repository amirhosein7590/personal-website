import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../init";
import { reservationSchema } from "@/constants/form/reservation";
import { otpSchema } from "@/constants/form/otp";
import { getTranslations } from "next-intl/server";
import sendSms from "@/utils/server/sendSms";
import crypto from "crypto"

const reservationRouter = router({

    create:
        publicProcedure.input(reservationSchema)
            .mutation(async ({ input, ctx }) => {
                // 0. check current language 

                const t = await getTranslations({
                    locale: ctx.locale,
                    namespace: "ServerResponse"
                })

                try {

                    // 1. check if user have 5 pending reservation or more stop process

                    const userReservations = await ctx.prisma.reservation.findMany({
                        where: {
                            status: "PENDING",
                            user: {
                                phone: input.phoneNumber
                            },
                        }
                    })

                    if (userReservations.length >= 5) {
                        throw new TRPCError({
                            code: "BAD_REQUEST",
                            message: t("Failed.TooManyPendingReservation"),
                            cause: { success: false }
                        })
                    }

                    // 2. find and check otp

                    const otp = await ctx.prisma.otp.findFirst({
                        where: { phone: input.phoneNumber }
                    });

                    if (otp) {
                        // 2.1 check for exist otp and does not expire yet or not

                        const otpExpTime = Number(otp.expiresAt)
                        if (otpExpTime > Date.now()) {
                            throw new TRPCError({
                                code: "BAD_REQUEST",
                                message: t("Failed.OtpAvailable"),
                                cause: { success: false }
                            })
                        } else {
                            // 2.2 if otp exist and is expired , delete it and continue process

                            await ctx.prisma.otp.delete({
                                where: { id: otp.id, phone: input.phoneNumber }
                            })
                        }
                    }

                    // 2.3 If everything was correct regarding the otp validation, we will generate a new otp and send it.

                    const code = String(crypto.randomInt(999999))
                    const codeExpTime = Number(process.env.OTP_EXPIRE_TIME)
                    const smsResult = await sendSms({
                        patternKey: process.env.OTP_PATTERN_KEY as string,
                        phoneNumber: input.phoneNumber,
                        param1: code
                    })

                    if (!smsResult.Success) {
                        // 2.4 If there is a problem sending the OTP to the user number (such as unavailability of the service), stop the process.

                        throw new TRPCError({
                            code: "SERVICE_UNAVAILABLE",
                            message: t("Failed.SendOtp"),
                            cause: { success: false }
                        })
                    }
                    await ctx.prisma.otp.create({
                        data: {
                            code,
                            expiresAt: String(codeExpTime),
                            phone: input.phoneNumber
                        }
                    })

                    // 3. if user exist then will create a new reservation for him/her

                    let user = await ctx.prisma.user.findUnique({
                        where: {
                            phone: input.phoneNumber
                        }
                    })

                    if (!user) {
                        // 3.1 if user was not exist , then will create a new user and continue creating reservation process

                        user = await ctx.prisma.user.create({
                            data: {
                                fullName: input.fullName,
                                phone: input.phoneNumber
                            }
                        })
                    }

                    await ctx.prisma.reservation.create({
                        data: {
                            title: input.title,
                            description: input.description ?? "",
                            preferredDate: new Date(input.preferredDate),
                            preferredTime: input.preferredTime,
                            status: "UNAUTHORIZED",
                            userId: user.id
                        }
                    })

                    return {
                        message: t("Success.SendOtp"),
                        cause: { success: true }
                    }

                } catch (error) {
                    console.log(error);

                    throw new TRPCError({
                        code: "SERVICE_UNAVAILABLE",
                        message: t("Failed.ServerError"),
                        cause: { success: false }
                    })
                }
            }),
    verify: publicProcedure.input(otpSchema)
        .mutation(async ({ input, ctx }) => {
            // 0. check current language

            const t = await getTranslations({
                locale: ctx.locale,
                namespace: "ServerResponse"
            })

            try {
                // 1. find the sent otp

                const otp = await ctx.prisma.otp.findFirst({
                    where: { phone: input.phone }
                })
                const otpExpTime = Number(otp?.expiresAt)

                // 1.1 if otp is not exist or expired , then stop the process

                if (!otp || otpExpTime < Date.now()) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: t("Failed.OtpExpired"),
                        cause: { success: false }
                    })
                }

                // 1.2 validation the sent otp

                if (input.code != otp.code) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: t("Failed.OtpIsInCorrect"),
                        cause: { success: false }
                    })
                }

                // 2 find the unauthorized reservation and change status to pending

                const reservation = await ctx.prisma.reservation.findFirst({
                    where: {
                        user: {
                            phone: otp.phone
                        },
                        status: "UNAUTHORIZED",
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                })

                if (reservation) {
                    await ctx.prisma.reservation.update({
                        where: {
                            id: reservation.id
                        },
                        data: {
                            status: "PENDING"
                        }
                    })

                    return {
                        message: t("Success.ConsultationBooked"),
                        cause: { success: true }
                    }
                }

                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: t("Failed.ErrorInBooking"),
                    cause: { success: false }
                })

            } catch (error) {
                console.log(error);
                throw new TRPCError({
                    code: "SERVICE_UNAVAILABLE",
                    message: t("Failed.ServerError"),
                    cause: { success: false }
                })
            }
        })
})

export default reservationRouter