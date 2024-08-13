import { createSlice } from "@reduxjs/toolkit";
import { auth, listOfUsersSession } from "./actions";

type authState = {
    isAuth: boolean;
    isLoading: boolean;
    error: string;
    userId: string | null;
}

const initialState: authState = {
    isAuth: localStorage.getItem('isAuth') === 'true',
    isLoading: false,
    error: '',
    userId: localStorage.getItem('userId') || null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            state.userId = null;
            localStorage.removeItem('isAuth')
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('userId')
            localStorage.removeItem('email')
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(auth.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(auth.rejected, (state, action) => {
            state.isLoading = false;
            if(action.payload === 400 || action.payload === 422){
                state.error = 'Неверные данные'
            }
            else if(action.payload === 403){
                state.error = 'Недостаточные привилегии'
            }
            else if(action.payload === 500){
                state.error = 'Ошибка с нашей стороны, повторите попытку позже'
            }
            else{
                state.error = 'Что-то пошло не так'
            }
        })
        .addCase(auth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            localStorage.setItem('isAuth', 'true')
            localStorage.setItem('access_token', action.payload.auth_token)
            localStorage.setItem('refresh_token', action.payload.refresh_token)
        })
        
        .addCase(listOfUsersSession.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(listOfUsersSession.rejected, (state, action) => {
            state.isLoading = false;
            if(action.payload === 500){
                state.error = 'Ошибка с нашей стороны, повторите попытку позже'
            }
            else if(action.payload === 400 || action.payload === 422){
                state.error = 'Неверные данные'
            }
            else if(action.payload === 403){
                state.error = 'Недостаточные привилегии'
            }
            else{
                state.error = 'Что-то пошло не так'
            }
        })
        .addCase(listOfUsersSession.fulfilled, (state, action) => {
            console.log(action.payload.sessions[0].user_id)
            const userId = action.payload.sessions[0].user_id
            state.userId = userId;
            localStorage.setItem('userId', userId)
        })
    }
})

const authReducer = authSlice.reducer
export const {logout} = authSlice.actions;
export default authReducer;
