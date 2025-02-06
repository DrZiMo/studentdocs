import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DEFAULT_ERROR_MESSAGE } from '../../../src/constants/defaultErrorMessage'
import axios from 'axios'
import { baseUrl } from '../../../src/constants/baseUrl'

const initialState = {
    isLoading: false,
    error: '',
    data: {},
}

export const getAllActivitiesFn = createAsyncThunk(
    'all/activities',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${baseUrl}activities/all`)
            return res.data
        } catch (error) {
            return rejectWithValue(error.message || DEFAULT_ERROR_MESSAGE)
        }
    }
)

export const getAllActivities = createSlice({
    name: 'allActivities',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllActivitiesFn.pending, (state) => {
                state.isLoading = true
                state.error = ''
                state.data = {}
            })
            .addCase(getAllActivitiesFn.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
                state.data = action.payload
            })
            .addCase(getAllActivitiesFn.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.data = {}
            })
    },
})

export default getAllActivities.reducer
