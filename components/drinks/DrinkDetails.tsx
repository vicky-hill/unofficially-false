'use client'

import { IoClose } from 'react-icons/io5'
import {Divider, Drawer, Switch, Button} from 'antd'
import { Drink } from '@/types/drink.types'
import DrinkImage from './DrinkImage'
import { useSettings } from '@/redux/slices/settings.slice'
import { useCurrentUser } from '@/redux/slices/user.slice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { updateDrink } from '@/redux/slices/drinks.slice'


interface DrinkDetails {
    drink: Drink | null
    open: boolean
    close: () => void
}


export default function DrinkDetails({ drink, open, close }: DrinkDetails) {
    const { descriptionOn } = useSettings();
    const { isAdmin } = useCurrentUser();

    const dispatch = useDispatch<AppDispatch>();

    const [values, setValues] = useState({
        happyHour: false,
        onMenu: false,
        bowl: false,
        description: ''
    })

    useEffect(() => {
        if (drink) {
            if (open) {
                setValues({
                    happyHour: drink.happyHour || false,
                    onMenu: drink.onMenu || false,
                    bowl: drink.type === 'bowl',
                    description: drink.description || ''
                })
            }
        }

    }, [drink?.drinkId, open])


    const onChange = async (name: string, checked: any) => {
        if (!drink) return;

        const updatedValues = {
            ...values,
            [name]: checked
        }

        console.log(updatedValues);

        setValues(updatedValues);

        await dispatch(updateDrink({
            ...drink,
            ...updatedValues,
            type: updatedValues.bowl ? 'bowl' : 'cocktail'
        }))
    }

    return (
        <Drawer
            title={
                <div className='flex justify-between items-center w-full'>
                    <span>{drink?.name}</span>
                    <IoClose size={24} onClick={close} className='cursor-pointer' />
                </div>
            }
            placement="bottom"
            closable={false}
            onClose={close}
            open={open}
            height="85vh"
            styles={{
                header: {
                    background: 'linear-gradient(274deg, #24242c 0%, rgba(32, 35, 40, 1) 100%)',
                    color: '#fff',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                },
                body: {
                    background: 'linear-gradient(274deg, #24242c 0%, rgba(32, 35, 40, 1) 100%)',
                    color: '#fff'
                }
            }}
        >
            {
                drink && (
                    <div className='relative flex flex-col gap-3 mx-3'>
                        <div className='flex gap-3 min-h-8'>
                            <DrinkImage image={drink.image} />
                            {descriptionOn && <p className='text-sm relative z-0'>{drink.description}</p>}
                        </div>
                        {
                            isAdmin && (
                                <div className='text-sm space-y-10'>
                                    <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', marginBottom: 30 }} />
                                    <div>
                                        <Switch checked={values.happyHour} className='w-8' onChange={(checked: boolean) => onChange('happyHour', checked)} />
                                        <span className='ml-3'>Happy Hour</span>
                                    </div>
                                    <div>
                                        <Switch checked={values.bowl} className='w-8' onChange={(checked: boolean) => onChange('bowl', checked)} />
                                        <span className='ml-3'>Bowl</span>
                                    </div>
                                    <div>
                                        <Switch checked={values.onMenu} className='w-8' onChange={(checked: boolean) => onChange('onMenu', checked)} />
                                        <span className='ml-3'>On Menu</span>
                                    </div>
                                    <div>
                                        <label className='block mb-2 font-semibold'>Description</label>
                                        <textarea
                                            value={values.description}
                                            onChange={(e) => setValues(values => ({ ...values, description: e.target.value }))}
                                            className='w-full px-3 py-2 rounded-lg bg-[#1a1a22] border border-[rgba(255,255,255,0.1)] text-white placeholder-neutral-500 focus:outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors resize-none'
                                            rows={6}
                                            placeholder='Enter drink description...'
                                        />
                                        <Button onClick={(e: any) => onChange('description', values.description)} className='mt-5 bg-[#363642]! text-neutral-50! hover:bg-[#42424e]! border-[#42424e]!'>Update Drink</Button>
                                    </div>
                                    <div>
                                        <p>{`Image ID: ${drink.image && drink.image.split('-')[2]}`}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </Drawer>
    )
}