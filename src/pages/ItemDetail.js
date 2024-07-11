import Header from "../components/header";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaRegCalendarCheck } from "react-icons/fa6";

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { React, useState, useRef } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Modal } from 'antd';
import expand from "../assets/images/Expand_right_light.png";

import imageProduct from "../assets/images/image 35.png";
import Groupfav from "../assets/images/Groupfav.png";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Ellipse2 from "../assets/images/Ellipse 2.png";

import Group9 from "../assets/images/Group 9.png";
import image51 from "../assets/images/image 51.png";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import image35 from "../assets/images/image 35.png";

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TagGroup } from "../components/common/tagGroup";
import VFM_Avatar from "../components/common/avatar";
import ChatBox from "../components/common/chatBox";
import { NewProducts } from "../constant/new_products";
import { ProductCard } from "../components/card/productCard";
import AddToCartModal from "../components/common/modal";
import ItemDetail from "./DigitalFashion";


const ItemDetailPage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isRequired, setIsRequired] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const [profile, setProfile] = useState(false);
    const profileOpen = () => setProfile(true);
    const profileClose = () => setProfile(false);

    const handelContinue = () => {
        navigate('/cart');
        handleClose1();
    }

    const handleCloseFirst = () => {
        handleClose();
        handleOpen1();
    }

    const scrollContainerRef = useRef(null);

    const scrollToX = (x) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: x, behavior: 'smooth' });
        }
    };

    const handleRequired = () => {
        setIsRequired(true);
        scrollToX(2000);
    }

    const { t, i18n } = useTranslation();


    return (

        <div className="py-24" ref={scrollContainerRef}>
            <section className="mb-20">
                <p className="flex gap-1 text-sm m-b3">
                    {t("MARCKT PLACE")}
                    <img className="width-25" src={expand} alt="wait" />
                    {t("DRESS ALL ITEM")}
                </p>
                <div className="bg-blue-600 text-white py-1 font-medium rounded-md text-sm">
                    <p className="p-4 text-xl">Kaiyo Aoki [ Eclipse of Elegance ] {t("Redy Made Fist Collections2024")}</p>
                </div>
            </section>
            <section id="carosal-box">
                <div className="flex md:flex-row flex-col sm:gap-3 gap-5">
                    <div className="md:w-1/2 w-full">
                        <Carousel className="w-full">
                            <div>
                                <img className="main-img-caro" src={imageProduct} alt="wait" />
                                <div className="favicon-product"><FavoriteBorderIcon /></div>
                            </div>
                            <div>
                                <img className="main-img-caro" src={imageProduct} alt="wait" />
                                <div className="favicon-product"><FavoriteBorderIcon /></div>
                            </div>
                            <div>
                                <img className="main-img-caro" src={imageProduct} alt="wait" />
                                <div className="favicon-product"><FavoriteBorderIcon /></div>
                            </div>
                        </Carousel>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <div>
                            <div className="flex flex-col gap-5 py-4">
                                <div className="flex items-center px-5 py-1 border-b">
                                    <span className="font-bold mr-2">{t("Category")}:</span>
                                    <p>LADIES FASHION</p>
                                </div>
                                <div className="flex items-center px-5 py-1 border-b">
                                    <span className="font-bold mr-2 w-24">{t("hashtag")}:</span>
                                    <TagGroup tags={['＃2024-SS', 'First', 'Collection', '#DRESS', '#JAPA']} />
                                </div>
                                <div className="flex items-center px-5 py-1 border-b">
                                    <span className="font-bold mr-2">{t("price")}:</span>
                                    <p>＄400.00 USD</p>
                                </div>
                                <div className="flex items-center px-5 py-1 border-b">
                                    <span className="font-bold mr-2">{t("option")}:</span>
                                    <p>＄35.00 USD～</p>
                                </div>
                            </div>
                            <Button onClick={handleOpen} sx={{ marginBottom: '10px', width: '100%', padding: '15px', shadow: '3px 4px 4px -3px #ccc' }} size="large"
                                startIcon={<MdOutlineAddShoppingCart />} variant="contained">
                                <span className="pl-20">{t("ADD TO CART")}</span>
                            </Button>
                            <button onClick={handleRequired} className="bg-black text-white font-bold border-none py-2 w-full block text-md round-md mb-3 rounded-md hover:opacity-80 transition duration-500 shadow-md shadow-gray-500 hover:shadow-none"
                            >
                                {t("Inquiries regarding this product (2)")}
                            </button>
                            <button onClick={() => navigate('/progress')} className="bg-black text-white font-bold border-none py-2 w-full block text-md round-md mb-3 rounded-md hover:opacity-80 transition duration-500 shadow-md shadow-gray-500 hover:shadow-none"
                            >
                                {t("アーティストを指名して依頼をする")}
                            </button>
                        </div>
                    </div>
                </div>
                {isRequired &&
                    <>
                        <ChatBox recipient_id={1} />
                        <div className="flex items-center justify-center mt-5">
                            <button type="submit" onClick={() => { navigate('/progress') }} class="max-w-[360px] w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center"> <FaRegCalendarCheck className="w-5 h-5" /><span>契約する</span></button>
                        </div>
                    </>
                }
            </section >

            <AddToCartModal
                open={open}
                onCancel={handleClose}
                onClickOK={handleCloseFirst}
            />
            <Modal
                open={open1}
                onCancel={handelContinue}
                footer={<></>}
                aria-labelledby="mod a l -modal-titl e"
                aria-describedby="modal-modal-description"
            >
                <p>引き続き、お買い物をお楽しみください！ </p>
            </Modal>
            <Modal Modal open={profile} onCancel={profileClose} footer={<></>}
                width={600}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="border border-gray-300 m-auto mt-10 text-center w-full p-3 md:p-10">
                    <VFM_Avatar img={Ellipse2} size={32} />
                    <h1 className="text-[#5E4FDC]">CREATER</h1>
                    <p className="designer-title">Kaiyo Aoki</p>
                    <p className="text-lg font-thin mt-1 mb-1">すべてのデザインを見る</p>
                    <p className="text-lg font-thin mt-1 mb-1">指名してデザインを依頼する</p>
                    <div className="text-center">
                        ご注文いただいてから納品までの流れは以下の通りです。ご注文からお届けまでの流れ（デジタルファッション版）
                        デジタルアイテム取得プロセス： ご注文受付（お支払完了後）→ デジタルアイテム制作・取得（1~4日）→ 品質確認 → 配信 上記は、あくまで参考程度であることにご留意ください。
                        好きなジャンルは、サイバーパンク・00年代風 よろしくお願いいたします。
                        <p className="text-blue-600 cursor-pointer mt-2 pt-4" onClick={() => { profileOpen() }}>{t("とじる ...")}</p>
                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default ItemDetailPage;
