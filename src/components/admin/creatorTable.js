import React, { useState, useEffect } from "react";
import elipic from "../../assets/images/Ellipse 24.png";
import SuccessModal from "../common/modal/success";
import VFM_Avatar from "../common/avatar";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input, DatePicker } from 'antd';

import { useTranslation } from "react-i18next";
import EditFormModal from "../common/modal/EditForm";
import axios from "axios";

const CreatorTable = ({ tableData, refresh }) => {
    const [t] = useTranslation();
    const [dataSource, setDataSource] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [open, setOpen] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [popupdata, setPopupdata] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const handleConfirm = () => setOpenConfirm(true);

    const [openForm, setOpenForm] = useState(false);
    const [open1, setOpen1] = useState(false);
    const hadnleOpenForm = () => setOpenForm(true);
    const hadnleCloseForm = () => setOpenForm(false);

    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const closefun = () => {
        hadnleCloseForm();
        handleOpen1();
    };


    useEffect(() => {
        setDataSource(tableData?.map((item) => {
            let newItem = {};
            newItem.id = item?.user?.id;
            newItem.avatar = item?.user?.avatar;
            newItem.username = item?.user?.username;
            newItem.email = item?.user?.email;
            newItem.created_at = item?.created_at?.slice(0, 10);
            newItem.first_name = item?.user?.first_name;
            newItem.last_name = item?.user?.last_name;
            newItem.date_of_birth = item?.user?.date_of_birth;
            return newItem
        }))
    }, [tableData])

    const handleUpdate = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleModalOk = async (record) => {
        setIsLoadingUpdate(true);
        await axios.put('creators/' + record.id, record)
            .then(res => {
                message.success('Updated successfully!');
                refresh();
            })
            .catch(err => {
                message.error('Failed!');
            });
        setIsLoadingUpdate(false);
        setIsModalVisible(false);

    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (record) => {
        await axios.delete('creators/' + record?.id);
        const newData = dataSource.filter(item => item.id !== record.id);
        setDataSource(newData);
        refresh();
        message.success('Deleted successfully');
    };

    const columns = [
        {
            title: 'ユーザー名',
            dataIndex: 'username',
            key: 'username',
            render: (text, record) => (
                <div className="flex flex-row items-center">
                    <VFM_Avatar img={record.avatar} size={16} />
                    <p className="ml-3">{text}</p>
                </div>
            )

        },
        {
            title: '登録日',
            dataIndex: 'created_at',
            key: 'agecreated_at',
        },
        {
            title: '氏',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: '名',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'メールアドレス',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'パスワード',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
        },
        {
            title: '',
            key: 'action',
            width: '20%',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleUpdate(record)} >{t("更新")}</Button>
                    <Popconfirm
                        title="Are you sure delete this record?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} >{t("削除")}</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <>
            <div className="py-12">
                <h1 className="text-sm w-48 left-0 relative right-0 ml-auto border-b-2 border-badge pb-1 text-right m-2">クリエイターの総数　{dataSource?.length}名</h1>
                <Table dataSource={dataSource} columns={columns} />
            </div>
            <EditFormModal open={openForm} onCancel={hadnleCloseForm} onConfirm={closefun} />
            <SuccessModal open={open1}
                onCancel={handleClose1}
                title="プロフィールを編集しました。"
            />
            <SuccessModal open={open2}
                onCancel={handleClose2}
                title="プロフィールを削除しました。"
            />
            <Modal
                title="Update Record"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                footer={<></>}
            >
                <Form
                    initialValues={selectedRecord}
                    onFinish={handleModalOk} // Handle form submission
                >
                    <Form.Item
                        label="username"
                        name="username"
                        rules={[{ required: true, message: 'Please input the username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="firstname"
                        name="first_name"
                        rules={[{ required: true, message: 'Please input the firstname!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="lastname"
                        name="last_name"
                        rules={[{ required: true, message: 'Please input the lastname!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{ required: true, message: 'Please input the email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="id"
                    >
                    </Form.Item>

                    {/* Additional form fields can be added as needed */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" icon={<EditOutlined />} loading={isLoadingUpdate}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default CreatorTable;