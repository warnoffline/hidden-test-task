import {User} from '@/shared/types'
import { createSlice } from "@reduxjs/toolkit";
import { getUserById } from "./actions";

type UserState = {
    user: User | null;
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserById.rejected, (state) => {
            state.isLoading = false;
            state.error = 'Что-то пошло не так'
        })
        .addCase(getUserById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.result;
        })
    }
})

const userReducer = userSlice.reducer
export default userReducer;