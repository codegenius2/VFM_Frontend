import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Badge, Input, Space, Radio, Button } from 'antd';
import { FaRegCalendarCheck } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import RegFormModal from "../../components/common/modal/RegForm";
import SuccessModal from "../../components/common/modal/success";
import BackUploader from "../../components/common/ImageUploader/back";
import AvatarUploader from "../../components/common/ImageUploader/avatar";
import { useSelector } from "react-redux";
import axios from "axios";


const RequesterDashboard = () => {
    const { requirements } = useSelector(state => state.common);
    const { user } = useSelector(state => state.user);
    const [active, setActive] = useState('REQUEST')
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [client, setClient] = useState();
    const [openForm, setOpenForm] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [messages, setMessages] = useState("");
    const [completed, setCompleted] = useState([]);
    const [deliveried, setDeliveried] = useState([]);
    const [developing, setDeveloping] = useState([]);
    const hadnleOpenForm = () => setOpenForm(true);
    const hadnleCloseForm = () => setOpenForm(false);

    useEffect(() => {
        fetchMessages();
        fetchClient();
    }, [active])

    useEffect(() => {
        if (messages.length > 0) {
            setCompleted(messages?.filter(item => item.status === 6));
            setDeliveried(messages?.filter(item => item.status > 3));
            setDeveloping(messages?.filter(item => item.status < 4));

        }

    }, [messages])


    const fetchMessages = () => {
        axios.get(`/contract`)
            .then(response => setMessages(response.data.messages))
            .catch(error => console.log(error.response.data.message))
    };

    const handleActive = (current) => {
        setActive(current)
    }

    const fetchClient = async () => {
        try {
            const id = await axios.get("/id");
            const response = await axios.get('/clients/' + id?.data?.id);
            setClient(response?.data?.client);
        } catch (e) {
            console.log(e);
        }
    };

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

    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const closefun = () => {
        hadnleCloseForm();
        handleOpen1();
    };
    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"Creator"} /> */}
            <section id="banner-section">
                <BackUploader img={user?.user?.background_image} alt='wait' />
                <div className="relative">
                    <div className="relative flex top-[-60px] md:justify-start md:left-20 justify-center">
                        <AvatarUploader img={user?.user?.avatar} alt='wait' />
                    </div>
                    <div className="md:relative md:top-[-100px] mt-[-20px] left-56">
                        <h1 className="m-0">{user?.user?.username}</h1>
                        <p className="m-0">{user?.user?.bio}</p>
                    </div>
                    <Button type="primary"
                        onClick={hadnleOpenForm}
                        className="flex md:top-[-160px] md:left-[50%] md:relative mt-3 text-white px-3 w-28 rounded-lg text-center border-none justify-center"
                    >
                        {t("To Edit")}
                    </Button>
                    <Button type="primary" className="flex md:relative md:mt-0 mt-10 md:top-[-70px] top-[-30px] left-32 text-white p-2 px-10 rounded-lg text-center">{t("CLIENT")}</Button>
                </div>

            </section>

            <section className="bg-gray-100 md:p-16 pl-16 pr-2 gap-2 justify-center py-20 grid grid-cols-12">

                <div className="md:col-span-3 col-span-1">
                    <Sidebar setCurrent={handleActive} />
                </div>
                <div className="md:col-span-9 col-span-11  shadow-md shadow-gray-200 bg-white overflow-scroll p-5 max-h-screen">
                    {active === 'REQUEST' &&
                        <div>
                            <h1 className="border-b-7 border-blue-600 text-xl my-8 ml-3">{user?.user?.username}</h1>
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
                    }
                    {active === 'CHAT' &&
                        <>
                            <h1 className="border-b-7 border-blue-600 text-xl my-8 ml-3">{t("CHAT LIST")}</h1>
                            {messages?.map((contract, index) => (
                                <div key={index}
                                    className=" cursor-pointer sm:items-center gap-5 shadow-md shadow-gray-300 mb-3 p-4 flex justify-between flex-col text-center pb-12 sm:flex-row sm:text-left sm:pb-0mb-5"
                                    onClick={() => { navigate('/progress/' + contract.id) }}>
                                    <div className="flex md:flex-row items-center text-gray-700 gap-7 md:pl-5 pl-0 flex-col">
                                        <div className="">
                                            <Badge count={contract?.messages?.length} color="blue">
                                                <Avatar src={contract?.client?.avatar} size={'large'} />
                                            </Badge>
                                        </div>
                                        <div className="sub-progresschat-detial">
                                            <p className="sub-progresschat-detial-p">{contract?.creator?.username}</p>
                                            <p>{contract?.messages[0]?.message_text}</p>
                                        </div>
                                    </div>
                                    <div className="sm:w-40">
                                        <span className="sub-progresschat-detial-span">{contract?.messages.at(-1)?.created_at?.slice(0, 16).replace('T', ' ')}</span>
                                    </div>
                                </div>
                            ))}
                        </>
                    }

                    {active === 'PROGRESS' &&
                        <div>
                            <h1 className="border-b-7 border-blue-600 text-xl my-8 ml-3">{t("PROGRESS")}</h1>
                            <div className=" md:p-8 p-3 bg-gray-50 flex flex-wrap justify-center gap-3 shadow-md shadow-gray-300" >
                                <div className="bg-white shadow-md shadow-gray-500 p-5 rounded-md w-52" >
                                    <h1 className="font-bold text-xl md:text-3xl mb-3">販売済み</h1>
                                    <div className="flex md:flex-row flex-col justify-between">
                                        <span className="font-semibold lg:text-2xl md:text-xl text-lg text-blue-500">{completed?.length}</span>
                                        <span className="font-semibold lg:text-2xl md:text-xl text-lg text-blue-500">CASE</span>
                                    </div>

                                </div>
                                <div className="bg-white shadow-md shadow-gray-500 p-5 rounded-md w-52" >
                                    <h1 className="font-bold text-xl md:text-3xl mb-3">進行中</h1>
                                    <div className="flex md:flex-row flex-col justify-between">
                                        <span className="font-semibold lg:text-2xl md:text-xl text-lg text-blue-500">{developing?.length}</span>
                                        <span className="font-semibold lg:text-2xl md:text-xl text-lg text-blue-500">CASE</span>
                                    </div>

                                </div>
                                <div className="bg-white shadow-md shadow-gray-500 p-5 rounded-md w-52" >
                                    <h1 className="font-bold text-xl md:text-3xl mb-3">納品完了</h1>
                                    <div className="flex md:flex-row flex-col justify-between">
                                        <span className="font-semibold lg:text-2xl md:text-xl text-lg text-blue-500">{deliveried?.length}</span>
                                        <span className="font-semibold lg:text-2xl md:text-xl text-lg text-blue-500">CASE</span>
                                    </div>

                                </div>
                            </div>
                            <h1 className="mt-10 mb-5">{t("販売済み")}</h1>
                            <div>
                                {messages?.sort((a, b) => a.status - b.status).map((transaction) => (
                                    <div
                                        className="w-full flex shadow-sm shadow-gray-500 p-3 gap-5 lg:flex-row flex-col"
                                        onClick={() => { navigate('/progress/' + transaction?.id) }}
                                    >
                                        <div className="flex flex-row lg:mb-5 items-center">
                                            <div className="flex lg:flex-row flex-col justify-between">
                                                <div className="flex w-40">
                                                    <Badge count={transaction?.messages?.length} color="blue" className="mr-2" />
                                                    <p className="mx-2">{transaction?.product?.name}</p>
                                                    <p className="mx-2">[{transaction?.client?.username}]</p>
                                                </div>
                                                <div className="flex justify-end w-40">
                                                    <p className="date-last-box-chat">{transaction?.created_at?.slice(0, 10)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-around gap-3">
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">支払金額</p>
                                                <p className="chat-jp-name-price-2">${transaction.price}</p>
                                            </div>
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">購入日</p>
                                                <p className="chat-jp-name-price-2">{transaction?.created_at?.slice(0, 10)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-around gap-3">
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">納品予定日</p>
                                                <p className="chat-jp-name-price-2">{transaction?.created_at?.slice(0, 10)}</p>
                                            </div>
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">ステータス</p>
                                                <p className={`chat-jp-name-price-2 ${transaction.status === 6 ? "" : "text-blue-500"} `}>{transaction.status < 3 ? "販売済み" : transaction.status < 6 ? "進行中" : "納品完了"}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h1 className="mt-10 mb-5">{t("進行中")}</h1>
                            <div className="overflow-desiger-row">
                                {developing.map((transaction) => (
                                    <div className="w-full flex shadow-sm shadow-gray-500 p-3 gap-5 lg:flex-row flex-col"
                                        onClick={() => { navigate('/progress/' + transaction?.id) }}
                                    >
                                        <div className="flex flex-row lg:mb-5 items-center">
                                            <div className="flex lg:flex-row flex-col justify-between">
                                                <div className="flex w-40">
                                                    <Badge count={transaction?.messages?.length} color="blue" className="mr-2" />
                                                    <p className="mx-2">{transaction?.product?.name}</p>
                                                    <p className="mx-2">[{transaction?.client?.username}]</p>
                                                </div>
                                                <div className="flex justify-end w-40">
                                                    <p className="date-last-box-chat">{transaction?.created_at?.slice(0, 10)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-around gap-3">
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">支払金額</p>
                                                <p className="chat-jp-name-price-2">${transaction.price}</p>
                                            </div>
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">購入日</p>
                                                <p className="chat-jp-name-price-2">{transaction?.created_at?.slice(0, 10)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-around gap-3">
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">納品予定日</p>
                                                <p className="chat-jp-name-price-2">{transaction?.created_at?.slice(0, 10)}</p>
                                            </div>
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">ステータス</p>
                                                <p className="chat-jp-name-price-2 text-blue-500">{transaction.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h1 className="mt-10 mb-5">{t("納品完了")}</h1>
                            <div className="overflow-desiger-row">
                                {deliveried.slice(0, 1).map((transaction) => (
                                    <div className="w-full flex shadow-sm shadow-gray-500 p-3 gap-5 lg:flex-row flex-col"
                                        onClick={() => { navigate('/progress/' + transaction?.id) }}
                                    >
                                        <div className="flex flex-row lg:mb-5 items-center">
                                            <div className="flex lg:flex-row flex-col justify-between">
                                                <div className="flex w-40">
                                                    <Badge count={transaction?.messages?.length} color="blue" className="mr-2" />
                                                    <p className="mx-2">{transaction?.product?.name}</p>
                                                    <p className="mx-2">[{transaction?.client?.username}]</p>
                                                </div>
                                                <div className="flex justify-end w-40">
                                                    <p className="date-last-box-chat">{transaction?.created_at?.slice(0, 10)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-around gap-3">
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">支払金額</p>
                                                <p className="chat-jp-name-price-2">${transaction.price}</p>
                                            </div>
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">購入日</p>
                                                <p className="chat-jp-name-price-2">{transaction?.created_at?.slice(0, 10)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-around gap-3">
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">納品予定日</p>
                                                <p className="chat-jp-name-price-2">{transaction?.created_at?.slice(0, 10)}</p>
                                            </div>
                                            <div className="chat-jp-name-price">
                                                <p className="chat-jp-name-price-1">ステータス</p>
                                                <p className="chat-jp-name-price-2 text-blue-500">{transaction.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    {active === 'MY ACCOUNT' &&
                        <div className="border border-solid border-gray-500 shadow-md bg-white md:p-7 p-2">

                            <h1 className="border-b-7 border-blue-600 text-xl p-8">{t("BANK ACCOUNTS")}</h1>
                            <div className="justify-center border border-solid border-gray-500 px-5">
                                <div className="py-5  text-gray-400">
                                    <div className="grid md:grid-cols-12 grid-row">
                                        <p className="md:col-span-3 col-span-12 text-left mt-2">種別</p>
                                        <div></div>
                                        <Radio.Group className="col-span-8">
                                            <Space direction="vertical" className="flex items-start">
                                                <Radio value={1}>銀行（ゆうちょ以外）・信用金庫など</Radio>
                                                <Radio value={2}>ゆうちょ銀行</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="grid md:grid-cols-12 grid-row">
                                        <p className="md:col-span-3 col-span-12 text-left mt-2">金融機関・支店</p>
                                        <div></div>
                                        <p className="col-span-8 text-left p-2">銀行（ゆうちょ以外）・信用金庫など </p>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="grid md:grid-cols-12 grid-row">
                                        <p className="md:col-span-3 col-span-12 text-left mt-2">口座種別</p>
                                        <div></div>
                                        <Radio.Group className="col-span-8">
                                            <Space direction="vertical" className="flex items-start">
                                                <Radio value={1}>普通</Radio>
                                                <Radio value={2}>当座</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                    <div className="grid md:grid-cols-12 grid-row">
                                        <p className="md:col-span-3 col-span-12 text-left mt-2">口座番号</p>
                                        <div></div>
                                        <div className="col-span-8 mt-2 mb-2">
                                            <Input className="w-full border rounded-sm p-2 mb-2" type="text" id="html" name="fav_language" />
                                            <p className="m-0 text-xs">数字7桁・6桁の場合は、先頭に0をつけてください。 </p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-12 grid-row">
                                        <p className="md:col-span-3 col-span-12 text-left mt-2">口座名義人</p>
                                        <div></div>
                                        <div className="col-span-8 mt-2 mb-2">
                                            <Input className="w-full border rounded-sm p-2 mb-2" type="text" id="html" name="fav_language" />
                                            <p className="m-0 text-xs">全角カタカナ　32文字以内 </p>
                                        </div>
                                    </div>
                                    <Button
                                        // onClick={() => { openPopUp("Account registration completed") }}
                                        className="w-full p-5 my-5" type="primary"
                                        icon={<FaRegCalendarCheck />}
                                    >
                                        {t("Register an account")}
                                    </Button>
                                </div>
                            </div>
                            <p className="text-center text-[#F4003A] mt-5 mb-5">{t("Payment will be made on the 15th of the following month (tentative), closing at the end of the month.")}</p>
                        </div>
                    }
                </div >
            </section >
            <RegFormModal open={openForm} onCancel={hadnleCloseForm} onConfirm={closefun} />
            <SuccessModal open={open1}
                onCancel={handleClose1}
                title="プロフィールの登録が完了しました"
            />
        </>
    );
}

export default RequesterDashboard;


