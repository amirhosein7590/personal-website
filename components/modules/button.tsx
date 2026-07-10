"use client"

import React, { memo } from "react";

type Props = { children?: React.ReactNode, className?: string, onClick ?: () => void }

function Button({ children, className, onClick }: Props) {

    return (
        <button className={className} onClick={onClick}>{children}</button>
    )
}

export default memo(Button)