import React, { useState } from 'react';
import { Select, Input } from 'antd';
import { FaPenClip } from 'react-icons/fa6';
import SuccessModal from '../../components/common/modal/success';
import Ellipse2 from "../../assets/images/Ellipse 2.png";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal, Button, Badge } from 'antd';
import expand from "../../assets/images/Expand_right_light.png";
import imageProduct from "../../assets/images/image 35.png";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TagGroup } from "../../components/common/tagGroup";
import VFM_Avatar from "../../components/common/avatar";
import ChatBox from '../../components/common/chatBox';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { useParams } from 'react-router-dom';


const AddShowRoom = () => {
    const { id } = useParams();
    const [isopen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(true);
    const handleCancel = () => setIsOpen(false);

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

    const [t] = useTranslation();
    return (<>

        <div className="py-24 xl:px-20 md:px-10 px-5">
            <section id="product-title">
                <p className="flex gap-1 text-sm mb-3">CLIENAT
                    <img className="w-5" src={expand} alt="expand" />
                </p>
                <div className="bg-blue-600 text-white px-5 py-1 font-medium rounded-md text-sm">
                    <p className="p-4 text-xl">■REQUEST■ @REQUEST＿USER000</p>
                </div>
            </section>
            <section id="carousel-box">
                <div className="grid flex-row md:grid-cols-12 gap-5  mb-10">
                    <div className="gird md:col-span-6 flex-row">
                        <Carousel className="carousel-product mt-24">
                            {[imageProduct, imageProduct, imageProduct].map((image, index) => (
                                <div key={index}>
                                    <img className="main-img-carousel" src={image} alt="product" />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="gird md:col-span-6 flex-row border border-gray-300 m-auto mt-10 text-center w-full py-10">
                        <div className=' shadow-lg shadow-gray-400 p-5'>
                            <VFM_Avatar img={Ellipse2} size={32} path="/designer/profile" />
                            <h1 className="text-[#5E4FDC]">CREATER</h1>
                            <p className="text-lg font-thin mt-1 mb-1">＠Kaiyo　Aoki</p>
                            <hr className='pb-5' />
                            <div className="text-start">
                                <p>ご注文いただいてから納品までの流れは以下の通りです。</p>
                                <p> ご注文からお届けまでの流れ（デジタルファッション版） デジタルアイテム取得プロセス： ご注文受付（お支払完了後）→ デジタルアイテム制作・取得（1~4日）→ 品質確認 → 配信 </p>
                                <p className="text-blue-600 cursor-pointer mt-2" onClick={() => { profileOpen() }}>{t("... 続きを見る")}</p>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <hr />
                                <div className='grid grid-cols-6 items-center'>
                                    <div className='col-span-2'>
                                        <span>HASHTAGS</span>
                                    </div>
                                    <div className='col-span-4'>
                                        <TagGroup tags={['＃2024-SS', 'First', 'Collection', '#DRESS', '#JAPA']} />
                                        <hr />
                                    </div>
                                </div>
                                <div className='grid grid-cols-6 mb-5'>
                                    <div className=' col-span-2'>
                                        <span>PAY</span>
                                    </div>
                                    <div className=' col-span-4'>
                                        <p>$400.00</p>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                            <Button className='w-full bg-blue-500 py-5 my-4' type='primary' onClick={() => setIsRequired(true)}>リクエストに応募する</Button>
                        </div>
                    </div>
                </div>
            </section >
            {isRequired &&
                <>
                    <ChatBox recipient_id={1} />
                    <div className="flex items-center justify-center mt-5">
                        <button type="submit" onClick={() => { navigate('/progress') }} class="max-w-[360px] w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center"> <FaRegCalendarCheck className="w-5 h-5" /><span>契約する</span></button>
                    </div>
                </>
            }
        </div >
        <Modal open={open1} onCancel={handleClose1} footer={
            <Button type="primary" onClick={handleClose}>  Cancel
            </Button>
        } >
            <div className="border border-gray-300 m-auto mt-10 text-center shadow-lg w-full p-10 shadow-gray-400 ">
                <VFM_Avatar img={Ellipse2} size={32} path="/designer/profile" />
                <h1 className="text-[#5E4FDC]">CREATER</h1>
                <p className="designer-title">Kaiyo Aoki</p>
                <p className="text-lg font-thin mt-1 mb-1">すべてのデザインを見る</p>
                <p className="text-lg font-thin mt-1 mb-1">指名してデザインを依頼する</p>
                <div className="text-center">
                    ご注文いただいてから納品までの流れは以下の通りです。ご注文からお届けまでの流れ（デジタルファッション版）
                    デジタルアイテム取得プロセス： ご注文受付（お支払完了後）→ デジタルアイテム制作・取得（1~4日）→
                    <p className="text-blue-600 cursor-pointer mt-2" onClick={() => { profileOpen() }}>{t("... 続きを見る")}</p>
                </div>
            </div>
        </Modal >
        <SuccessModal open={isopen} onCancel={handleCancel} title={"成果的に登録されました。"}></SuccessModal>
    </>);
}

export default AddShowRoom;