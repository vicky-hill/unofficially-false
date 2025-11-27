'use client'

import Image from 'next/image'
import { useSettings } from '@/redux/slices/settings.slice'

interface DrinkImage {
    image?: string | null
}

const square = 'https://ik.imagekit.io/minite/falseidol/square.png'

export default function DrinkImage({ image }: DrinkImage) {
    const { imagesOn } = useSettings();

    const getImageSize = (image: string) => {
        const imageId = image && image.split('-')[2];

        if (imageId === '00211') return 'h-10 -bottom-2.5 left-[-8px]' // Mai Tai
        if (imageId === '00263') return 'h-11 -bottom-2 left-[-10px]' // 151 Swizzle
        if (imageId === '00145') return 'h-11 -bottom-2.5 left-[-7px]' // Coronado Luau Special
        if (imageId === '00771') return 'h-11 -bottom-2.5 left-[-8px]' // Jet Pilot
        if (imageId === '00175') return 'h-10 -bottom-3 left-[-7px]' // Panther's Tooth
        if (imageId === '00689') return 'h-11 -bottom-2.5 left-[-9px]' // Criolla
        if (imageId === '00212') return 'h-11 -bottom-2 left-[-5px]' // Enigma de Muerte
        if (imageId === '01339') return 'h-11 -bottom-2.5 left-[-9px]' // Saigon Sipper
        if (imageId === '00821') return 'h-11 -bottom-2.5 left-[-9px]' // Reserve Rum Old Fashioned


        return 'h-12 -bottom-2 left-[-9px]' 
    }

    return (
        <>
            {
                (image && imagesOn) && (<div className='relative shrink-0'>
                    <Image src={image} alt='cocktail' height={50} width={50} className={`${getImageSize(image)} object-contain relative z-10`} />
                    <Image src={square} alt='square' height={50} width={50} className='w-12 object-contain absolute -left-1.5 top-1.5' />
                </div>
                )
            }
            {
                (!imagesOn || !image) && (
                    <Image src={square} alt='square' height={50} width={50} className='w-12 object-contain absolute -left-1.5' />
                )
            }
        </>
    )
}