'use client'

import api from '@/utils/api'
import { useEffect, useState } from 'react'
import logo from '@/images/logo.png'
import Image from 'next/image'
import { PiCheers } from "react-icons/pi"
import Input from '@/components/form/Input'
import { IoSearch } from "react-icons/io5"
import { GiSecretBook } from "react-icons/gi"

const square = 'https://ik.imagekit.io/minite/falseidol/square.png';

interface page {

}

export default function page({ }: page) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [drinks, setDrinks] = useState<any>([]);
    const [search, setSearch] = useState<string>('wayfinder');
    const [secretMenu, setSecretMenu] = useState(false);
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

        </div>
    )

    const getFilteredDrinks = () => {
        let filteredDrinks = [...drinks];

        if (search) {
            filteredDrinks = filteredDrinks.filter(drink => JSON.stringify(drink).toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }

        if (secretMenu) {
            filteredDrinks = filteredDrinks.filter(drink => drink.current && !drink.onMenu);
        }

        return filteredDrinks.filter(drink => drink.current);
    }


    return (
        <div className='flex flex-col h-[95vh] items-center overflow-scroll gap-3 mt-5 px-4'>
            <Image src={logo} alt='logo' className='mb-5 w-1/2' />
            <div className='relative w-full'>
                <Input onChange={(e: any) => setSearch(e.target.value)} className='mb-3 pl-9' />
                <IoSearch className='absolute top-[11px] left-2' size={18} color='#55556d' />
            </div>
            <div onClick={() => setSecretMenu(isSecret => !isSecret)} className={`flex items-center justify-center-center ${secretMenu ? 'text-neutral-50' : 'text-neutral-500'} transition-all text-sm gap-1.5 font-bold w-full px-3 mb-3`}>
                <GiSecretBook color={secretMenu ? '#fafafa' : '#737373'} size={16} />
                <span>Secret Menu</span>
            </div>

            {
                getFilteredDrinks()
                    .map((drink: any) => (
                        <div key={drink.drinkId} className='card-gradient text-white w-full rounded-xl p-5 py-3 flex justify-between'>
                            <div className='flex justify-center items-center gap-4 relative'>
                                {
                                    drink.image && (<>
                                        <Image src={drink.image} alt='cocktail' height={50} width={50} className='w-7 object-contain relative z-10 bottom-0.5' />
                                        <Image src={square} alt='cocktail' height={50} width={50} className='w-10 object-contain absolute left-[-6px] top-1.5' />
                                    </>
                                    )
                                }

                                <div>
                                    <p className='font-bold mb-0.5'>{drink.name}</p>
                                    <p className='text-sm'>{`$${drink.price}.00`}</p>
                                </div>
                            </div>
                            <PiCheers size={20} color='#fff' />
                        </div>
                    ))
            }
        </div>
    )
}