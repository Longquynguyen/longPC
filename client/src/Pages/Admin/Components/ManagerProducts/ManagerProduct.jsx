import { Table, Button, Space, Modal, Form, Input, InputNumber, Upload, Select, message } from 'antd';

import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';

import styles from './ManagerProduct.module.scss';
import classNames from 'classnames/bind';
import { requestGetCategory } from '../../../../config/request';

const cx = classNames.bind(styles);

function ManagerProduct() {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [fileList, setFileList] = useState([]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await requestGetCategory();
            setCategories(categories);
        };
        fetchCategories();
    }, []);

    // Fake data for demonstration
    const [products] = useState([
        {
            id: '1',
            name: 'PC Gaming Pro',
            price: 1500,
            description: 'High-end gaming PC',
            discount: 10,
            images: ['image1.jpg', 'image2.jpg'],
            category: 'Gaming',
            stock: 10,
            cpu: 'Intel i9',
            main: 'Z690',
            ram: '32GB DDR5',
            storage: '2TB NVMe',
            gpu: 'RTX 4080',
            power: '850W',
            case: 'NZXT H510',
            coolers: 'NZXT Kraken',
        },
    ]);

    const handleAdd = () => {
        setEditingProduct(null);
        form.resetFields();
        setFileList([]);
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setEditingProduct(record);
        form.setFieldsValue(record);
        setFileList(
            record.images.map((img, index) => ({
                uid: `-${index}`,
                name: img,
                status: 'done',
                url: img,
            })),
        );
        setIsModalOpen(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa sản phẩm "${record.name}"?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                message.success('Đã xóa sản phẩm');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields()
            .then((values) => {
                console.log('Success:', values);
                message.success(`${editingProduct ? 'Cập nhật' : 'Thêm'} sản phẩm thành công`);
                setIsModalOpen(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price.toLocaleString()}`,
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Kho',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const uploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        multiple: true,
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Quản lý sản phẩm</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Thêm sản phẩm
                </Button>
            </div>

            <Table columns={columns} dataSource={products} rowKey="id" />

            <Modal
                title={editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={() => setIsModalOpen(false)}
                width={800}
            >
                <Form form={form} layout="vertical" className={cx('form')}>
                    <div className={cx('form-row')}>
                        <Form.Item
                            name="name"
                            label="Tên sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </div>

                    <div className={cx('form-row')}>
                        <Form.Item
                            name="category"
                            label="Danh mục"
                            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                        >
                            <Select>
                                {categories.map((item) => (
                                    <Select.Option value={item.id}>{item.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="stock"
                            label="Số lượng trong kho"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        >
                            <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Editor
                            apiKey="hfm046cu8943idr5fja0r5l2vzk9l8vkj5cp3hx2ka26l84x"
                            init={{
                                plugins:
                                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar:
                                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            initialValue="Welcome to TinyMCE!"
                        />
                    </Form.Item>

                    <Form.Item
                        name="images"
                        label="Hình ảnh"
                        rules={[{ required: true, message: 'Vui lòng tải lên ít nhất 1 hình ảnh!' }]}
                    >
                        <Upload {...uploadProps} listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải ảnh</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <div className={cx('form-row')}>
                        <Form.Item name="cpu" label="CPU" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="main" label="Mainboard" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </div>

                    <div className={cx('form-row')}>
                        <Form.Item name="ram" label="RAM" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="storage" label="Ổ cứng" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </div>

                    <div className={cx('form-row')}>
                        <Form.Item name="gpu" label="Card đồ họa" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="power" label="Nguồn" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </div>

                    <div className={cx('form-row')}>
                        <Form.Item name="case" label="Case" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="coolers" label="Tản nhiệt" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default ManagerProduct;
