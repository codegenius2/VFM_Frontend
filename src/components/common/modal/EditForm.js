import React, { useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';
import { BiSolidMessageRoundedEdit } from 'react-icons/bi';
import axios from 'axios';
import { getUser } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const EditFormModal = ({ open, onCancel, onConfirm }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = async () => {

    }

    useEffect(() => {
        const newErrors = {};
        if (username?.length === 0) {
            newErrors.username = 'ユーザー名が入力されていません。入力してください。';
        } else if (username?.length > 20) {
            newErrors.username = '全角20文字以内';
        } else {
            newErrors.username = "";
        }
        if (email?.length === 0) {
            newErrors.email = '自己紹介が入力されていません。入力してください。!';
        }
        if (firstName?.length === 0) {
            newErrors.firstName = '自己紹介が入力されていません。入力してください。!';
        }
        if (lastName?.length === 0) {
            newErrors.lastName = '自己紹介が入力されていません。入力してください。!';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
    }, [username, firstName, lastName])

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            width={900}
        >
            <div className="p-4 md:p-10 bg-white justify-center m-30 items-center border-none">
                <p className="mb-4">ユーザーネームを編集する</p>
                <Input
                    placeholder="例）USER_00000"
                    className="w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                <div className="grid gap-4 py-4 grid-cols-2">
                    <p>自己紹介を編集する</p>
                    <div className="col-span-2">
                        <Input
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="例）はじめまして。好きなジャンルは〇〇です。"
                            id="description"
                            rows={4}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        <Input
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="例）はじめまして。好きなジャンルは〇〇です。"
                            id="description"
                            rows={4}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                        <Input
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="例）はじめまして。好きなジャンルは〇〇です。"
                            id="description"
                            rows={4}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}

                    </div>

                </div>

                <p>あと100文字（全角）</p>
                <div className="flex flex-col justify-center items-center gap-5">
                    <Button
                        type="primary"
                        icon={<BiSolidMessageRoundedEdit />}
                        size="large"
                        className="px-12 bg-black"
                        onClick={handleSubmit}
                    >
                        登録する
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditFormModal;
