'use client'

import classNames from 'classnames'

interface Input {
    name?: string
    label?: string | null
    noLabel?: boolean
    floatingLabel?: boolean
    placeholder?: string
    required?: boolean
    type?: 'text' | 'textarea' | 'password' | 'number' | 'dollar' | 'email' | 'select' | 'date' | 'phone'
    className?: string
    as?: string
    rows?: number,
    onChange?: any
    readOnly?: boolean,
    value?: any
    border?: 'none'
    onBlur?: any
    disabled?: boolean
    title?: string
    error?: string | undefined
    tabIndex?: number
    defaultValue?: any
    prefix?: string
    prefixGap?: number
    style?: any
    autoComplete?: any
}

const activeClasses = 'active:border-neutral-600 active:outline-0 focus:border-neutral-600 focus:outline-0'
const defaultClasses = `placeholder:text-neutral-200 outline-neutral-600 border border-[#55556d] rounded-xl text-neutral-50 text-[14px] ${activeClasses}`
const noBorder = `border-none ${activeClasses}`
const disabledClasses = 'text-zinc-500'

export default function Input({ type, border, disabled, className = '', ...rest }: Input) {

    const inputClasses = classNames(className + ' peer block block w-full bg-transparent text-sm p-[10px] placeholder:text-neutral-500', {
        [defaultClasses]: !border && !disabled,
        [noBorder]: border === 'none' && !disabled,
        [disabledClasses]: disabled,
        'h-[40px]': type !== 'textarea',
        'h-[125px]': type === 'textarea'
    });

    return (
        <input placeholder='Search' className={inputClasses} {...rest} />
    )
}