import React, { useState, useEffect } from 'react';
import { RiCameraLine } from 'react-icons/ri';
import { Modal, Button, message } from 'antd';
import { IoIosSettings } from "react-icons/io";
import toast from "react-hot-toast";
import axios from 'axios';
import { getUser } from '../../../store/slices/userSlice'
import { useDispatch } from 'react-redux';

const AvatarUploader = ({ img }) => {
    const [hovered, setHovered] = useState(false);
    const [avatar, setAvatar] = useState({});
    const dispatch = useDispatch()
    const [back, setBack] = useState({});
    const [isSetting, setIsSetting] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [messageApi, contextHolder] = message.useMessage();

    const handleSetAvatar = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setPreviewImage(URL.createObjectURL(file));
        setIsModalVisible(true);
    };

    const token = localStorage.getItem("token");

    const handleConfirm = async () => {
        setIsSetting(true);
        const data = new FormData();
        let message = "アップロードに失敗しました。";
        data.append('avatar', avatar);
        const res = await axios.post('/user/avatar', data);
        if (res?.status === 200) {
            messageApi.open({
                type: 'success',
                content: 'アバターが更新されました。',

            });
            dispatch(getUser(token));
        } else {
            messageApi.open({
                type: 'error',
                content: 'アバターの更新に失敗しました。',
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
                htmlFor="file-input"
                className={`relative cursor-pointer w-32}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img
                    src={img}
                    alt="Upload"
                    className={`w-32 h-32 object-cover shadow-md shadow-gray-400 rounded-full transition-opacity duration-500 ${hovered ? 'opacity-50' : 'opacity-100'}`}
                />

                <input
                    type="file"
                    id="file-input"
                    name="avatar"
                    className="hidden"
                    onChange={e => handleSetAvatar(e)}
                />
                {hovered && (
                    <span className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-inherit rounded-full flex items-center justify-center w-16 h-16">
                            <RiCameraLine className='text-white w-16 h-16' />
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
    );
}

export default AvatarUploader;
