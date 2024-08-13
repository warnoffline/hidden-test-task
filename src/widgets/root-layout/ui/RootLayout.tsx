import { Outlet } from "react-router-dom";
import styles from './RootLayout.module.scss'
export function RootLayout(){
    return(
        <div className={styles['root-layout']}>
            <Outlet/>
        </div>
    )
}