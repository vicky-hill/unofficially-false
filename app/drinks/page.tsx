'use client'

import { useEffect, useState } from 'react'
import logo from '@/images/logo.png'
import Image from 'next/image'
import Input from '@/components/form/Input'
import { IoSearch } from "react-icons/io5"
import { GiSecretBook } from "react-icons/gi"
import { FaCocktail } from "react-icons/fa"
import { GiFlamer } from "react-icons/gi"
import Protect from '@/components/layout/Protect'
import { useSettings } from '@/redux/slices/settings.slice'
import DrinkItem from '@/components/drinks/DrinkItem'
import DrinkDetails from '@/components/drinks/DrinkDetails'
import { Drink } from '@/types/drink.types'
import { useAppDispatch } from '@/redux/hooks'
import { clearFilters, getDrinks, setFilter, setSearch, useDrinks } from '@/redux/slices/drinks.slice'
import { useCurrentUser } from '@/redux/slices/user.slice'

export default function page() {
    const dispatch = useAppDispatch()
    const { filteredDrinks, search, filter, drinks } = useDrinks()
    const { isAuthenticated } = useCurrentUser();

    const { logoOn } = useSettings();
    const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

    useEffect(() => {
       isAuthenticated && dispatch(getDrinks())
    }, [isAuthenticated])

    const handleFilter = (value: 'secretMenu' | 'bowl' | 'happyHour') => {
        filter === value ? dispatch(clearFilters()) : dispatch(setFilter(value))
    }

    return (
        <Protect>
            <div className='flex flex-col h-[95vh] items-center overflow-scroll gap-3 mt-5 px-4 mb-10'>
                {logoOn && <Image src={logo} alt='logo' className='mb-5 w-1/2' />}

                <div className={`relative w-full ${!logoOn ? 'mt-5' : ''}`}>
                    <Input value={search} onChange={(e: any) => dispatch(setSearch(e.target.value))} className='mb-3 pl-9' />
                    <IoSearch className='absolute top-[11px] left-2' size={18} color='#55556d' />
                </div>
                <div className='w-full flex justify-between'>
                    <div onClick={() => handleFilter('secretMenu')} className={`flex items-center justify-center-center ${filter === 'secretMenu' ? 'text-neutral-50' : 'text-neutral-500'} transition-all text-sm gap-1.5 font-bold px-3 mb-3 w-min`}>
                        <GiSecretBook color={filter === 'secretMenu' ? '#fafafa' : '#737373'} size={16} />
                        <span className='w-max'>Secret Menu</span>
                    </div>
                    <div onClick={() => handleFilter('bowl')} className={`flex items-center justify-center-center ${filter === 'bowl' ? 'text-neutral-50' : 'text-neutral-500'} transition-all text-sm gap-1.5 font-bold px-3 mb-3 w-min`}>
                        <GiFlamer color={filter === 'bowl' ? '#fafafa' : '#737373'} size={16} />
                        <span className='w-max'>Bowls</span>
                    </div>
                    <div onClick={() => handleFilter('happyHour')} className={`flex items-center justify-center-center ${filter === 'happyHour' ? 'text-neutral-50' : 'text-neutral-500'} transition-all text-sm gap-1.5 font-bold px-3 mb-3 w-min`}>
                        <FaCocktail color={filter === 'happyHour' ? '#fafafa' : '#737373'} size={16} />
                        <span className='w-max'>Happy Hour</span>
                    </div>
                </div>

                {
                    filteredDrinks
                        .map((drink: Drink) => (
                            <DrinkItem key={drink.drinkId} drink={drink} onOpen={() => setSelectedDrink(drink)} />
                        ))
                }
            </div>
            <DrinkDetails
                drink={drinks.find(d => d.drinkId === selectedDrink?.drinkId) || selectedDrink}
                open={!!selectedDrink}
                close={() => setSelectedDrink(null)}
            />
        </Protect>
    )
}