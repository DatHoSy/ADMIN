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
    let listData = useSelector((state) => state.listUser);
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
        dispatch.listUser.getAll();
    }, []);

    const saveUser = (user) => {
        const newData = [...listData.dataUser, {
            id: Math.floor(Math.random() * 10000) + 1,
            firstName: user.FirstName,
            birthDate: user.BirthDate,
            email: user.Email,
        }]
        dispatch.listUser.setAddData(newData);
        setOpen(false);
    };
    const RemoveUser = (value) => {
        const newData = listData.dataUser.filter((user) => user.id !== value);
        dispatch.listUser.setData(newData);
    };

    const EditUser = (user) => {
        // dataUser.forEach( userList =>{
        //     if (userList.key == user.key) {
        //         return userList.name = user.name;
        //     }
        // })
        // setDataUser([...data]);
    };

    const columns = [
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
                        data: listData.dataUser,
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
                        data: listData.dataUser,
                        tabName: "contact",
                    },
                ]}
            >
                <Button>Export users</Button>
            </Excel>
            <Modal
                title="Add User"
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
                dataSource={listData.dataUser}
                pagination={{
                    pageSize: 15,
                }}
            />
        </>
    )
}