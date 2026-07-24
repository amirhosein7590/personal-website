"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/lib/utils"
import { MinusIcon } from "lucide-react"

type InputOtpProps = {
  isInvalid: boolean,
  maxLength: number,
  containerClassName?: string,
  value: string,
  onChange: (...event: unknown[]) => void
}

const InputOTP = React.memo(({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) => {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
})

const InputOTPGroup = React.memo(({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      dir="ltr"
      data-slot="input-otp-group"
      className={cn(
        "flex items-center justify-center w-full gap-x-4",
        className
      )}
      {...props}
    />
  )
})

const InputOTPSlot = React.memo(({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-8 items-center justify-center border border-slate-500/40 rounded-md *:border-slate-500/40 text-sm transition-all outline-none   aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})

const InputOTPSeparator = React.memo(({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon
      />
    </div>
  )
})

export const InputOtp = React.memo((
  { isInvalid,
    maxLength,
    containerClassName,
    value,
    onChange
  }: InputOtpProps) => {
  return (
    <InputOTP
      value={value}
      onChange={onChange}
      pattern="^[0-9]+$"
      containerClassName={containerClassName}
      maxLength={maxLength}>
      <InputOTPGroup>
        {Array.from({ length: maxLength }).map((_, index) => (
          <div key={index}>
            {isInvalid ?
              <InputOTPSlot aria-invalid index={index} />
              : <InputOTPSlot index={index} />}
          </div>
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
})

export default InputOtp