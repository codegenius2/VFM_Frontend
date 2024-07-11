import Header from "../components/header";
import { Breadcrumb } from 'antd';

import React, { useState } from "react";

import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import image91 from "../assets/images/image 91.png";

function Marketplace() {
    const { t, i18n } = useTranslation();
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const productsData = [
        {
            id: 1,
            image: image91,
            artist: "Kaiyo Aoki",
            title: "Eclipse of Elegance",
            price: "＄400.00"
        },
        {
            id: 1,
            image: image91,
            artist: "Kaiyo Aoki",
            title: "Eclipse of Elegance",
            price: "＄400.00"
        }, {
            id: 1,
            image: image91,
            artist: "Kaiyo Aoki",
            title: "Eclipse of Elegance",
            price: "＄400.00"
        }, {
            id: 1,
            image: image91,
            artist: "Kaiyo Aoki",
            title: "Eclipse of Elegance",
            price: "＄400.00"
        }, {
            id: 1,
            image: image91,
            artist: "Kaiyo Aoki",
            title: "Eclipse of Elegance",
            price: "＄400.00"
        }, {
            id: 1,
            image: image91,
            artist: "Kaiyo Aoki",
            title: "Eclipse of Elegance",
            price: "＄400.00"
        },
    ];

    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"ALL_ITEM"} /> */}
            <section id="main-section">
                <div className="py-12">
                    <Breadcrumb
                        className="p-5"
                        separator=">"
                        items={[
                            {
                                title: 'TOP_PAGE',
                                href: '/'
                            },
                            {
                                title: 'ALL_ITEM',
                            },
                        ]}
                    />

                    <div className="cart-bar">
                        <p>{t('ALL_ITEM')}</p>
                    </div>
                    <div className="mt-16 flex items-center gap-7.5 flex-wrap justify-center">
                        {productsData.map(product => (
                            <div key={product.id} className="product-item">
                                <img className="w-48" src={product.image} alt="wait" />
                                <h1>{product.artist}</h1>
                                <p className="product-item-p">{product.title}</p>
                                <p className="mt-0">{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="pagination" className="pagination-section mb-10">
                    <button className="pagination-jp-btn py-2 px-4">最初へ</button>
                    <button className="pagination-jp-btn"><ChevronLeftIcon /></button>
                    <button className="py-2 px-4 pagination-jp-btn">1</button>
                    <button className="pagination-jp-btn"><ChevronRightIcon /></button>
                    <button className="py-2 px-4 pagination-jp-btn">最後へ</button>
                </div>
            </section>
        </>
    );
}

export default Marketplace;
