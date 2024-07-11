import React, { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";
import expand from "../../assets/images/Expand_right_light.png";
import imageProduct from "../../assets/images/image 35.png";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from "antd";
import ChatBox from "../../components/common/chatBox";
import VFM_Avatar from "../../components/common/avatar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ContractMessages from "../ContractChat";
import { FaRegCalendarCheck } from "react-icons/fa6";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'swiper/css';

const Requester = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { user } = useSelector(state => state.user)
    const { requirements } = useSelector(state => state.common);
    const [contractId, setContractId] = useState(0);
    const [open, setOpen] = useState(false);
    const [isRequired, setIsRequired] = useState(false);
    const [chatOption, setChatOption] = useState(false);
    const [requirement, setRequirement] = useState()
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRequired = async () => {
        const res = await axios.post('/contracts', {
            client_id: requirement?.user?.id,
            requirement_id: id,
            price: requirement?.budget
        });
        setContractId(res?.data?.data?.id);
        setIsRequired(true);
    }

    useEffect(() => {
        setRequirement(requirements.filter(item => item.id == id)[0]);
    })

    return (
        <>
            {/* <Header page="webscreens" pagetitle="REQUESTER" /> */}
            <div className="py-24 xl:px-20 md:px-10 px-5">
                <section id="product-title">
                    <p className="flex gap-1 text-sm mb-3">CLIENAT
                        <img className="w-5" src={expand} alt="expand" />
                    </p>
                    <div className="bg-blue-600 text-white px-5 py-1 font-medium rounded-md text-sm">
                        <p className="p-4 text-xl">■REQUEST■ {requirement?.title}</p>
                    </div>
                </section>
                <section id="carousel-box">
                    <div className="flex flex-col xl:flex-row  mb-10">
                        <div className="xl:w-1/2">
                            <Carousel className="carousel-product mt-24">
                                {[imageProduct, imageProduct, imageProduct].map((image, index) => (
                                    <div key={index}>
                                        <img className="main-img-carousel" src={requirement?.image} alt="product" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="py-24 xl:w-1/2">
                            <div className=" rounded-lg border-gray-500 shadow-lg xl:mx-10 md:mx-5 mx-0 p-7 shadow-gray-500 border-none">
                                <div className="flex flex-col items-center justify-start">
                                    <VFM_Avatar size={32} img={requirement?.user?.avatar} path={"/requester/profile/" + requirement?.client_id} />
                                    <h1 className="text-badge my-2">CLIENAT</h1>
                                    <h1 >{requirement?.user?.username}</h1>
                                </div>
                                <div className="mt-5 flex flex-col gap-5">
                                    <p> {requirement?.description}</p>
                                    <p onClick={handleOpen} className="text-blue-700 cursor-pointer mt-4 mb-4">...続きを見る</p>
                                </div>
                                <div className="flex pl-8 font-bold gap-9 justify-between mt-3">
                                    <p className="w-36 border-b-4 border-blue-700">料金</p>
                                    <p className="w-36">{requirement?.budget}$</p>
                                </div>
                                <div className="flex pl-7 font-bold gap-9 justify-between">
                                    <p className="w-36">オプション</p>
                                    <p className="w-36">６点</p>
                                </div>
                                {
                                    requirement?.user?.id !== user?.user?.id &&
                                    <button onClick={handleRequired} className="px-20 bg-badge text-white w-full py-3 rounded-md mt-5 hover:opacity-40 duration-500">{t("Apply for request")}</button>
                                }
                            </div>
                        </div>
                    </div>
                    {chatOption && (
                        <ChatBox recipient_id={1} />
                    )}
                </section >
            </div >
            {isRequired &&
                <>
                    <ContractMessages contractId={contractId} />
                    <div className="flex items-center justify-center mt-5">
                        <button type="submit" onClick={() => { navigate('/progress/' + contractId) }} class="max-w-[360px] w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center"> <FaRegCalendarCheck className="w-5 h-5" /><span>応募する</span></button>
                    </div>
                </>
            }
            <Modal open={open} onCancel={handleClose} footer={
                <Button type="primary" onClick={handleClose}>  Cancel
                </Button>
            } >
                <div>
                    <div className="border-solid border-gray-500 mx-auto p-5">
                        <div className="justify-center items-center text-center">
                            <VFM_Avatar size={32} img={requirement?.client?.avatar} />
                            <h1 className="text-badge my-7">CREATER</h1>
                            <h1>{requirement?.client?.username}</h1>

                        </div>
                        <div className="my-5 flex flex-col gap-5">
                            <p>{requirement?.description}</p>
                        </div>
                    </div>
                </div>
            </Modal >
        </>
    );
}

export default Requester;
