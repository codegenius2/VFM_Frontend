import React, { useState, useEffect } from "react";

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input, Radio } from 'antd';
import { MdPublishedWithChanges } from "react-icons/md";
import { useTranslation } from "react-i18next";
import EditFormModal from "../common/modal/EditForm";
import axios from "axios";
import SuccessModal from "../common/modal/success";
import VFM_Avatar from "../common/avatar";

const BankTable = ({ tableData, refresh }) => {
    const [t] = useTranslation();
    const [dataSource, setDataSource] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [open, setOpen] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [popupdata, setPopupdata] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [loading, setLoading] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const handleConfirm = () => setOpenConfirm(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const hadnleOpenForm = () => setOpenForm(true);
    const hadnleCloseForm = () => setOpenForm(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const closefun = () => {
        hadnleCloseForm();
        handleOpen1();
    };


    useEffect(() => {
        setDataSource(tableData?.map((item) => {
            let newItem = {};
            newItem.id = item?.id;
            newItem.username = item?.user?.username;
            newItem.avatar = item?.user?.avatar;
            newItem.account_type = item?.account_type;
            newItem.financial_institution = item?.financial_institution;
            newItem.created_at = item?.created_at?.slice(0, 10);
            newItem.account_holder_name = item?.account_holder_name;
            newItem.bank_type = item?.bank_type;
            newItem.account_number = item?.account_number;
            return newItem
        }))
    }, [tableData])

    const handleUpdate = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleModalOk = async (record) => {
        setIsLoadingUpdate(true);
        await axios.put('bank-info/' + record.id, record)
            .then(res => {
                message.success('更新に成功しました!');
                refresh();
            })
            .catch(err => {
                message.error('更新に失敗しました!');
            });
        setIsLoadingUpdate(false);
        setIsModalVisible(false);

    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (record) => {
        await axios.delete('bank-info/' + record?.id)
            .then(res => {
                message.success('削除に成功しました!');
                refresh();
            })
            .catch(err => {
                message.error('削除に失敗しました!');
            });;
        const newData = dataSource.filter(item => item.id !== record.id);
        setDataSource(newData);
        refresh();
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
            title: '種別',
            dataIndex: 'bank_type',
            key: 'bank_type',
        },
        {
            title: '金融機関・支店',
            dataIndex: 'financial_institution',
            key: 'financial_institution',
        },
        {
            title: '口座種別',
            dataIndex: 'account_type',
            key: 'account_type',
        },
        {
            title: '口座番号',
            dataIndex: 'account_number',
            key: 'account_number',
        },
        {
            title: '口座名義人',
            dataIndex: 'account_holder_name',
            key: 'account_holder_name',
        },
        {
            title: '',
            key: 'action',
            width: '20%',
            render: (text, record) => (
                <Space size="middle" className="mb-4">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleUpdate(record)} >{t("更新")}</Button>
                    <Popconfirm
                        title="本当に削除しますか？"
                        onConfirm={() => handleDelete(record)}
                        okText="はい"
                        cancelText="いいえ"
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
                title="銀行口座情報の更新"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                footer={<></>}
            >
                <div className="py-5 text-gray-400 text-right">
                    <Form
                        initialValues={selectedRecord}
                        onFinish={handleModalOk}
                    >
                        <Form.Item name="id">
                        </Form.Item>
                        <Form.Item name="bank_type" label="種別" rules={[{ required: true, message: '銀行の種類を選択してください！' }]}>
                            <Radio.Group className="col-span-8">
                                <Space direction="vertical" className="flex items-start">
                                    <Radio value="ゆうちょ銀行">銀行（ゆうちょ以外）・信用金庫など</Radio>
                                    <Radio value="信用金庫">ゆうちょ銀行</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="金融機関・支店"
                            name="financial_institution"
                            rules={[{ required: true, message: '金融機関を入力してください！' }]}>
                            <Input plachoder="銀行（ゆうちょ以外）・信用金庫など" className="col-span-8 text-left p-2" />
                        </Form.Item>
                        <Form.Item
                            label="口座種別"
                            name="account_type"
                            rules={[{ required: true, message: 'アカウントの種類を選択してください！' }]} >
                            <Radio.Group className="col-span-8">
                                <Space direction="horizontal" className="flex items-start">
                                    <Radio value="普通">普通</Radio>
                                    <Radio value="当座">当座</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="口座番号"
                            name="account_number"
                            rules={[
                                { required: true, message: '口座番号を入力してください！' },
                                { pattern: /^[0-9]+$/, message: '口座番号は数字でなければならない！' },
                            ]}
                        >
                            <Input className="w-full border rounded-sm p-2 mb-2" type="text" id="html" name="account_number" />
                        </Form.Item>
                        <Form.Item
                            label="口座名義人"
                            name="account_holder_name"
                            rules={[{ required: true, message: '口座名義を入力してください！' }]}>
                            <Input className="w-full border rounded-sm p-2 mb-2" type="text" id="html" name="account_holder_name" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={loading}
                                type="primary" htmlType="submit"
                                className="w-full p-5 my-5"
                                icon={< MdPublishedWithChanges />}
                            >
                                {t("銀行情報を更新")}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal >
        </>
    );
}

export default BankTable;