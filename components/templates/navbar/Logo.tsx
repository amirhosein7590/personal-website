"use client"

import { CodeXml } from "lucide-react";
import { useTranslations } from "next-intl";
import { memo } from "react"

export default memo(function Logo() {
    const t = useTranslations("HomePage")
    return (
        <div className="flex items-center gap-2 select-none">
            <CodeXml
                size={22}
                className="text-accent-purple"
                strokeWidth={2.3}
            />

            <span className="text-sm font-semibold tracking-wide text-white">
                {t("Navbar.DeveloperName")}
            </span>
        </div>
    );
})