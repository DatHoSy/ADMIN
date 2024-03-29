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


export const User = () => {
    const dispatch = useDispatch();
    let listData = useSelector((state) => state.listUser.dataUser);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [user, setUser] = useState({});
    const [isEdit, setIsEdit] = useState(false);
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
        dispatch.listUser.getAll();
    }, []);

    const saveUser = (user) => {
        if (isEdit) {
            const oldListUser = listData.filter((preUser) => preUser.id !== user.id);
            const newUser = listData.filter((preUser) => preUser.id === user.id);
            newUser.id = user.id;
            newUser.firstName = user.firstName;
            newUser.birthDate = user.birthDate;
            newUser.email = user.email;
            newUser.phone = user.phone;
            console.log(newUser);
            oldListUser.push(newUser);
            dispatch.listUser.setData();
            setIsEdit(false);
            return;
        }
        const newData = [...listData, {
            id: Math.floor(Math.random() * 10000) + 1,
            firstName: user.firstName,
            birthDate: user.birthDate,
            email: user.email,
            phone: user.phone,
        }]
        dispatch.listUser.setAddData(newData);
        setOpen(false);
    };
    const RemoveUser = (value) => {
        const newData = listData.filter((user) => user.id !== value);
        dispatch.listUser.setData(newData);
    };

    const EditUser = async (value) => {
        const newUser = listData.filter((user) => user.id === value);
        setUser(...newUser);
        setIsEdit(true);
        setTimeout(() => {
            form.resetFields();
        }, 1);
        setOpen(true);
        console.log(...newUser);
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
            <Button type='primary' onClick={showModal}>Add User</Button>
            <Excel
                fileName="export-user"
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
                        data: listData,
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
                        data: listData,
                        tabName: "contact",
                    },
                ]}
            >
                <Button>Export users</Button>
            </Excel>
            <h1>{user.firstName}</h1>
            <Modal
                title="Add User"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} name="validateOnly" layout="vertical" initialValues={user} autoComplete="off" onFinish={saveUser}>
                    <Form.Item
                        name="id"
                        label="id"
                        hidden='true'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
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
                        name="birthDate"
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
                        name="email"
                        label="Email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
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