import { apiClient } from "@/shared/api/instance";
import { ConfirmType, RegistrationType,RegParams } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registration = createAsyncThunk(
    '/registration',
    async (params:RegParams, {rejectWithValue}) => {
        try{
            const response = await apiClient.post<RegistrationType>('/registration/', params, {
                headers: {
                    'Content-Type': 'application/json', 
                  },
            })
            return response.data;
        } catch(e:unknown){

            if(axios.isAxiosError(e)){
                const errorCode = e?.response?.status;
                console.log(errorCode)
                return rejectWithValue(errorCode)
            }
            return rejectWithValue(e)
        }
    }
)

export const confirmation = createAsyncThunk(
    '/confirmation',
    async (confirmation_code:string, {rejectWithValue}) => {
        try{
            const response = await apiClient.patch<ConfirmType>(`/registration/${confirmation_code}`)
            return response.data
        } catch(e:unknown){
            if(axios.isAxiosError(e)){
                const errorCode = e?.response?.status;
                return rejectWithValue(errorCode)
            }
            return rejectWithValue(e)
        }
    }
)

export const resendCode = createAsyncThunk(
    '/registration/resend_code',
    async (email:string, {rejectWithValue}) => {
        try{
            const response = await apiClient.post<RegistrationType>('/registration/resend_code', {email}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch(e:unknown){
            if(axios.isAxiosError(e)){
                const errorCode = e?.response?.status;
                return rejectWithValue(errorCode)
            }
            return rejectWithValue(e)
        }
    }
)