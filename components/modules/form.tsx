"use client"

import { registryEntity, Entities } from "@/utils/registryEntity"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@base-ui/react"
import { cn } from "@/lib/utils"
import { isLangPersian } from "@/utils/i18n/isLangPersian"
import { renderFields } from "@/utils/form/renderFields"
import { useTranslations } from "next-intl"

type FormProps = {
    entityName: Entities,
    submitFn: (data: unknown) => void,
    formClass?: string,
    submitBtnClass?: string,
    inputsContainerClass?: string
    submitBtnText: string,
    locale: string,
}

function Form({
    entityName,
    submitFn,
    submitBtnText,
    formClass,
    inputsContainerClass,
    submitBtnClass,
    locale,
}: FormProps) {
    const { fields, schema } = registryEntity[entityName]
    const t = useTranslations("Form")
    const { control, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange",
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: unknown) => {
        console.log(data);
        submitFn(data)
    }

    return (
        <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(
                "inputs-container",
                inputsContainerClass
            )}>
                {fields.map(input => {
                    const placeholder = isLangPersian(locale) ? input.persianPlaceholder : input.englishPlaceholder;
                    const error = errors[input.name]
                    return <div key={input.name}>
                        <Controller
                            control={control}
                            name={input.name}
                            render={({ field }) => renderFields({
                                locale,
                                placeholder,
                                ...input,
                                value: (field.value as string | Date),
                                onChange: field.onChange
                            })}
                        />
                        {error && error?.message && <span className="text-red-500 inline-block mt-2 text-xs">{t(error.message)}</span>}
                    </div>
                })}
            </div>
            <div className="button-container w-full">
                <Button type="submit" className={cn(
                    "text-sm lg:text-[16px] py-3! px-8! bg-transparent border w-full mx-auto mt-5 lg:mt-0 border-white",
                    "rounded-md flex justify-center items-center cursor-pointer",
                    submitBtnClass
                )}>{submitBtnText}</Button>
            </div>
        </form>
    )
}

export default Form