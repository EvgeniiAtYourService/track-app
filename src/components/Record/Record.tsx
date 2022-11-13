import styles from './Record.module.css'

interface IProps {
    sign: ISign;
    time: string;
}

type ISign = '+' | '-';

const renderSign = (sign: ISign) => {
  return <span className={sign === '-' ? styles['minus-sign'] : undefined}>{sign}</span>
}

const Record: React.FC<IProps> = ({ sign, time }) => {
  return (
      <p className={styles['record']}>{renderSign(sign)} {time}</p>
  )
}

export default Record