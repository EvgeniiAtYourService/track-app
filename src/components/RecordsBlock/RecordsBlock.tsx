import Record from '../Record/Record'
import styles from './RecordsBlock.module.css'
import { RootState } from '../../store/store'
import { useActions } from '../../hooks/useActions'
import { useSelector } from 'react-redux'
import StartButton from '../StartButton/StartButton'
import { times } from '../../mock'
import Loader from '../Loader/Loader'
import { IRecord } from '../../models/record'
import { useEffect, useState, useCallback } from 'react'
import moment from 'moment'

// const buildCols = (records: IRecord[]) => {
const buildCols = (records: any[]): JSX.Element => {

    if (!records) {
        return <p></p>
    }

    const chunksCount = Math.floor(records.length / 12)

    const result = []

    // ls 

    const one = records.filter((r,i) => i < 12);
    const two = records.filter((r,i) => i >= 12 && i < 24);
    const three = records.filter((r,i) => i >= 24 && i < 36);
    const four = records.filter((r,i) => i >= 36);

    const x = (arr: any[]) => arr.length === 0 ? null : arr


    // --ls 

    // for (let i = 0; i < chunksCount; i++) {

    // }


    // return [[...records]]
        return (
                      <div className={styles['record-cols']}>

            <div className={styles['records-col']}>
                {one.map((record: any) => <Record key={record.id} sign={record.sign} time={record.time} />)}
            </div>
            {x(two) && (
            <div className={styles['records-col']}>
                        {two.map((record: any) => <Record key={record.id} sign={record.sign} time={record.time} />)}
            </div>
            )}
            {x(three) && (
            <div className={styles['records-col']}>
                        {three.map((record: any) => <Record key={record.id} sign={record.sign} time={record.time} />)}
            </div>
            )}
            {x(four) && (
                    <div className={`${styles['records-col']} ${four.length > 12 ? styles['records-col--with-scroll'] : undefined} ${styles['records-col--no-border']}`}>
                        {four.map((record: any) => <Record key={record.id} sign={record.sign} time={record.time} />)}
            </div>
            )}

          </div>
        )

}

const addZero = (num: number) => {
    return num.toString().length === 1 ? '0' + num : num 
}

const RecordsBlock = () => {

    const count = useSelector((state: RootState) => state.track.value)

    const { decrement } = useActions()
        
    const [times2, setTimes2] = useState([])
    const [total, setTotal] = useState('00:00')
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('trackTimes') as any);
        setTimes2(data)
    }, [])
    
    const didClicked = useCallback(() => {

        var now = moment();

        var time = (now.hour().toString().length === 1 ? '0' + now.hour().toString() : now.hour()) + ':' + (now.minutes().toString().length === 1 ? '0' + now.minutes().toString() : now.minutes());

        const unix = now.unix()

        setTimes2(prev => prev && prev.length > 0 
            ? [...prev, {
            sign: prev.length % 2 === 0 ? '+' : '-',
            time: time,
            id: prev.length,
            unix: unix
        } as any] : [{            
            sign: '+',
            time: time,
            id: 0,
            unix: unix
        }] as any)
        
        localStorage.setItem('trackTimes', JSON.stringify(times2 && times2.length > 0 ? [...times2, {
            sign: times2.length % 2 === 0 ? '+' : '-',
            time: time,
            id: times2.length,
            unix: unix
        }] : 
        [
            {
                sign: '+',
                time: time,
                id: 0,
                unix: unix
            }
        ]))

        //* total

        //@ts-ignore
        if (times2?.length > 0 && times2[times2.length - 1].sign === '+') {
            //@ts-ignore
            const secs = unix - times2[times2.length - 1].unix       

            const mins = Math.round(secs / 60);


            let totalM = parseInt(total.slice(3));
            let totalH = parseInt(total.slice(0, 2));


            totalM += mins

            totalH += Math.floor(totalM / 60)


            setTotal(`${addZero(totalH)}:${addZero(totalM % 60)}`)



        } else {
            return
        }

        //* --total

    }, [times2, total]); 

    const clear = useCallback(() => {

        const now = moment();

        console.log('data', times2)
        console.log('date', now.format('DD.MM.YYYY'))
        console.log('total', total);

        setTimes2([])
        localStorage.removeItem('trackTimes')
        setTotal('00:00')
    }, [times2, total]); 

    // --localStorage

    return (
      <div className={styles['container']}>

          <div className={styles['header']}>
                <div className={styles['header__side']}>
                    {/* {count}
                    <button onClick={() => decrement()}>-1</button> */}
                    <StartButton
                        //@ts-ignore
                        activated={times2?.length > 0 && times2?.[times2?.length - 1]?.sign === '+'}
                        didClicked={didClicked} 
                    />
                    <Loader loading={false} />
                </div>
                <div className={styles['header__side']}>
                    <div className={styles['header__total-time']} onClick={clear}>
                        = {total}
                    </div>
                </div>
          </div>


    
                    {buildCols(times2)}

      </div>
    )
}

export default RecordsBlock