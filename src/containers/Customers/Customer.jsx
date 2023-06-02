import { Space, Table, Tag, Button, Modal, Form, Input } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Excel from '../../components/Excel';

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


export const Customer = () => {
    const dispatch = useDispatch();
    let listData = useSelector((state) => state.listCustomer);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
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
        dispatch.listCustomer.getAll();
    }, []);

    const saveUser = (customer) => {
        const newData = [...listData.customers, {
            id: Math.floor(Math.random() * 10000) + 1,
            firstName: customer.FirstName,
            birthDate: customer.BirthDate,
            email: customer.Email,
        }]
        dispatch.listCustomer.setData(newData);
        setOpen(false);
    };
    const RemoveUser = (value) => {
        const newData = listData.customers.filter((customer) => customer.id !== value);
        dispatch.listCustomer.setData(newData);
    };

    const EditUser = (user) => {
    };

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img width={50} height={50} src={text}/>,
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'BirthDate',
            dataIndex: 'birthDate',
            key: 'birthDate',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
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
            <Button type='primary' onClick={showModal}>Add Customer</Button>
            <Excel
                fileName="export-Customer"
                data={[
                    {
                        columns: [
                            {
                                title: "User Id",
                                dataIndex: "id",
                                width: 5,
                            },
                            {
                                title: "Name",
                                dataIndex: "username",
                                width: 20,
                            },
                            {
                                title: "Email",
                                dataIndex: "email",
                                width: 50,
                            },
                        ],
                        data: listData.customers,
                        tabName: "info",
                    },
                    {
                        columns: [
                            {
                                title: "Name",
                                dataIndex: "username",
                                width: 30,
                            },
                            {
                                title: "Phone",
                                dataIndex: "phone",
                                width: 30,
                            },
                        ],
                        data: listData.customers,
                        tabName: "contact",
                    },
                ]}
            >
                <Button>Export Customer</Button>
            </Excel>
            <Modal
                title="Add Customer"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={saveUser}>
                    <Form.Item
                        name="FirstName"
                        label="FirstName"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="BirthDate"
                        label="BirthDate"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Email"
                        label="Email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Tags"
                        label="Tags"
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
                dataSource={listData.customers}
                pagination={{
                    pageSize: 15,
                }}
            />
        </>
    )
}