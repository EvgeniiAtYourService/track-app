import { useRef, useEffect } from 'react'
import styles from './App.module.css'

const App = () => {

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className={styles['app']}></div>
  )
}

export default App