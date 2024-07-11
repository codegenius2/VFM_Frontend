import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import footer_payment from "../../assets/images/payment.png";
import AMEX from '../../assets/images/card/AMEX.png'
import JCB from '../../assets/images/card/JCB.png'
import Visa from '../../assets/images/card/Visa.png'
import Dinner from '../../assets/images/card/dinner.png'
import master from '../../assets/images/card/master.png'


const FooterContent = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className="footer_box flex lg:justify-around lg:flex-row items-center flex-col sm:gap-10 gap-5 px-20 py-10 md:px-10">
                <div className='flex md:flex-row sm:gap-5 lg:gap-8 gap-3  flex-col'>
                    <a className="fotter_link m-0 cursor-pointer" onClick={() => { navigate("/About-Us") }}>{t("ABOUT_US")}</a>
                    <a className="fotter_link m-0 cursor-pointer" onClick={() => { navigate("/Inquiry") }}>{t("INQUIRY")}</a>
                    <a className="fotter_link m-0 cursor-pointer" onClick={() => { navigate("/Faq") }}>{t("HELP_AND_FAQ")}</a>
                    <a className="fotter_link m-0 cursor-pointer" onClick={() => { navigate("/Privacy-Policy") }}>{t("PRIVACY_POLICY")}</a>
                    <a className="fotter_link m-0 cursor-pointer" onClick={() => { navigate("/terms-of-service") }}>{t("TERMS_OF_SERVICE")}</a>
                </div>
                <div className="grid md:grid-cols-5 gap-4 grid-rows">
                    <img className="w-28 h-16 overflow-hidden object-cover" src={AMEX} />
                    <img className="w-28 h-16 overflow-hidden object-cover" src={JCB} />
                    <img className="w-28 h-16 overflow-hidden object-cover" src={Visa} />
                    <img className="w-28 h-16 overflow-hidden object-cover" src={Dinner} />
                    <img className="w-28 h-16 overflow-hidden object-cover" src={master} />
                </div>

            </div>
            <div className="virtual-line text-center">
                <p>@2024 VIRTUAL FASHION MALL produced<br className='block md:hidden' /> by Studio ARATA</p>
            </div>

        </>
    );
};

export default FooterContent;

