import styles from './Loader.module.css'

interface IProps {
    loading: boolean;
}

const Loader: React.FC<IProps> = ({ loading }) => loading ? <div className={styles['loader']}></div> : null;

export default Loader