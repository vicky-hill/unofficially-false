'use client'

import { Drink } from '@/types/drink.types'
import { PiCheers } from 'react-icons/pi'
import { useSettings } from '@/redux/slices/settings.slice'
import DrinkImage from '@/components/drinks/DrinkImage';

interface DrinkProps {
    drink: Drink
    onOpen: () => void
}

export default function DrinkItem({ drink, onOpen }: DrinkProps) {
    const { imagesOn } = useSettings();

    return (
        <div key={drink.drinkId} onClick={onOpen} className='card-gradient text-white w-full rounded-xl p-5 py-3 flex justify-between'>
                <div className='flex justify-center items-center gap-0 relative'>
                    <DrinkImage image={drink.image} />
                    <div className={`relative z-10 ${!imagesOn || !drink.image ? 'pl-5' : ''}`}>
                        <p className='font-bold mb-1'>{drink.name}</p>
                        {/* <p className='font-bold mb-1'>{drink.name} {drink.image ? drink.image.split('-')[2] : ''}</p> */}
                        <p className='text-sm text-neutral-300'>{`$${drink.price}.00`}</p>
                    </div>
                </div>
                {/* <PiCheers size={20} color='#fff' /> */}
        </div>
    )
}