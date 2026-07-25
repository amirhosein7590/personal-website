"use client"

import { registryEntity, EntityNames } from "@/utils/registryEntity"
import { useForm, Controller, FieldError } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@base-ui/react"
import { cn } from "@/lib/utils"
import { isLangPersian } from "@/utils/i18n/isLangPersian"
import { renderFields } from "@/utils/form/renderFields"
import { useTranslations } from "next-intl"
import z from "zod"
import { memo, useEffect } from "react"
import Spinner from "./spinner"
import { toast } from "sonner"

type GetEntityData<T extends EntityNames> = z.infer<
    (typeof registryEntity)[T]['schema']
>;

type SubmitRes = Promise<{ message: string } & Record<string, any>> | void

type FormProps<T extends EntityNames> = {
    entityName: T,
    submitFn: (data: GetEntityData<T>) => SubmitRes,
    afterSubmitFn?: (data: GetEntityData<T>, res?: Awaited<SubmitRes>) => void,
    formClass?: string,
    submitBtnClass?: string,
    inputsContainerClass?: string
    submitBtnText: string,
    locale: string,
    isPending: boolean,
    defaultValues?: GetEntityData<T>
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
    afterSubmitFn,
    defaultValues
}: FormProps<T>) {

    const entity = registryEntity[entityName];
    const { fields, schema } = entity;

    type FormData = z.infer<typeof schema>
    const t = useTranslations("Form")
    const { control,
        formState: { errors, submitCount },
        reset,
        handleSubmit,
    } = useForm<FormData>({
        mode: "onChange",
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues)
        }

        return () => {
            reset({})
        }

    }, [])

    useEffect(() => {
        console.log("errors => ", errors);
    }, [errors, submitCount])


    const onSubmit = async (data: FormData) => {

        if (afterSubmitFn) {
            try {
                const res = await (submitFn as (data: FormData) => SubmitRes)(data);
                (afterSubmitFn as (data: FormData , res ?: Awaited<SubmitRes>) => void)(data,res)
                if (res) {
                    toast.success(res.message)
                }
            } catch (error: any) {
                toast.error(error.message)
            }
            return
        }
        (submitFn as (data: FormData) => SubmitRes)(data)
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
                    const error = errors[fieldName] as FieldError;
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
                        {error && error?.message && <span className={cn(
                            "text-red-500 inline-block mt-2 text-xs w-full",
                            input.errorClass ?? ""
                        )}>{t(error.message)}</span>}
                    </div>
                })}
            </div>
            <div className="button-container w-full">
                <Button type="submit" className={cn(
                    "py-3! px-8! bg-transparent border w-full mx-auto mt-5 border-white",
                    "rounded-md flex justify-center items-center cursor-pointer",
                    submitBtnClass
                )}>{isPending ? <Spinner color="white" /> : submitBtnText}</Button>
            </div>
        </form>
    )
}

const MemoForm = memo(Form) as typeof Form;
export default MemoForm;