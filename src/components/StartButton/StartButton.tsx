import { useRef, useEffect } from 'react'
import styles from './StartButton.module.css'

const StartButton = () => {

    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        buttonRef.current?.focus()
    }, [])

    return (
        <button ref={buttonRef} onClick={()=>{}} disabled={false} className={styles['button']}>On</button>
    )
}

export default StartButton