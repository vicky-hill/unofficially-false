'use client'

import classNames from 'classnames'
import { useState } from 'react'
import { FiEyeOff, FiEye } from 'react-icons/fi'

interface Input {
    field: any
    form: any
    placeholder: any
}

export default function PasswordInput({ field, form, placeholder }: Input) {
    const [passwordInputType, setPasswordInputType] = useState<'password' | 'text'>('password');
    const error = form.touched[field.name] && form.errors[field.name];

    const inputClasses = classNames('block w-full bg-[#2a2a32] text-neutral-50 text-sm p-[10px] active:outline focus:outline placeholder:text-neutral-500 border border-neutral-700', {
        'outline-neutral-500 active:border-neutral-500 focus:border-neutral-500': !error,
        'outline-red border border-red': error
    });

    return (
        <div className='relative'>
            <input
                className={inputClasses}
                type={passwordInputType}
                placeholder={placeholder}
                {...field}
            />
              {
                passwordInputType === 'password' ? (
                    <FiEye
                        className='absolute cursor-pointer text-neutral-400'
                        size={18}
                        style={{ top: 12, right: 10 }}
                        onClick={() => setPasswordInputType('text')}
                    />
                ) : (
                    <FiEyeOff
                        className='absolute cursor-pointer text-neutral-400'
                        size={18}
                        style={{ top: 12, right: 10 }}
                        onClick={() => setPasswordInputType('password')}
                    />
                )
            }
        </div>

    )
}