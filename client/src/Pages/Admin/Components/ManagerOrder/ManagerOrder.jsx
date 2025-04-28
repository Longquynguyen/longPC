import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Descriptions, Select, Image, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './ManagerOrder.module.scss';
import { requestGetOrderAdmin, requestUpdateOrderStatus } from '../../../../config/request';

const cx = classNames.bind(styles);

function ManagerOrder() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch orders data when component mounts
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await requestGetOrderAdmin();

            setOrders(response.metadata);
        } catch (error) {
            console.error('Error fetching orders:', error);
            message.error('Lỗi khi tải danh sách đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (record) => {
        setSelectedOrder(record);
        setIsModalVisible(true);
    };

    const handleStatusChange = async (newStatus, record) => {
        try {
            const data = {
                orderId: record.id,
                status: newStatus,
            };
            await requestUpdateOrderStatus(data);
            message.success('Cập nhật trạng thái thành công');
            fetchOrders();
        } catch (error) {
            console.error('Error updating status:', error);
            message.error('Lỗi khi cập nhật trạng thái');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'gold',
            completed: 'blue',
            delivered: 'green',
            cancelled: 'red',
        };
        return colors[status.toLowerCase()];
    };

    const getStatusText = (status) => {
        const statusText = {
            pending: 'Chờ xử lý',
            completed: 'Đã xử lý',
            delivered: 'Đã giao hàng',
            cancelled: 'Đã hủy',
        };
        return statusText[status.toLowerCase()];
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'idPayment',
            key: 'idPayment',
            width: '15%',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'fullName',
            key: 'fullName',
            width: '15%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: '12%',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '8%',
            align: 'center',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: '12%',
            align: 'right',
            render: (price) => <span className={cx('price')}>{price.toLocaleString('vi-VN')}đ</span>,
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            width: '15%',
            render: (status, record) => (
                <Select
                    value={status}
                    style={{ width: 140 }}
                    onChange={(newStatus) => handleStatusChange(newStatus, record)}
                    className={cx('status-select')}
                >
                    <Select.Option value="pending">
                        <Tag color="gold">Chờ xử lý</Tag>
                    </Select.Option>
                    <Select.Option value="completed">
                        <Tag color="blue">Đã xử lý</Tag>
                    </Select.Option>
                    <Select.Option value="delivered">
                        <Tag color="green">Đã giao hàng</Tag>
                    </Select.Option>
                    <Select.Option value="cancelled">
                        <Tag color="red">Đã hủy</Tag>
                    </Select.Option>
                </Select>
            ),
        },
        {
            title: 'Sản phẩm',
            key: 'products',
            width: '25%',
            render: (_, record) => (
                <Space direction="vertical" className={cx('products-list')}>
                    {record.products.map((product, index) => (
                        <Space key={index} className={cx('product-info')}>
                            <Image
                                src={product.image.split(',')[0]}
                                alt={product.name}
                                width={60}
                                height={60}
                                className={cx('product-image')}
                            />
                            <div className={cx('product-details')}>
                                <div className={cx('product-name')}>{product.name}</div>
                                <div className={cx('product-variant')}>
                                    {product.color} - {product.size}
                                </div>
                                <div className={cx('product-quantity')}>Số lượng: {product.quantity}</div>
                            </div>
                        </Space>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <Button type="primary" onClick={() => handleViewDetails(record)} className={cx('action-button')}>
                    Chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>Quản lý đơn hàng</h2>
            </div>

            <div className={cx('content')}>
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        position: ['bottomCenter'],
                    }}
                    loading={loading}
                    className={cx('order-table')}
                />
            </div>

            <Modal
                title={<div className={cx('modal-title')}>Chi tiết đơn hàng</div>}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={700}
                className={cx('order-modal')}
            >
                {selectedOrder && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Mã đơn hàng">{selectedOrder.idPayment}</Descriptions.Item>
                        <Descriptions.Item label="Sản phẩm">
                            <Space direction="vertical" className={cx('products-list')}>
                                {selectedOrder.products.map((product, index) => (
                                    <Space key={index} direction="vertical" className={cx('product-detail-item')}>
                                        <Image
                                            src={product.image.split(',')[0]}
                                            alt={product.name}
                                            width={100}
                                            height={100}
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div>{product.name}</div>
                                        <div>Màu: {product.color}</div>
                                        <div>Size: {product.size}</div>
                                        <div>Số lượng: {product.quantity}</div>
                                        <div>Giá: {product.price.toLocaleString('vi-VN')}đ</div>
                                    </Space>
                                ))}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Số lượng">{selectedOrder.quantity}</Descriptions.Item>
                        <Descriptions.Item label="Khách hàng">{selectedOrder.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{selectedOrder.phone}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{selectedOrder.address}</Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">
                            {selectedOrder.totalPrice.toLocaleString('vi-VN')}đ
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag color={getStatusColor(selectedOrder.status)}>
                                {getStatusText(selectedOrder.status)}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Phương thức thanh toán">
                            {selectedOrder.typePayment}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
}

export default ManagerOrder;
