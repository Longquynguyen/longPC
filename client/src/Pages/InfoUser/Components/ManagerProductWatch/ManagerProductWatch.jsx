import { useEffect, useState } from 'react';
import styles from './ManagerProductWatch.module.scss';
import classNames from 'classnames/bind';
import { requestGetProductWatch } from '../../../../config/request';

import CardBody from '../../../../Components/CardBody/CardBody';

const cx = classNames.bind(styles);

function ManagerProductWatch() {
    const [dataProduct, setDataProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetProductWatch();
            setDataProduct(res.metadata);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('manager-product-watch')}>
            <h1>Sản phẩm đã xem</h1>
            <div className={cx('wrapper')}>
                {dataProduct.map((item) => (
                    <CardBody product={item} />
                ))}
            </div>
        </div>
    );
}

export default ManagerProductWatch;
