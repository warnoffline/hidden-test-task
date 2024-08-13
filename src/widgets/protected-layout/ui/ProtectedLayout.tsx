import { Navigate,Outlet } from "react-router-dom";
import { useAppSelector } from "@/shared/lib";
import style from './ProtectedLayout.module.scss'

export function ProtectedLayout(){
    const {isAuth} = useAppSelector(state => state.authReducer)
    if(!isAuth){
        return <Navigate to='/auth'/>
    }
    return <div className={style['protected-layout']}>
        <Outlet/>
    </div>
}