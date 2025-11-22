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

        const smallImages = ['00211'];

        if (smallImages.includes(imageId)) {
            return 'h-8'
        }

        return 'h-16'
    }

    return (
        <>
            {
                (image && imagesOn) && (<>
                    <Image src={image} alt='cocktail' height={50} width={50} className={`${getImageSize(image)} object-contain relative z-10 bottom-0.5 left-[-9px]`} />
                    <Image src={square} alt='square' height={50} width={50} className='w-12 object-contain absolute -left-1.5 top-1.5' />
                </>
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