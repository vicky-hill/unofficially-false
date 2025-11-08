'use client'

import api from '@/utils/api'
import { useEffect, useState } from 'react'
import logo from '@/images/logo.png'
import Image from 'next/image'
import { PiCheers } from "react-icons/pi"
import Input from '@/components/form/Input'
import { IoSearch } from "react-icons/io5"


interface page {

}

export default function page({ }: page) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [drinks, setDrinks] = useState<any>([]);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCurrentUser();
        getAllDrinks();
    }, [])

    const getCurrentUser = async () => {
        setLoading(true);
        const user = await api.get('/users/current');
        setCurrentUser(user);
        setLoading(false);
    }

    const getAllDrinks = async () => {
        const drinks = await api.get('/drinks?type=cocktail');
        setDrinks(drinks);
    }

    if (!currentUser && loading) return (
        <div className='flex h-[90vh] justify-center items-center'>
            loading
        </div>
    )

    const getFilteredDrinks = () => {
        let filteredDrinks = [...drinks];

        if (search) {
            filteredDrinks = filteredDrinks.filter(drink => JSON.stringify(drink).toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }

        return filteredDrinks;
    }


    return (
        <div className='flex flex-col h-[95vh] items-center overflow-scroll gap-3 mt-5 px-4'>
            <Image src={logo} alt='logo' className='mb-5 w-1/2' />
            <div className='relative w-full'>
                <Input onChange={(e: any) => setSearch(e.target.value)} className='mb-3 pl-9' />
                <IoSearch className='absolute top-[11px] left-2' size={18} color='#55556d' />
            </div>

            {
                getFilteredDrinks()
                    .map((drink: any) => (
                        <div key={drink.drinkId} className='card-gradient text-white w-full rounded-xl p-5 py-3 flex justify-between'>
                            <div>
                                <p className='font-bold mb-0.5'>{drink.name}</p>
                                <p className='text-sm'>{`$${drink.price}.00`}</p>
                            </div>
                            <PiCheers size={20} color='#fff' />
                        </div>
                    ))
            }
        </div>
    )
}