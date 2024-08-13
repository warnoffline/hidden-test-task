import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthParams, AuthType } from "@/shared/types";
import { apiClient } from "@/shared/api/instance";
import { SessionsType } from "@/shared/types";
import axios from "axios";

export const auth = createAsyncThunk(
    '/auth/login/',
    async (params:AuthParams,  {rejectWithValue}) => {
        try{
            const response = await apiClient.post<AuthType>('/auth/login/', params, {
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

export const listOfUsersSession = createAsyncThunk(
    '/auth/session-list/',
    async (_, {rejectWithValue}) => {
        const  access_token = localStorage.getItem('access_token')
        try{
            const response = await apiClient.get<SessionsType>('/auth/session-list/',{
                headers: {
                    Authorization: `Bearer ${access_token}`
                },   
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

