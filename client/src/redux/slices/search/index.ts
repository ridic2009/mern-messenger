import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { ISearchState } from './types'
import user from '../../../api/user'

export const findUsers = createAsyncThunk('search/findUsers', async (searchValue: string) => {

    const query = `login=${searchValue}`
    const {data} = await user.getAll(query)

    return data
})



const initialState: ISearchState = {
    items: [],
    value: '',
    status: null
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.value = action.payload
        }
    },

    extraReducers(builder) {
        builder.addCase(findUsers.pending, (state) => {
            state.status = 'pending'
            state.items = []
        })

        builder.addCase(findUsers.fulfilled, (state, action) => {
            state.status = 'success'
            state.items = action.payload as any

        })

        builder.addCase(findUsers.rejected, (state) => {
            state.status = 'rejected'
            state.items = []
        })
    }
})


export const searchValueSelector = (state: RootState) => state.search.value
export const searchItemsSelector = (state: RootState) => state.search.items

export const { setSearchValue } = searchSlice.actions

export default searchSlice.reducer