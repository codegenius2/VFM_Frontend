import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import CustomModal from "../../components/custommodal"
import RegFormModal from "../../components/common/modal/RegForm";
import SuccessModal from "../../components/common/modal/success";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { DesignerData } from '../../constant/data'
import ImageShow from "../../components/common/ImageUploader/show";
import axios from "axios";
import { useParams } from 'react-router-dom';

const DesignerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [creators, setCreators] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            try {
                const response = await axios.get('/creators/' + id);
                setCreators(response?.data?.creators);
            } catch (e) {
                console.log(e);
            }
        };

        fetchCreator();
    }, [id]);

    const [open, setOpen] = useState(false);
    const [popupdata, setPopupdata] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openConfirm, setOpenConfirm] = useState(false);
    const handleConfirm = () => setOpenConfirm(true);
    const handleConfirmClose = () => setOpenConfirm(false);

    const openPopUp = (data) => {
        setPopupdata(data);
        handleClose();
        handleConfirm();
    }
    const [openForm, setOpenForm] = useState(false);
    const [open1, setOpen1] = useState(false);
    const hadnleOpenForm = () => setOpenForm(true);
    const hadnleCloseForm = () => setOpenForm(false);

    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const closefun = () => {
        hadnleCloseForm();
        handleOpen1();
    };

    const handleRegister = () => {
        handleClose()
    }

    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"Creator"} /> */}
            <section id="banner-section">
                <ImageShow img={creators?.user?.background_image} alt='wait' isBack={true} />
                <div className="relative">
                    <div className="relative flex top-[-60px] md:justify-start md:left-20 justify-center">
                        <ImageShow img={creators?.user?.avatar} alt='wait' isBack={false} />
                    </div>
                    <div className="md:relative md:top-[-120px] left-56">
                        <h1 className="m-0">{creators?.user?.username}</h1>
                        <p className="m-0">{creators?.user?.bio}</p>
                    </div>
                    <Button type="primary" className="flex md:relative md:top-[-60px] top-[-30px] left-32 text-white p-2 px-10 rounded-lg text-center">{t("CREATER")}</Button>
                </div>

            </section>

            <section className="bg-gray-100 md:p-16 p-4 pr-2 gap-2 justify-center md:py-20 grid grid-cols-12">
                <div className="col-span-12  shadow-md shadow-gray-200 bg-white overflow-scroll p-5 max-h-screen">
                    <div >
                        <h1 className="border-b-7 border-blue-600 text-xl my-8 ml-3">{creators?.user?.username}</h1>
                        <div className="flex gap-5 flex-wrap justify-center">
                            {creators?.products?.map((product) => (
                                <div key={product?.id} onClick={() => { navigate('/product/' + product?.id) }} className="w-60 shadow-lg shadow-gray-500 relative">
                                    <img src={product.image} className="w-full"></img>
                                    <div className="px-4 py-[2px] text-xs bg-badge w-auto rounded-lg text-white text-center absolute top-2 left-2">
                                        <p className="font-semibold">Gallery</p>
                                        <span>{product.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >
            </section >
            <CustomModal open={open} handleClose={handleClose}>
                <div>
                    <p className="text-badge font-bold">{t("Edit Username")}</p>
                    <input
                        className="p-2 w-[90%] border border-gray-400"
                        type="text"
                        placeholder="例）USER_00000"
                    />
                    <p className="text-badge font-bold">{t("Edit Your Introduction")}</p>
                    <textarea
                        className="p-2 w-[90%] border border-gray-400 h-[150px]"
                        type="text"
                        placeholder="例）はじめまして。好きなジャンルは〇〇です。"
                    />
                    <button
                        onClick={() => { openPopUp("Registration of profile has been completed") }}
                        className="register-popup-value"
                    >
                        {t("Register")}
                    </button>
                </div>
            </CustomModal>
            <CustomModal open={open} handleClose={handleClose}>
                <div>
                    <h1 className="text-lg text-badge font-bold">ユーザーネームを編集する</h1>
                    <input className="p-4 w-full border border-solid border-gray-800" type="text" placeholder="例）USER_00000" />
                    <h1 className="text-lg text-badge font-bold mt-3">自己紹介を編集する</h1>
                    <textarea className="w-full h-40 border border-solid border-gray-800 p-4" placeholder="例）はじめまして。好きなジャンルは〇〇です。" />
                    <p>あと100文字（全角）</p>
                    <button onClick={() => { handleRegister() }} className="w-1/3 p-2.5 border-none bg-gray-800 text-white rounded-md block mx-auto mt-6 hover:opacity-50 duration-500 shadow-md shadow-gray-500">登録する</button>
                </div>
            </CustomModal>
            <CustomModal open={openConfirm} handleClose={handleConfirmClose}>
                <div>
                    <p className="text-center">{t(popupdata)}</p>
                </div>
            </CustomModal>
            <RegFormModal open={openForm} onCancel={hadnleOpenForm} onConfirm={closefun} />
            <SuccessModal open={open1}
                onCancel={handleClose1}
                title="定型文の登録が完了しました。"
            />
        </>
    );
}

export default DesignerProfile;


