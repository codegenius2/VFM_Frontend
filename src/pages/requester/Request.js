import React, { useState } from "react";
import Rectangle88 from "../../assets/images/Rectangle 88.png";
import Ellipse24 from "../../assets/images/Ellipse 24.png";
import slideBox from "../../assets/images/image 35.png"
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'antd'
import VFM_Avatar from "../../components/common/avatar";
import { useParams } from 'react-router-dom';

function Request() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"REQUEST"}/> */}
            <section id="banner-section">
                <div class="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                    <img src={Rectangle88} alt="Sample Image" class="h-full w-auto object-cover" />
                </div>
                <div className="request-banner-details">
                    <VFM_Avatar img={Ellipse24} size={40} />
                    <div className="relative top-1 left-0">
                        <h1 className="mt-2">@REQUEST_USER000</h1>
                        <p className="m-0">{t("依頼専門。好きなジャンル")}</p>
                        <p>{t("サイバーパンク・和・等々")}</p>
                        <button className="absolute top-28 left-0 bg-black text-white px-8 py-0.5 rounded-lg text-center shadow-sm shadow-gray-400">{t("CLIENT")}</button>
                    </div>
                </div>
            </section>

            <section className="request-cards">
                <div className="card-box-request border-0 bg-transparent shadow-md shadow-gray-400">
                </div>
                <Badge.Ribbon text={t("REGUEST")} color="red" className="mt-4 p-2 px-7 text-xl" >
                    <div className="shadow-gray-300 shadow-md bg-white p-7 pt-20 ">
                        <div className="flex gap-3 flex-wrap justify-center mt-2">
                            <div onClick={() => { navigate("/request") }} className="request-image-cart">
                                <span>{t("REQUEST")}</span>
                                <img src={slideBox} className="w-full" />
                            </div>
                            <div onClick={() => { navigate("/request") }} className="request-image-cart">
                                <span>{t("REQUEST")}</span>
                                <img src={slideBox} className="w-full" />
                            </div>
                            <div onClick={() => { navigate("/request") }} className="request-image-cart">
                                <span>{t("REQUEST")}</span>
                                <img src={slideBox} className="w-full" />
                            </div>
                            <div onClick={() => { navigate("/request") }} className="request-image-cart">
                                <span>{t("REQUEST")}</span>
                                <img src={slideBox} className="w-full" />
                            </div>
                            <div onClick={() => { navigate("/request") }} className="request-image-cart">
                                <span>{t("REQUEST")}</span>
                                <h1>NO <br /> IMAGE</h1>
                            </div>
                        </div>
                    </div>
                </Badge.Ribbon >
            </section >

        </>
    );
}

export default Request;
