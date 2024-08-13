import { apiClient } from "@/shared/api/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "@/shared/types";
import axios from "axios";

export const getUserById = createAsyncThunk(
    '/user/',
    async (user_id: string,  {rejectWithValue}) => {
        try{
            const access_token = localStorage.getItem('access_token')
            const response = await apiClient.get<UserType>(`/user/${user_id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`, 
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