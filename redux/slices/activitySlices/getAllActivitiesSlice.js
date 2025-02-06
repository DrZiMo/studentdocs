import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DEFAULT_ERROR_MESSAGE } from '../../../src/constants/defaultErrorMessage'
import axios from 'axios'
import { baseUrl } from '../../../src/constants/baseUrl'

const initialState = {
    isLoading: false,
    error: '',
    data: {},
}

export const getActivityByUserFn = createAsyncThunk(
    'single-user/activities',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${baseUrl}activities/single-user`,
                data
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error.message || DEFAULT_ERROR_MESSAGE)
        }
    }
)

export const getActivityByUser = createSlice({
    name: 'singleUserActivity',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getActivityByUserFn.pending, (state) => {
                state.isLoading = true
                state.error = ''
                state.data = {}
            })
            .addCase(getActivityByUserFn.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
                state.data = action.payload
            })
            .addCase(getActivityByUserFn.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.data = {}
            })
    },
})

export default getAllActivities.reducer
