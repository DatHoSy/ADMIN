import { Space, Table, Button, Modal, Form, Input } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Excel from '../../components/Excel';
import confirm from 'antd/es/modal/confirm';

const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = useState(false);
    const values = Form.useWatch([], form);
    useEffect(() => {
        form
            .validateFields({
                validateOnly: true,
            })
            .then(
                () => {
                    setSubmittable(true);
                },
                () => {
                    setSubmittable(false);
                },
            );
    }, [values]);

    return (
        <Button type="primary" disabled={!submittable} htmlType='submit'>
            Submit
        </Button>
    );
};


export const Product = () => {
    const dispatch = useDispatch();
    let rawData = useSelector((state) => state.listProduct.products);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    let listData = [];
    for (let index = 0; index < rawData.length; index++) {
        let newData = rawData[index];
        if (newData.images.length >= 1) {
            newData.image = newData.images[0];
        }
        listData = [...listData, rawData[index]];
    }
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch.listProduct.getAll();
    }, []);

    const saveUser = (product) => {
        const newData = [...listData, {
            id: Math.floor(Math.random() * 10000) + 1,
            title: product.title,
            price: product.price,
            brand: product.brand,
            description: product.description,
        }]
        dispatch.listProduct.setData(newData);
        setOpen(false);
    };
    const RemoveUser = (value) => {
        confirm('hello');
        const newData = listData.filter((product) => product.id !== value);
        dispatch.listProduct.setData(newData);
    };

    const EditUser = (value) => {
    };

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img width={50} height={50} src={text}/>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Brand',
            key: 'brand',
            dataIndex: 'brand',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => EditUser(record.id)}>Edit</Button>
                    <Button danger onClick={() => RemoveUser(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];
    console.log("user page render");
    return (
        <>
            <Button type='primary' onClick={showModal}>Add Product</Button>
            <Excel
                fileName="export-Product"
                data={[
                    {
                        columns: [
                            {
                                title: "Title",
                                dataIndex: "title",
                                width: 20,
                            },
                            {
                                title: "Price",
                                dataIndex: "price",
                                width: 20,
                            },
                            {
                                title: "brand",
                                dataIndex: "brand",
                                width: 50,
                            },
                        ],
                        data: listData,
                        tabName: "info",
                    },
                    {
                        columns: [
                            {
                                title: "Description",
                                dataIndex: "description",
                                width: 30,
                            },
                            {
                                title: "Category",
                                dataIndex: "category",
                                width: 30,
                            },
                        ],
                        data: listData,
                        tabName: "contact",
                    },
                ]}
            >
                <Button>Export Product</Button>
            </Excel>
            <Modal
                title="Add Product"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={saveUser}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="brand"
                        label="Brand"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <SubmitButton form={form} />
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                columns={columns}
                dataSource={listData}
                pagination={{
                    pageSize: 15,
                }}
            />
        </>
    )
}