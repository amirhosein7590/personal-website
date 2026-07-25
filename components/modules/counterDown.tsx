"use client";

import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Spinner from "./spinner";
import z from "zod";
import { reservationSchema } from "@/constants/form/reservation";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { isLangPersian } from "@/utils/i18n/isLangPersian";

interface CountdownTimerProps {
    duration: number;
    onComplete?: () => void;
    resendText: string;
    className?: string;
    bodyReq: z.infer<typeof reservationSchema>,
    locale: string
}

function CountdownTimer({
    duration,
    onComplete,
    resendText,
    className,
    bodyReq,
    locale
}: CountdownTimerProps) {
    const t = useTranslations("Global");
    const isWebLangPersian = isLangPersian(locale)
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(true);
    const { mutate, isPending: isResending } = trpc.reservation.create.useMutation()

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    const progress = (timeLeft / duration) * 100;

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = prev - 100;
                if (newTime <= 0) {
                    setIsRunning(false);
                    onComplete?.();
                    return 0;
                }
                return newTime;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, onComplete]);

    const resetTimer = (newDuration?: number) => {
        setTimeLeft(newDuration ?? duration);
        setIsRunning(true);
    };

    const handleResend = () => {
        console.log("ine here");
        mutate(bodyReq, {
            onSuccess: response => {
                toast.success(response.message)
                resetTimer();
            },
            onError: error => {
                toast.error(error.message)
            }
        });
    };

    return (
        <div dir="ltr" className={cn("flex flex-col items-center gap-3", className)}>
            <AnimatePresence mode="wait">
                {isRunning && timeLeft > 0 ? (
                    <motion.div
                        key="timer"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="relative flex items-center gap-1"
                    >
                        <div className={`relative h-12 w-12 ${isWebLangPersian ? "order-2" : "order-1"}`}>
                            <svg className="h-12 w-12 -rotate-90 transform">
                                <circle
                                    className="text-muted-foreground/20"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="20"
                                    cx="24"
                                    cy="24"
                                />
                                <motion.circle
                                    className="text-primary"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="20"
                                    cx="24"
                                    cy="24"
                                    initial={{ strokeDasharray: "125.6", strokeDashoffset: 0 }}
                                    animate={{
                                        strokeDashoffset: 125.6 - (125.6 * progress) / 100,
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium tabular-nums">
                                {String(seconds).padStart(2, "0")}
                            </span>
                        </div>

                        {minutes > 0 && (
                            <>
                                <span className={`text-sm font-medium tabular-nums `}>
                                    {String(minutes).padStart(2, "0")}
                                </span>
                                :
                            </>
                        )}
                    </motion.div>
                ) : (
                    <motion.button
                        key="resend"
                        type="button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleResend}
                        disabled={isResending}
                        className={cn(
                            "flex items-center cursor-pointer gap-2 rounded-md py-1 px-4 text-sm font-medium transition-all",
                            "text-blue-500 shadow-sm",
                            "hover:text-primary/90",
                            "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        )}
                    >
                        {isResending ? (
                            <>
                                <Spinner />
                            </>
                        ) : (
                            <>
                                {resendText}
                            </>
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {isRunning && timeLeft > 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground"
                >
                    {minutes > 0
                        ? `${minutes} ${t("Minute")} ${t("And")} ${seconds} ${t("Second")} ${t("ToResend")}`
                        : `${seconds} ${t("Second")} ${t("ToResend")}`}
                </motion.p>
            )}
        </div>
    );
}

export default memo(CountdownTimer)