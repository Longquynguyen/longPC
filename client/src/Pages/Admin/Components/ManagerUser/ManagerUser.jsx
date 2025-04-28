import { useEffect, useState } from 'react';
import { Table, Space, Button, message, Popconfirm, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ManagerUser.module.scss';
import { requestGetUsers } from '../../../../config/request';

const cx = classNames.bind(styles);

function ManagerUser() {
    const [users, setUsers] = useState([]);
    const [loading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await requestGetUsers();
            setUsers(res.metadata);
        };
        fetchUsers();
    }, []);

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Vai trò',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (isAdmin) => (isAdmin === '1' ? 'Admin' : 'User'),
            filters: [
                { text: 'Admin', value: '1' },
                { text: 'User', value: '0' },
            ],
            onFilter: (value, record) => record.isAdmin === value,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Quản lý người dùng</h2>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng số ${total} người dùng`,
                }}
            />
        </div>
    );
}

export default ManagerUser;
