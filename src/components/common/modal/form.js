import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";
import axios from 'axios';


const FormModal = ({ open, onCancel, onConfirm }) => {

    const [isOpen, SetIsOpen] = useState(true);
    const [content, setContent] = useState('');
    const handleOpen = () => {
        SetIsOpen(true);
    }
    const handleClose = () => SetIsOpen(false);
    const handleClick = async () => {
        const res = await axios.post('/templates', { content: content })
            .then(response => {
                message.success('success!');
            })
            .catch(error => {
                message.error('There was an error!', error?.response?.data?.message);
            });
        setContent("")
        onConfirm()
    }

    const handleChange = (e) => setContent(e.target.value)

    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                footer={<></>}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                width={900}
            >
                <div className="p-4 md:p-10 bg-white justify-center m-30 items-center border-none">
                    <p className="mb-20">定型文を登録する（５つまで登録可能です。）</p>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <textarea
                                onChange={handleChange}
                                id="description"
                                rows="4"
                                value={content}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="例）はじめまして。これからお取引よろしくお願いします。">

                            </textarea>
                        </div>
                    </div>
                    <p>あと200文字（全角）</p>
                    <div className="flex flex-col justify-center items-center gap-5">
                        <Button type="primary" icon={<BiSolidMessageRoundedEdit />} size="large" className="px-12 bg-blue" onClick={handleClick}>
                            登録する</Button>
                        <Button type="primary" icon={<RiDeleteBin5Line />} size="large" className="px-12 bg-red-500">
                            削除する</Button>

                    </div>
                </div>
            </Modal>
        </>
    );

}

export default FormModal;

