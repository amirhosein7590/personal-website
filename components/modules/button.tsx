"use client"

import React, { memo } from "react";
import { Link } from "@/i18n/navigation";

type Props = {
    children?: React.ReactNode,
    className?: string,
    onClick?: () => void,
    href?: string,
    target?: string
}

function Button({ children, className, onClick, href, target }: Props) {

    return href ? <Link href={href} target={target} className={className}>{children}</Link> : <button className={className} onClick={onClick}>{children}</button>
}

export default memo(Button)