"use client";

import { memo, startTransition, useCallback } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/utils/ui/concatClasses";

type Props = {
    locale: string;
};

const LANGUAGES = [
    {
        code: "fa",
        label: "فا",
        flag: "🇮🇷",
    },
    {
        code: "en",
        label: "En",
        flag: "🇬🇧",
    },
] as const;

export default memo(function LanguageSwitcher({ locale }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const changeLocale = useCallback(
        (newLocale: string) => {
            if (newLocale === locale) return;

            startTransition(() => {
                router.replace(pathname, {
                    locale: newLocale,
                });
            });
        },
        [locale, pathname, router]
    );

    return (
        <div className="relative">

            <div
                role="group"
                aria-label="Language selector"
                className="relative flex items-center gap-1 rounded-2xl border border-white/10 bg-bg-card/80 p-1.5 backdrop-blur-xl"
                style={{
                    boxShadow:
                        "0 8px 32px rgba(139,92,246,.15), inset 0 1px 0 rgba(255,255,255,.05)",
                }}
            >
                {LANGUAGES.map(({ code, label, flag }) => {

                    const isActive = locale === code;

                    return (
                        <motion.button
                            key={code}
                            type="button"
                            onClick={() => changeLocale(code)}
                            aria-pressed={isActive}
                            whileTap={{ scale: 0.96 }}
                            className={cn(
                                "relative isolate flex min-w-17 flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-3 py-2.5",
                                "select-none whitespace-nowrap",
                                "transition-colors duration-300",
                                "focus-visible:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-purple/50",
                                isActive
                                    ? "text-white"
                                    : "text-white/60 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <>
                                    <motion.div
                                        layoutId="active-language"
                                        className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-accent-purple/30 to-accent-blue/30 backdrop-blur-sm"
                                        transition={{
                                            type: "spring",
                                            stiffness: 420,
                                            damping: 34,
                                        }}
                                    />

                                    <motion.div
                                        layoutId="active-border"
                                        className="absolute inset-0 rounded-xl border-2 border-accent-purple/30"
                                        transition={{
                                            type: "spring",
                                            stiffness: 420,
                                            damping: 34,
                                        }}
                                    />
                                </>
                            )}

                            {!isActive && (
                                <motion.div
                                    className="absolute inset-0 rounded-xl bg-white/5 opacity-0"
                                    whileHover={{
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: .18,
                                    }}
                                />
                            )}

                            <motion.span
                                className="text-base"
                                whileHover={{
                                    rotate: [-10, 10, -8, 8, 0],
                                }}
                                transition={{
                                    duration: .45,
                                }}
                            >
                                {flag}
                            </motion.span>

                            <span className="font-bold tracking-wide">
                                {label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            <div
                className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-accent-purple/20 to-accent-blue/20 blur-xl"
                style={{
                    opacity: .5,
                }}
            />
        </div>
    );
});