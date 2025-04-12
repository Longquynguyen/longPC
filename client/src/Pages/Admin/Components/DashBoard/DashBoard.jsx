import styles from './DashBoard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DashBoard() {
    return <div className={cx('wrapper')}>DashBoard</div>;
}

export default DashBoard;
