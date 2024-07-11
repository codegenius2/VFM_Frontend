import React, { useState, useEffect } from "react";
import Rectangle88 from "../../assets/images/Rectangle 88.png";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import CustomModal from "../../components/custommodal"
import FormModal from "../../components/common/modal/form";
import SuccessModal from "../../components/common/modal/success";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { requestData } from '../../constant/data'
import ImageShow from "../../components/common/ImageUploader/show";
import { useSelector } from "react-redux";

const RequesterProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [client, setClient] = useState();
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


    // const { requirement } = useSelector(state => state.common)
    const fetchCreator = async () => {
        try {
            const response = await axios.get('/clients/' + id);
            setClient(response?.data?.client);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchCreator()
    }, [])

    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"Creator"} /> */}
            <section id="banner-section">
                <ImageShow img={Rectangle88} alt='wait' isBack={true} />
                <div className="relative">
                    <div className="relative flex top-[-60px] md:justify-start md:left-20 justify-center">
                        <ImageShow img={client?.user?.avatar} alt='wait' isBack={false} />
                    </div>
                    <div className="md:relative md:top-[-100px] mt-[-20px] left-56">
                        <h1 className="m-0">{client?.user?.username}</h1>
                        <p className="m-0">{client?.user?.bio}</p>
                    </div>
                    <Button type="primary" className="flex md:relative md:mt-0 mt-10 md:top-[-70px] top-[-30px] left-32 text-white p-2 px-10 rounded-lg text-center">{t("CLIENT")}</Button>
                </div>
            </section>

            <section className="bg-gray-100 md:p-16 p-4 pr-2 gap-2 justify-center md:py-20 grid grid-cols-12">
                <div className="col-span-12  shadow-md shadow-gray-200 bg-white overflow-scroll p-5 max-h-screen">
                    <div>
                        <h1 className="border-b-7 border-blue-600 text-xl my-8 ml-3">{client?.user?.username}</h1>
                        <div className="flex gap-5 flex-wrap justify-center">
                            {client?.requirements.map((requirement) => (
                                <div key={requirement.id} onClick={() => { navigate('/requirement/' + requirement.id) }} className="w-60 shadow-lg shadow-gray-500 relative">
                                    <img src={requirement.image} className="w-full h-80"></img>
                                    <div className="px-4 text-xs py-1 bg-badge w-auto rounded-lg text-white text-center absolute top-2 left-2">
                                        <p className="font-semibold">REGUEST</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
                    <button onClick={() => { handleClose() }} className="w-1/3 p-2.5 border-none bg-gray-800 text-white rounded-md block mx-auto mt-6 hover:opacity-50 duration-500 shadow-md shadow-gray-500">登録する</button>
                </div>
            </CustomModal>
            <CustomModal open={openConfirm} handleClose={handleConfirmClose}>
                <div>
                    <p className="text-center">{t(popupdata)}</p>
                </div>
            </CustomModal>
            <FormModal open={openForm} onCancel={hadnleOpenForm} onConfirm={closefun} />
            <SuccessModal open={open1}
                onCancel={handleClose1}
                title="プロフィールの登録が完了しました"
            />
        </>
    );
}

export default RequesterProfile;


