import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Badge, Input, Space, Radio, Button, Form, message } from 'antd';
import { FaRegCalendarCheck } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import RegFormModal from "../../components/common/modal/RegForm";
import SuccessModal from "../../components/common/modal/success";
import BackUploader from "../../components/common/ImageUploader/back";
import AvatarUploader from "../../components/common/ImageUploader/avatar";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from "axios";

import { transactionsData, purchasedCasesData, chatProgressData, requestData } from '../../constant/data'
import { useSelector } from "react-redux";

const DesignerDashboard = () => {
    const [active, setActive] = useState('REQUEST')
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { t, i18n } = useTranslation();
    const { user } = useSelector(state => state.user)
    const [initialValues, setInitialValues] = useState({});
    const [messages, setMessages] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [deliveried, setDeliveried] = useState([]);
    const [developing, setDeveloping] = useState([]);
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, [active])

    useEffect(() => {
        fetchCreator();
    }, []);

    useEffect(() => {
        setCompleted(messages?.filter(item => item.status === 6));
        setDeliveried(messages?.filter(item => item.status > 3));
        setDeveloping(messages?.filter(item => item.status < 4));
    }, [messages])

    const handleActive = (current) => {
        setActive(current)
    }
    const fetchCreator = async () => {
        try {
            const id = await axios.get("/id");
            const response = await axios.get('/creators/' + id?.data?.id);
            setCreators(response?.data?.creators);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchMessages = () => {
        axios.get(`/contract`)
            .then(response => setMessages(response.data.messages))
            .catch(error => console.log(error.response.data.message))
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
    const [openForm, setOpenForm] = useState(false);
    const [open1, setOpen1] = useState(false);
    const hadnleOpenForm = () => setOpenForm(true);
    const hadnleCloseForm = () => setOpenForm(false);

    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const closefun = () => {
        hadnleCloseForm();
        handleOpen1();
    };

    // const fetchInitialValues = async () => {
    //     try {
    //         const id = await axios.get("/id");
    //         setId(id?.data?.id);
    //         const response = await axios.get('/bank-info'); // Replace with your API endpoint
    //         const { bank_info } = response.data;
    //         setInitialValues(bank_info); // Set initial values from API response
    //         form.setFieldsValue(bank_info); // Set form fields with initial values
    //     } catch (error) {
    //         message.error('Failed to fetch initial values');
    //     }
    // };


    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/bank-info', values); // Replace with your backend URL
            message.success("口座の登録が完了しました")
        } catch (error) {
            console.error('Error storing bank info:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
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
                    <div className="md:relative md:top-[-120px] left-56">
                        <h1 className="m-0">{user?.user?.username}</h1>
                        <p className="m-0">{user?.user?.bio}</p>
                    </div>
                    <Button type="primary"
                        onClick={hadnleOpenForm}
                        className="flex md:top-[-160px] md:left-[50%] md:relative mt-3 text-white px-3 w-28 rounded-lg text-center border-none justify-center"
                    >
                        {t("To Edit")}
                    </Button>
                    <Button type="primary" className="flex md:relative md:top-[-120px] top-[-30px] left-32 text-white p-2 px-10 rounded-lg text-center">{t("CREATER")}</Button>
                </div>

            </section>

            <section className="bg-gray-100 md:p-16 pl-16 pr-2 gap-2 justify-center py-20 grid grid-cols-12">

                <div className="md:col-span-3 col-span-1">
                    <Sidebar setCurrent={handleActive} />
                </div>
                <div className="md:col-span-9 col-span-11  shadow-md shadow-gray-200 bg-white overflow-scroll p-5 max-h-screen">
                    {active === 'SHOW ROOM' &&
                        <div div >
                            <h1 className="border-b-7 border-blue-600 text-xl my-8 ml-3">{t("@CREATER_USERR00")}</h1>
                            <div className="flex gap-5 flex-wrap justify-center">
                                {creators?.products?.map((product) => (
                                    <div key={product?.id} onClick={() => { navigate('/product/' + product?.id) }} className="w-60 shadow-lg shadow-gray-500 relative">
                                        <img src={product.image} className="w-full"></img>
                                        <div className="px-4 py-[2px] text-xs bg-badge w-auto rounded-lg text-white text-center absolute top-2 left-2">
                                            <p className="font-semibold">Gallery</p>
                                            <span>{product.name}</span>
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
                                                {/* <img className="w-30 h-30 rounded-full" src={chat.imageUrl} alt="wait" /> */}
                                            </Badge>
                                        </div>
                                        <div className="sub-progresschat-detial">
                                            <p className="sub-progresschat-detial-p">{contract?.client?.username}</p>
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
                            <h1 className="border-b-7 border-blue-600 text-xl py-8">{t("BANK ACCOUNTS")}</h1>
                            <div className="justify-center border border-solid border-gray-500 px-5">
                                <div className="py-5  text-gray-400 text-right">
                                    <Form
                                        form={form}
                                        onFinish={onFinish}
                                        validateMessages={validateMessages}
                                        initialValues={initialValues}
                                        labelAlign="right"
                                    >
                                        <Form.Item name="bank_type" rules={[{ required: true, message: '銀行の種類を選択してください！' }]}>
                                            <div className="grid md:grid-cols-12 grid-row">
                                                <p className="md:col-span-3 col-span-12 text-left mt-2">種別</p>
                                                <div></div>
                                                <Radio.Group className="col-span-8">
                                                    <Space direction="vertical" className="flex items-start">
                                                        <Radio value="ゆうちょ銀行">銀行（ゆうちょ以外）・信用金庫など</Radio>
                                                        <Radio value="信用金庫">ゆうちょ銀行</Radio>
                                                    </Space>
                                                </Radio.Group>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="financial_institution"
                                            rules={[{ required: true, message: '金融機関を入力してください！' }]}>
                                            <div className="grid md:grid-cols-12 grid-row">
                                                <p className="md:col-span-3 col-span-12 text-left mt-2">金融機関・支店</p>
                                                <div></div>
                                                <Input plachoder="銀行（ゆうちょ以外）・信用金庫など" className="col-span-8 text-left p-2" />
                                            </div>
                                        </Form.Item>
                                        <Form.Item name="account_type" rules={[{ required: true, message: 'アカウントの種類を選択してください！' }]} >
                                            <div className="grid md:grid-cols-12 grid-row">
                                                <p className="md:col-span-3 col-span-12 text-left mt-2">口座種別</p>
                                                <div></div>
                                                <Radio.Group className="col-span-8">
                                                    <Space direction="horizontal" className="flex items-start">
                                                        <Radio value="普通">普通</Radio>
                                                        <Radio value="当座">当座</Radio>
                                                    </Space>
                                                </Radio.Group>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="account_number"
                                            rules={[
                                                { required: true, message: '口座番号を入力してください！' },
                                                { pattern: /^[0-9]+$/, message: '口座番号は数字でなければならない！' },
                                            ]}
                                        >
                                            <div className="grid md:grid-cols-12 grid-row">
                                                <p className="md:col-span-3 col-span-12 text-left mt-2">口座番号</p>
                                                <div></div>
                                                <div className="col-span-8 mt-2 mb-2">
                                                    <Input className="w-full border rounded-sm p-2 mb-2" type="text" id="html" name="account_number" />
                                                    <p className="m-0 text-xs">数字7桁・6桁の場合は、先頭に0をつけてください。 </p>
                                                </div>
                                            </div>
                                        </Form.Item>
                                        <Form.Item name="account_holder_name" rules={[{ required: true, message: '口座名義を入力してください！' }]}>
                                            <div className="grid md:grid-cols-12 grid-row">
                                                <p className="md:col-span-3 col-span-12 text-left mt-2">口座名義人</p>
                                                <div></div>
                                                <div className="col-span-8 mt-2 mb-2">
                                                    <Input className="w-full border rounded-sm p-2 mb-2" type="text" id="html" name="account_holder_name" />
                                                    <p className="m-0 text-xs">全角カタカナ　32文字以内 </p>
                                                </div>
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                loading={loading}
                                                type="primary" htmlType="submit"
                                                className="w-full p-5 my-5"
                                                icon={<FaRegCalendarCheck />}
                                            >
                                                {t("Register an account")}
                                            </Button>
                                        </Form.Item>
                                    </Form>
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

export default DesignerDashboard;


