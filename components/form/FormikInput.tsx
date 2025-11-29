'use client'

import classNames from 'classnames'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import PasswordInput from './PasswordInput'
import { DatePicker } from 'antd'
import InputMask from 'react-input-mask'

interface Option {
    value: string | number
    name: string
    disabled?: boolean
}

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
    options?: Option[]
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

const activeClasses = 'active:border-neutral-500 active:outline-0 focus:border-neutral-500 focus:outline-0'
const defaultClasses = `placeholder:text-neutral-500 outline-neutral-500 border border-neutral-700 ${activeClasses}`
const noBorder = `border-none ${activeClasses}`

const errorClasses = 'outline-red border border-red'
const disabledClasses = 'text-zinc-500'

function capitalize(string: string) {
    if (!string) return '';
    const withSpaces = string.replace(/([A-Z])/g, ' $1').trim();
    return withSpaces.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export default function FormikInput({ border, name = '', label, noLabel, required, placeholder = '', className = '', type, options, disabled, error, prefix, prefixGap = 10, floatingLabel, ...rest }: Input) {
    const { errors, touched, values, handleChange } = useFormikContext<any>() || {};

    const isNestedError = () => {
        if (!name.includes('.')) return false;

        const arrayName = name.split('.')[0];
        const fieldName = name.split('.')[2];
        const index = Number(name.split('.')[1]);

        const arrayErrors: any = errors[arrayName];
        const arrayTouched: any = touched[arrayName]

        const fieldError = arrayErrors?.length && arrayErrors[index] && arrayErrors[index][fieldName];
        const fieldTouched = arrayTouched?.length && arrayTouched[index] && arrayTouched[index][fieldName];

        return fieldError && fieldTouched;
    }

    const hasError = (name && touched && name in touched && errors && name in errors) || error || isNestedError();

    const inputClasses = classNames(className + ' peer block block w-full bg-[#2a2a32] text-neutral-50 p-[10px] placeholder:text-neutral-500', {
        [defaultClasses]: !border && !hasError && !disabled,
        [noBorder]: border === 'none' && !hasError && !disabled,
        [errorClasses]: hasError,
        [disabledClasses]: disabled,
        'h-[40px]': type !== 'textarea',
        'h-[125px]': type === 'textarea'
    });

    const preventMinus = (e: any) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };

    const round = (n: any, d: any) => Number(Math.round(Number(n + "e" + d)) + "e-" + d)

    const DefaultInput = (
        <div className={`relative ${floatingLabel ? 'mt-2' : ''}`}>
            {prefix && <p className='absolute font-500 top-[25%] left-2 text-sm'>{prefix}</p>}
            <Field
                className={inputClasses}
                name={name}
                placeholder={floatingLabel ? ' ' : placeholder ? placeholder : `Enter ${capitalize(name).toLocaleLowerCase()}`}
                {...(type === 'password' ? { component: PasswordInput } : {})}
                {...(type === 'textarea' ? { as: 'textarea', rows: 3 } : {})}
                type={type !== 'textarea' ? (type || 'text') : undefined}
                onWheel={(e: any) => e.target.blur()}
                aria-label={!label && name}
                disabled={disabled}
                style={prefixGap ? { paddingLeft: prefixGap } : rest.style}
                {...rest}
            />

            {
                label && floatingLabel && (
                    <label htmlFor={name} className={classNames(
                        'absolute px-1 left-3 origin-left text-sm transform transition-all duration-150 pointer-events-none text-zinc-500',
                        {
                            // When input has value, keep label floating
                            'top-[7px] left-1 text-xs text-[#273443] -translate-y-4 font-600 bg-linear-to-b from-white from-60% to-[#F5F5F5] to-5%': values[name],
                            // Default state and transitions when no value
                            'top-2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-[7px] peer-focus:left-1 peer-focus:text-xs peer-focus:text-[#273443] peer-focus:-translate-y-4 peer-focus:font-600 peer-focus:bg-linear-to-b from-white from-60% to-[#F5F5F5] to-5%': !values[name]
                        }
                    )}>
                        {label}
                        {required && <b className='text-red text-xs ml-1.5'>*</b>}
                    </label>

                )
            }
        </div>
    )

    const DateInput = (
        <DatePicker
            className={inputClasses}
            placeholder={placeholder}
            format='MM-DD-YYYY'
            disabled={disabled}
            {...rest}
        />
    )

    const OptionsInput = options && (
        <Field
            className={inputClasses}
            as="select"
            name={name}
            aria-label={!label && name}
            disabled={disabled}
            {...rest}
        >
            {placeholder && (<option disabled selected value="">{placeholder}</option>)}
            {options.map((option, i) => (
                <option disabled={option.disabled} key={i} value={option.value}>{option.name}</option>
            ))}
        </Field>
    )

    const PhoneInput = (
        <InputMask
            mask="(999) 999-9999"
            maskChar=""
            name={name}
            value={values[name]}
            onChange={handleChange}
            disabled={disabled}
            {...rest}
        >
            {
                () => (
                    <Field
                        className={inputClasses}
                        name={name}
                        placeholder={placeholder}
                        type='text'
                        onWheel={(e: any) => e.target.blur()}
                        aria-label={!label && name}
                        disabled={disabled}
                        {...rest}
                    />
                )
            }
        </InputMask>
    )

    const DollarInput = (
        <div className='relative'>
            <p className='absolute font-500 top-[20%] left-2'>$</p>
            <Field
                className={inputClasses}
                style={{ paddingLeft: 20 }}
                name={name}
                placeholder={placeholder}
                type='number'
                onWheel={(e: any) => e.target.blur()}
                aria-label={!label && name}
                disabled={disabled}
                onKeyDown={preventMinus}
                onBlur={(e: any) => {
                    if (!e.target.value || e.target.value === '0' || e.target.value === '0.0' || e.target.value.startsWith('0.00')) {
                        e.target.value = '';
                    } else {
                        e.target.value = round(Math.abs(e.target.value), 2).toFixed(2);
                        handleChange(e);
                    }
                }}
                {...rest}
            />
        </div>
    )

    return (
        <div className={className}>
            {!noLabel && !floatingLabel && (
                <label htmlFor={name} className='text-neutral-200 font-600 text-sm block pb-2 pl-1'>
                    {label ? label : capitalize(name)}
                    {required && <b className='text-red text-xs ml-1.5'>*</b>}
                </label>
            )}

            {
                options ? OptionsInput :
                    type === 'date' ? DateInput :
                        type === 'phone' ? PhoneInput :
                            type === 'dollar' ? DollarInput :
                                DefaultInput
            }

            <ErrorMessage
                name={name || ''}
                component="div"
                className="text-xs text-red mt-2 ml-2"
            />
        </div>
    )
}