import { SignIn, SignUp } from '@/features'
import styles from './Auth.module.scss'
import { useState } from 'react'


export function Auth(){
    const [isSignIn, setIsSignIn] = useState<boolean>(true)
    return(
        <div className={styles['auth-page']}>
            {isSignIn ? <SignIn setSign={setIsSignIn} /> : <SignUp setSign={setIsSignIn}/>}
        </div>
    )
}