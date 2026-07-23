import { cn } from "@/lib/utils"
import { memo } from "react"

type TextAreaProps = {
    value: string,
    onChange: (...event: unknown[]) => void,
    name: string,
    className?: string,
    placeholder?: string,
}


function TextArea({
    value,
    onChange,
    className,
    ...props
}: TextAreaProps) {
    return (
        <textarea
            value={value}
            onChange={event => onChange(event.target.value)}
            className={cn(
                "relative bg-slate-700/40 border outline-none border-slate-800/40 py-2 px-4",
                className
            )}

            {...props}
        />
    )
}

export default memo(TextArea)