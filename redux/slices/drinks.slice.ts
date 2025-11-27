import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Drink } from '@/types/drink.types'
import { api } from '@/utils/api'

export type FilterType = null | 'secretMenu' | 'happyHour' | 'bowl';

export interface DrinkState {
    drinks: Drink[]
    search: string
    filter: FilterType
    loading: boolean
}

const initialState: DrinkState = {
    drinks: [],
    search: '',
    filter: null,
    loading: true
}

const selectDrinksState = (state: RootState) => state.drinks
const selectAllDrinks = (state: RootState) => state.drinks.drinks
const selectSearch = (state: RootState) => state.drinks.search
const selectFilter = (state: RootState) => state.drinks.filter

export const selectFilteredDrinks = createSelector(
    [selectAllDrinks, selectSearch, selectFilter],
    (drinks, search, filter) => {
        let filteredDrinks = [...drinks]

        if (search) {
            const searchLower = search.toLowerCase()
            filteredDrinks = filteredDrinks.filter(drink => 
                drink.name.toLowerCase().includes(searchLower) ||
                drink.description?.toLowerCase().includes(searchLower)
            )
        }

        if (filter === 'secretMenu') {
            filteredDrinks = filteredDrinks.filter(drink => drink.current && !drink.onMenu && drink.type !== 'bowl')
        } else if (filter === 'happyHour') {
            filteredDrinks = filteredDrinks.filter(drink => drink.happyHour)
        } else if (filter === 'bowl') {
            filteredDrinks = filteredDrinks
                .filter(drink => drink.type === 'bowl')
                .map(drink => ({ ...drink, name: drink.name.replace(' (Bowl)', '') }))
        } else if (!filter) {
            filteredDrinks = filteredDrinks.filter(drink => drink.onMenu && !drink.happyHour)
        }

        return filteredDrinks.sort((a, b) => (a.sort || 0) - (b.sort || 0))
    }
)

export const useDrinks = () => {
    const state = useSelector(selectDrinksState)
    const filteredDrinks = useSelector(selectFilteredDrinks)
    return { ...state, filteredDrinks }
}

export const getDrinks = createAsyncThunk('drinks/getDrinks', async () => {
    try {
        const drinks: Drink[] = await api.get('/drinks?type=cocktail,bowl')
        return drinks
    } catch (err) {
        console.error('Error fetching drinks:', err)
        throw err
    }
})

export const updateDrink = createAsyncThunk('drinks/updateDrink', async (data: Drink) => {
    try {
        const { drinkId, ...payload } = data;

        const drink: Drink = await api.put(`/drinks/${drinkId}`, payload)
        return drink;
    } catch (err) {
        console.error('Error fetching drinks:', err)
        throw err
    }
})


export const drinkSlice = createSlice({
    name: 'drinks',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        clearFilters: (state) => {
            state.filter = null
            state.search = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDrinks.pending, (state) => {
                state.loading = true
            })
            .addCase(getDrinks.fulfilled, (state, action) => {
                state.drinks = action.payload || []
                state.loading = false
            })
            .addCase(updateDrink.fulfilled, (state, action) => {
                state.drinks = state.drinks.map(drink => drink.drinkId === action.payload.drinkId ? action.payload : drink)
                state.loading = false
            })
            .addCase(getDrinks.rejected, (state) => {
                state.loading = false
            })
    }
});

export const { setFilter, setSearch, clearFilters } = drinkSlice.actions

export default drinkSlice.reducer