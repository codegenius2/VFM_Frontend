import React, { useState, useEffect } from 'react';
import { RiCameraLine } from 'react-icons/ri';
import { Modal, Button, message } from 'antd';
import { IoIosSettings } from "react-icons/io";
import toast from "react-hot-toast";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../store/slices/userSlice'

const BackUploader = ({ img }) => {
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);
    const [back, setBack] = useState({});
    const [isSetting, setIsSetting] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const token = localStorage.getItem("token");
    const [messageApi, contextHolder] = message.useMessage();

    const handleSetBack = (e) => {
        const file = e.target.files[0];
        setBack(file);
        setPreviewImage(URL.createObjectURL(file));
        setIsModalVisible(true);
    };

    const handleConfirm = async () => {
        setIsSetting(true);
        const data = new FormData();
        let message = "アップロードに失敗しました。";
        data.append('background_image', back);
        const res = await axios.post('/user/background-image', data);
        if (res?.status === 200) {
            messageApi.open({
                type: 'success',
                content: '背景画像が更新されました。',

            });
            dispatch(getUser(token));
        } else {
            messageApi.open({
                type: 'error',
                content: '背景画像の更新に失敗しました。',
            });
        }

        await setIsSetting(false);
        await setIsModalVisible(false);
        toast.success(message)
    };


    const handleCancel = () => {
        setIsModalVisible(false);
        setPreviewImage('');
        setBack({});
    };

    return (
        <div className="flex">
            {contextHolder}
            <label
                htmlFor="file-input1"
                className={`relative cursor-pointer`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <input
                    type="file"
                    id="file-input1"
                    name="back"
                    className="hidden"
                    onChange={e => handleSetBack(e)}
                />

                <img
                    className={`h-[300px] w-auto object-cover transition-opacity duration-500 ${hovered ? 'opacity-50' : 'opacity-100'}`}
                    src={img}
                    alt="wait"
                />

                {hovered && (
                    <span className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-inherit rounded-full flex items-center justify-center w-40 h-40">
                            <RiCameraLine className='text-white w-36 h-36' />
                        </div>
                    </span>
                )}
            </label>

            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        キャンセル
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleConfirm} icon={<IoIosSettings />} loading={isSetting}>
                        設定
                    </Button>,
                ]}
            >
                <div className="p-7">
                    <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
                </div>
            </Modal>
        </div>
    )
}

export default BackUploader;
