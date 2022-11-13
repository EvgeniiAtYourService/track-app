import Record from '../Record/Record'
import styles from './RecordsBlock.module.css'
import { RootState } from '../../store/store'
import { useActions } from '../../hooks/useActions'
import { useSelector } from 'react-redux'
import StartButton from '../StartButton/StartButton'
import { times } from '../../mock'

const c = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const RecordsBlock = () => {

    const count = useSelector((state: RootState) => state.track.value)

    const { decrement } = useActions()

    return (
      <div className={styles['container']}>
          <div className={styles['header']}>
                <div className={styles['header__side']}>
                    {/* {count}
                    <button onClick={() => decrement()}>-1</button> */}
                    <StartButton />
                </div>
                <div className={styles['header__side']}>
                    <div className={styles['header__total-time']}>
                        = 09:12
                    </div>
                </div>
          </div>
          {/* <div className={styles['record-cols']}>
                <div className={styles['records-col']}>
                    {c.map(i => <Record />)}
                </div>
                <div className={styles['records-col']}>
                    {c.map(i => <Record />)}
                </div>
                <div className={styles['records-col']}>
                    {c.map(i => <Record />)}
                </div>
                <div className={`${styles['records-col']} ${styles['records-col--no-border']}`}>
                    {c.map(i => <Record />)}
                </div>
          </div> */}
          <div className={styles['record-cols']}>
                <div className={styles['records-col']}>
                    {times.map(record => <Record sign={record.sign} time={record.time} />)}
                </div>
          </div>
      </div>
    )
}

export default RecordsBlock