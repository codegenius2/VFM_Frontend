import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo/LOGO.png';
import burgermenu from "../../assets/images/burgermenu.png";



const TopBar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const pagetitle = "VRTUAL FASHION MALL に クリエイター または、ユーザーとして登録する"

    return (
        <>
            <div className="bg-blue-800 text-white cursor-pointer" onClick={() => { navigate("/auth") }}>
                <p className="m-0 text-center p-3.5 font-bold text-[13px]">{t(pagetitle)}</p>
            </div>
            <div className="p-3 flex flex-row items-center justify-start h-b-1 bg-navbar">
                <img className="logo-width" onClick={() => navigate('/')} src={logo} alt="Logo" />
                <div className="space-div"></div>
                <p className="tracking-wide">VIRTUAL&nbsp; FASHION&nbsp; MALL</p>
            </div>
        </>
    )
}

export default TopBar;
