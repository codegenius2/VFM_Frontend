import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Breadcrumb, Badge } from 'antd';
import { Link } from "react-router-dom";
import image108 from "../../assets/images/image 108.png";


function Aboutus() {
    const [age, setAge] = useState('');
    const { t, i18n } = useTranslation();

    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"ABOUT_US"} /> */}
            <section id="main-section" className="cart-section-main-1 flex py-10">
                <div id="login" className="py-5">
                    <Breadcrumb
                        className="p-5"
                        separator=">"
                        items={[
                            {
                                title: 'TOP PAGE',
                                href: '/'
                            },
                            {
                                title: '私たちについて',
                            },
                        ]}
                    />

                    <Badge.Ribbon text={t("私たちについて")} color="red" className="mt-4 p-2 px-7 text-xl" >
                        <div className="main-box-howtowear">
                            <p className="font-bold text-[20px] mb-4">
                            運営会社<Link to="/login" className="text-blue-800 text-[20px] font-bold ml-1">株式会社Studio ARATA</Link>
                            </p>
                            <img className="w-full" src={image108} alt="wait" />
                        </div>
                    </Badge.Ribbon>

                </div>
            </section >
        </>
    );
}

export default Aboutus;