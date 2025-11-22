import { DrinkType } from './types'
import { User } from './user.types'

export interface Drink {
    drinkId: number
    type: DrinkType
    name: string
    country: string
    current: boolean
    price: number
    user: User
    onMenu?: boolean
    happyHour?: boolean
    image?: string
    sort?: number
    description?: string
}