import { useRef, useEffect, useCallback } from 'react'
import styles from './StartButton.module.css'

interface IProps {
    activated?: boolean;
    didClicked: () => void;
}

const StartButton: React.FC<IProps> = ({ activated, didClicked }) => {

    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        buttonRef.current?.focus()
    }, [])

    const didChanged = useCallback(() => {
        didClicked()
    }, [didClicked]);

    const buttonClassNames = `${styles['button']} ${activated ? styles['button--activated'] : undefined}`;

    return (
        <button 
            ref={buttonRef} 
            onClick={didChanged} 
            disabled={false} 
            className={buttonClassNames}
        >
            {activated ? 'On' : 'Off'}
        </button>
    )
}

export default StartButton