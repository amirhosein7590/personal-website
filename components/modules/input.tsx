"use client"

import { cn } from "@/lib/utils"
import { memo } from "react"

type InputProps = {
    value?: string,
    onChange: (...event: unknown[]) => void,
    name: string,
    className?: string,
    placeholder?: string,
    type: string
}

function Input({
    value,
    onChange,
    className,
    ...props
}: InputProps) {

    return (
        <input
            value={value ?? ""}
            onChange={event => onChange(event.target.value)}
            className={cn(
                "relative bg-slate-700/40 border rounded-sm outline-none placeholder-gray-400 border-slate-800/40 p-4 text-sm",
                className
            )}
            data-rtl-listener="true"
            {...props}
        />
    )
}

export default memo(Input)