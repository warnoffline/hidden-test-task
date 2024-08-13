import userReducer from "@/entities/User/UserSlice";
import registrationReducer from "@/entities/Registration/RegistrationSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/entities/Auth/AuthSlice";
const rootReducer = combineReducers({
    userReducer,
    authReducer,
    registrationReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
