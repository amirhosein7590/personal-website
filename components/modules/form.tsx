"use client"

import { registryEntity, EntityNames } from "@/utils/registryEntity"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@base-ui/react"
import { cn } from "@/lib/utils"
import { isLangPersian } from "@/utils/i18n/isLangPersian"
import { renderFields } from "@/utils/form/renderFields"
import { useTranslations } from "next-intl"
import z from "zod"
import { memo } from "react"

type GetEntityData<T extends EntityNames> = z.infer<
    (typeof registryEntity)[T]['schema']
>;

type FormProps<T extends EntityNames> = {
    entityName: T,
    submitFn: (data: GetEntityData<T>) => void,
    afterSubmitFn?: (data: GetEntityData<T>) => void,
    formClass?: string,
    submitBtnClass?: string,
    inputsContainerClass?: string
    submitBtnText: string,
    locale: string,
    isPending: boolean
}

function Form<T extends EntityNames>({
    entityName,
    submitFn,
    submitBtnText,
    formClass,
    inputsContainerClass,
    submitBtnClass,
    locale,
    isPending = false,
    afterSubmitFn
}: FormProps<T>) {

    const entity = registryEntity[entityName];
    const { fields, schema } = entity;

    type FormData = z.infer<typeof schema>
    const t = useTranslations("Form")
    const { control, formState: { errors }, handleSubmit } = useForm<FormData>({
        mode: "onChange",
        resolver: zodResolver(schema)
    })


    const onSubmit = async (data: FormData) => {
        if (afterSubmitFn) {
            await (submitFn as (data: FormData) => void)(data);
            (afterSubmitFn as (data: FormData) => void)(data)
            return
        }
        (submitFn as (data: FormData) => void)(data)
    }

    return (
        <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(
                "inputs-container",
                inputsContainerClass
            )}>
                {fields.map(input => {
                    const placeholder = isLangPersian(locale) ? input.persianPlaceholder : input.englishPlaceholder;
                    const fieldName = input.name as keyof FormData;
                    const error = errors[fieldName];
                    return <div key={input.name}>
                        <Controller
                            control={control}
                            name={fieldName}
                            render={({ field }) => renderFields({
                                locale,
                                placeholder,
                                ...input,
                                value: (field.value as string | Date),
                                onChange: field.onChange,
                                error: error
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
                )}>{isPending ? "در حال ارسال" : submitBtnText}</Button>
            </div>
        </form>
    )
}

export default memo(Form)