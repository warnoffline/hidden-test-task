import { ConfirmType, RegistrationType } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";
import { registration, confirmation, resendCode } from './actions'

type registrationState = {
    isLoading: boolean;
    regError: string;
    confError: string;
    resendError: string;
    regMessage: RegistrationType | null;
    confMessage: ConfirmType | null;
    resendMessage: RegistrationType | null;
}

const initialState: registrationState = {
    isLoading: false,
    regError: '',
    confError: '',
    resendError: '',
    regMessage: null,
    confMessage: null,
    resendMessage: null,
}

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registration.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registration.rejected, (state, action) => {
            state.isLoading = false;
            if(action.payload === 422){
                state.regError = 'Неправильные данные';
            }
            else if(action.payload === 400){
                state.regError = 'Пользователь уже зарегистрирован';
            }
            else{
                state.regError = 'Что-то пошло не так';
            }
        })
        .addCase(registration.fulfilled, (state, action) => {
            state.isLoading = false;
            state.regMessage = action.payload;
        })

        .addCase(confirmation.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(confirmation.rejected, (state, action) => {
            state.isLoading = false;
            if(action.payload === 422){
                state.confError = 'Неправильные данные';
            }
            else if(action.payload === 400){
                state.confError = 'Неверный код';
            }
            else{
                state.confError = 'Что-то пошло не так';
            }
        })
        .addCase(confirmation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.confMessage = action.payload;
        })

        .addCase(resendCode.rejected, (state, action) => {
            if(action.payload === 422){
                state.resendError = 'Неправильные данные';
            }
            else if(action.payload === 400){
                state.resendError = 'Проблемы с отправкой кода';
            }
            else{
                state.resendError = 'Что-то пошло не так';
            }
        })  
        .addCase(resendCode.fulfilled, (state, action) => {
            state.resendMessage = action.payload;
        })
    }
})

const registrationReducer = registrationSlice.reducer
export default registrationReducer;