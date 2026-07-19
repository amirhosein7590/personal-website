import type { ToolCard } from "@/constants/toolsCard"
import Image from "next/image"
import { memo } from "react"
import { cn } from "@/lib/utils"

function ToolCard({ icon, name }: ToolCard) {
    return (
        <div className={cn("tool-card__container w-[calc(50%-12px)]",
            "md:w-[calc(33.33%-12px)]",
            "lg:w-2/16 flex gap-y-4 flex-col shrink-0 p-4 md:p-8 items-center bg-[rgba(17,23,38,0.7)] border-[rgba(255,255,255,0.05)] border backdrop-blur-md hover:bg-slate-800/60 rounded-md"
        )}>
            <Image width={30} height={30} className="w-[20px] h-[20px] md:w-[30px] md:h-[30px]" alt={`${name} icon`} src={icon} />
            <span className="tool-card__tool-name text-sm md:text-[16px]">{name}</span>
        </div>
    )
}

export default memo(ToolCard)