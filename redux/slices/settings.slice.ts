import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/utils/api'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export interface Setting {
    name: string
    active: boolean
}

const initialState = {
    imagesOn: false,
    logoOn: false,
    loading: true,
    descriptionOn: true
}

export const useSettings: any = () => useSelector((state: RootState) => state.settings);

export const getSettings = createAsyncThunk('settings/getSettings', async () => {
    try {
        const settings: Setting[] = await api.get('/settings');
        return settings;
    } catch (err) {
        console.log(err);
    }
});

export const createSettings = createAsyncThunk('settings/createSettings', async (payload: any) => {
    try {
        const settings: Setting = await api.post('/settings', payload);
        return settings;
    } catch (err) {
        console.log(err);
    }
});

export const updateSettings = createAsyncThunk('settings/updateSettings', async ({ settingsId, payload }: any) => {
    try {
        const settings: Setting = await api.put(`/settings/${settingsId}`, payload);
        return settings;
    } catch (err) {
        console.log(err);
    }
});

export const deleteSettings = createAsyncThunk('settings/deleteSettings', async (settingsId: string) => {
    try {
        const settings: Setting = await api.delete(`/settings/${settingsId}`);
        return settings;
    } catch (err) {
        console.log(err);
    }
});

export const settingslice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSettings.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getSettings.fulfilled, (state: any, action: any) => {
                state.loading = false
                state.imagesOn = action.payload.find((setting: Setting) => setting.name === 'images').active
                state.logoOn = action.payload.find((setting: Setting) => setting.name === 'logo').active
                state.descriptionOn = action.payload.find((setting: Setting) => setting.name === 'description').active
            })
            .addCase(createSettings.fulfilled, (state: any, action: any) => {
                state.settings = [...state.settings, action.payload]
            })
            .addCase(updateSettings.fulfilled, (state: any, action: any) => {
                state.settings = state.settings.map((settings: any) => settings.settingsId !== action.payload.settingsId ? settings : action.payload)
            })
            .addCase(deleteSettings.fulfilled, (state: any, action: any) => {
                state.settings = state.settings.filter((settings: any) => settings.settingsId !== action.payload)
            })
    }
});

export default settingslice.reducer;