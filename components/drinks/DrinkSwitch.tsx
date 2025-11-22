'use client'

import { Switch } from 'antd'


interface DrinkSwitch {
    onChange: any
    name: 'happyHour' | 'onMenu' | 'bowl'
    values: {
        happyHour: boolean
        onMenu: boolean
        bowl: boolean
    }
}

export default function DrinkSwitch({ values, onChange, name }: DrinkSwitch) {

    return (
        <div>
            <Switch value={values[name]} className='w-8' onChange={(name, e: any) => onChange(name, e)} />
            <span className='ml-3'>Happy Hour</span>
        </div>
    )
}