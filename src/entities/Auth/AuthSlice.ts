import { createSlice } from "@reduxjs/toolkit";
import { auth, listOfUsersSession } from "./actions";
import { encryptToken } from "@/shared/lib";


const ENCRYPTED_REFRESH_KEY = import.meta.env.VITE_ENCRYPTED_REFRESH_TOKEN_KEY;
const ACCESS_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
const IV_KEY = import.meta.env.VITE_IV_KEY;
const SALT_KEY = import.meta.env.VITE_SALT_KEY;

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
            localStorage.removeItem(ACCESS_KEY);
            localStorage.removeItem(ENCRYPTED_REFRESH_KEY);
            localStorage.removeItem(SALT_KEY);
            localStorage.removeItem(IV_KEY);
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
            localStorage.setItem(ACCESS_KEY, action.payload.auth_token)
            encryptToken(action.payload.refresh_token, action.payload.auth_token).then((encryptedToken) => {
                localStorage.setItem(ENCRYPTED_REFRESH_KEY, encryptedToken)
            })
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
            state.isLoading = false;
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
