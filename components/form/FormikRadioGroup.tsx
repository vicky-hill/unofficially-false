'use client'

import { ErrorMessage, Field } from 'formik'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'

interface Option {
    value: string | number | boolean
    label: string
}

interface FormikRadioGroup {
    name?: string
    required?: boolean
    error?: string
    className?: string
    as?: string
    rows?: number,
    onChange?: (e: RadioChangeEvent) => void
    options: Option[]
    vertical?: boolean
    disabled?: any
    tabIndex?: number
}

export default function FormikRadioGroup({ name, required, error, options, className = '', onChange, vertical, ...rest }: FormikRadioGroup) {
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <Field name={name}>
                {({ field }: any) => (
                    <Radio.Group 
                        {...field}
                        className={vertical ? 'flex flex-col gap-3': ''}
                        onChange={(e) => {
                            field.onChange(e);
                            onChange?.(e);
                        }}
                    >
                        {options.map(({ value, label }) => (
                            <Radio key={JSON.stringify(value)} value={value} {...rest}>
                                {label}
                            </Radio>
                        ))}
                    </Radio.Group>
                )}
            </Field>

            <ErrorMessage
                name={name || ''}
                component="div"
                className="text-xs text-red mt-2 ml-2"
            />
        </div>
    )
}