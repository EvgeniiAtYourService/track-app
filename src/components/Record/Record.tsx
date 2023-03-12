import { IRecord, ISign } from '../../models/record'
import styles from './Record.module.css'

type Props = IRecord

const renderSign = (sign: ISign) => {
  return <span className={sign === '-' ? styles['minus-sign'] : undefined}>{sign}</span>
}

const Record: React.FC<Props> = ({ sign, time }) => {
  return (
      <p className={styles['record']}>{renderSign(sign)} {time}</p>
  )
}

export default Record