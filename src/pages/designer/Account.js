import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CustomModal from "../../components/custommodal"
import BackUploader from "../../components/common/ImageUploader/back";
import AvatarUploader from "../../components/common/ImageUploader/avatar";

import Sidebar from "../../components/sidebar";
import FormModal from "../../components/common/modal/form";
import SuccessModal from "../../components/common/modal/success";
import { useSelector } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #6F6F6F',
    boxShadow: 24,
    p: 4,
};

function Desigenerprofile() {
    const { t, i18n } = useTranslation();

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
    const [chatRegister, setChatRegister] = useState(false);
    const hadnleOpenForm = () => setOpenForm(true);
    const hadnleCloseForm = () => setOpenForm(false);

    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const closefun = () => {
        hadnleCloseForm();
        handleOpen1();
    };

    const { user } = useSelector(state => state.user)

    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"Creator Request"} /> */}
            <section id="banner-section">
                <BackUploader img={user?.user?.background_image} alt='wait' />
                <div className="request-banner-details">
                    <AvatarUploader img={user?.user?.background_image} alt='wait' />
                    <div className="relative">
                        <h1 className="m-0">@REQUEST_USER000</h1>
                        <p className="m-0">依頼専門。好きなジャンル➡サイバーパンク・和・等々</p>
                    </div>
                    <button
                        onClick={hadnleOpenForm}
                        className="flex gap-4 relative  text-white px-3 w-28 rounded-lg text-center bg-blue-700 border-none justify-center hover:opacity-50 duration-500 shadow-md shadow-gray-500"
                    >
                        {t("To Edit")}
                    </button>

                </div>
                <button
                    className="flex gap-4 md:top-[-50px] relative text-white px-3 py-1 rounded-lg text-center bg-blue-700 border-none justify-center ml-56 hover:opacity-50 duration-500 shadow-md shadow-gray-500"
                    onClick={() => { openPopUp("プロフィールの登録が完了しました") }}
                >
                    CLIENAT
                </button>
            </section>
            <section className="request-cards">
                <Sidebar />
                <div className="border border-solid border-gray-500 shadow-md bg-white p-7">

                    <h1 className="border-b-7 border-blue-600 text-xl w-36">{t("MY PROFILE")}</h1>
                    <h1 className="border-b-7 border-blue-600 text-xl w-36 mb-5">{t("BANK ACCOUNTS")}</h1>
                    <div className="flex gap-3 flex-wrap justify-center">
                        <div className="request-image-cart-designer text-gray-400">
                            <div className="flex items-baseline">
                                <p className="w-[200px] text-left">種別</p>
                                <div className="mb-2">
                                    <div className="flex">
                                        <input className="mr-2" type="radio" id="html" name="fav_language" value="HTML" />
                                        <p className="m-0">銀行（ゆうちょ以外）・信用金庫など </p>
                                    </div>
                                    <div className="flex">
                                        <input className="mr-2" type="radio" id="html" name="fav_language" value="CSS" />
                                        <p className="m-0">ゆうちょ銀行 </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex items-baseline mt-2 mb-2">
                                <p className="w-[200px] text-left">金融機関・支店</p>
                                <p className="w-[200px] text-left">銀行（ゆうちょ以外）・信用金庫など </p>
                            </div>
                            <hr />
                            <div className="flex items-baseline mt-2 mb-2">
                                <p className="w-[200px] text-left">種別</p>
                                <div className="mt-2 mb-2">
                                    <div className="flex">
                                        <input className="mr-2" type="radio" id="html" name="fav_language" value="HTML" />
                                        <p className="m-0">銀行（ゆうちょ以外）・信用金庫など </p>
                                    </div>
                                    <div className="flex">
                                        <input className="mr-2" type="radio" id="html" name="fav_language" value="CSS" />
                                        <p className="m-0">ゆうちょ銀行 </p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex items-baseline">
                                <p className="w-[200px] text-left">種別</p>
                                <div className="w-100per mt-2 mb-2">
                                    <input className="fav_text_desinger flex ml-10 mb-2" type="text" id="html" name="fav_language" />
                                    <p className="m-0">銀行（ゆうちょ以外）・信用金庫など </p>
                                </div>
                            </div>
                            <hr />
                            <div className="flex items-baseline">
                                <p className="w-[200px] text-left">種別</p>
                                <div className="w-100per mt-2 mb-2">
                                    <input className="fav_text_desinger flex ml-10 mb-2" type="text" id="html" name="fav_language" />
                                    <p className="m-0">銀行（ゆうちょ以外）・信用金庫など </p>
                                </div>
                            </div>
                            <button
                                onClick={() => { openPopUp("Account registration completed") }}
                                className="designer_profile_main_btn"
                            >
                                {t("Register an account")}
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-[#F4003A] mt-5 mb-5">{t("Payment will be made on the 15th of the following month (tentative), closing at the end of the month.")}</p>
                </div>
            </section>
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
                title="定型文の登録が完了しました。"
            />
        </>
    );
}

export default Desigenerprofile;
