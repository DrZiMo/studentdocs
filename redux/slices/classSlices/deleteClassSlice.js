import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../../src/constants/baseUrl'
import { DEFAULT_ERROR_MESSAGE } from '../../../src/constants/defaultErrorMessage'

const initialState = {
    isLoading: false,
    error: '',
    data: {},
}

export const deleteClassFn = createAsyncThunk(
    'delete/class',
    async (id, { rejectWithValue, getState }) => {
        const stateData = getState()
        const { token } = stateData?.user?.data
        try {
            const res = await axios.delete(`${baseUrl}classes/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return res.data
        } catch (error) {
            return rejectWithValue(error.message || DEFAULT_ERROR_MESSAGE)
        }
    }
)

export const deleteClassSlice = createSlice({
    name: 'deleteClass',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(deleteClassFn.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.data = {}
        })
        builder.addCase(deleteClassFn.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.data = {}
        })
        builder.addCase(deleteClassFn.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.data = action.payload
        })
    },
})
