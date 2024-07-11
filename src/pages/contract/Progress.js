
import { React, useState, useEffect } from "react";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useTranslation } from 'react-i18next';
import { Form, message } from 'antd';
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import ChatBox from "../../components/common/chatBox";
import { GrCompliance } from "react-icons/gr";
import { BsFillSendCheckFill } from "react-icons/bs";
import { TagGroup } from '../../components/common/tagGroup'
import { RiFolderReceivedLine } from "react-icons/ri";
import VFM_Avatar from "../../components/common/avatar";
import { Breadcrumb, Button, Modal, Input, Select } from 'antd'
import UploadButton from "../../components/common/button/UploadButton";
import { FcUpload } from "react-icons/fc";
import { GrRevert } from "react-icons/gr";
import VFMProgress from "../../components/progress";
import SuccessModal from "../../components/common/modal/success";
import FormModal from "../../components/common/modal/form";
import ContractMessages from "../ContractChat";
import { useSelector } from "react-redux";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { TbCoinYen } from "react-icons/tb";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #6F6F6F',
    boxShadow: 24,
    p: 4,
};

function Progress() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [openContract, setOpenContract] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [contract, setContract] = useState()
    const [chatRegister, setChatRegister] = useState(false);
    const { t, i18n } = useTranslation();

    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [isLoadingRevert, setIsLoadingRevert] = useState(false);
    const [isLoadingContract, setIsLoadingContract] = useState(false);
    const [isLoadingReceived, setIsLoadingReceived] = useState(false);



    const [contractPrice, setContractPrice] = useState(0);

    const { user } = useSelector(state => state.user);
    const handleCloseContract = () => setOpenContract(false)
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const handleChange = (e) => setContractPrice(e.target.value);

    useEffect(() => {
        fetchContract()
    }, []);

    const fetchContract = async () => {
        await axios.get('/contracts/' + id)
            .then(response => setContract(response.data.data))
            .catch(error => console.error(error));
    }

    const onFinish = (values) => {
        axios.post('/contracts', values)
            .then(response => {
                form.resetFields();
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    };

    const handleRevert = async () => {
        setIsLoadingRevert(true)
        await axios.put('/contracts_status/' + id, { price: contractPrice, status: 3 })
            .then(res => {
                fetchContract()
                message.success('reverted!')
            })
            .catch(error => {
                message.error(error)
            });
        setIsLoadingRevert(false)
    }

    const handleReceived = async () => {
        setIsLoadingReceived(true)
        await axios.put('/contracts_status/' + id, { status: 5 })
            .then(res => {
                fetchContract()
                message.success('received!')
            })
            .catch(error => {
                message.error(error)
            });
        setIsLoadingReceived(false)
    }

    const handleComplete = async () => {
        setIsLoadingComplete(true)
        const res = await axios.put('/contracts_status/' + id, { status: 6 })
            .then(res => {
                fetchContract()
                message.success('contract is completed successfully!')
            })
            .catch(error => {
                message.error(error)
            });
        setIsLoadingComplete(false)
    }

    const handleContract = async () => {
        setIsLoadingContract(true)
        await axios.put('/contracts_status/' + id, { status: 3 })
            .then(res => {
                fetchContract()
                message.success('Success!')
            })
            .catch(error => {
                message.error(error)
            });
        setIsLoadingContract(false)
    }

    const handleDelivery = async () => {
        await axios.put('/contracts_status/' + id, { status: 4 })
            .then(res => {
                fetchContract()
                message.success('Successfully deliveried!')
            })
            .catch(error => {
                message.error('Error adding to cart:', error)
            });
    }

    const handleTemplateChange = (value) => {
        form.setFieldsValue({ message_text: value });
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const closefun = () => {
        handleClose();
    };

    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"Progress"} /> */}
            <div className="py-24">
                <section id="product-title" className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-2/3">
                        <Breadcrumb
                            className="p-5"
                            separator=">"
                            items={[
                                {
                                    title: 'TOP_PAGE',
                                    href: '/'
                                },
                                {
                                    title: 'PROGRESS',
                                },
                            ]}
                        />
                        <div className="bg-blue-600 text-white px-5 py-1 font-medium rounded-md text-sm mb-5">
                            <p className="md:p-4 py-4 text-xl">{contract?.client?.username + " "} {contract?.product?.name}</p>
                        </div>
                        <div>
                            <div className="flex bg-badge text-white md:px-5 px-1">
                                <p className="p-3">購入日　2024/2/10 </p>
                                <p className="p-3">購入金額　＄920USD</p>
                            </div>
                            <div className="p-3 border shadow-md shadow-gray-300">
                                <div className="grid grid-cols-6 gap-5 p-3">
                                    <p className="col-span-3 border-blue-700">基本料金</p>
                                    <p className="col-span-3">購入日　{contract?.product?.created_at?.slice(0, 10)} </p>
                                </div>
                                <div className="grid grid-cols-6 gap-5 p-3">
                                    <p>基本料金</p>
                                    <p className="col-span-2 font-bold text-gray-800">{contract?.product?.name} </p>
                                    <p>${contract?.product?.price} </p>
                                </div>
                                <hr />
                                <div className="flex gap-5">
                                    <p className="p-3">オプション料金</p>
                                </div>
                                <hr />
                                <div className="grid grid-cols-6 gap-5 p-3">
                                    <div></div>
                                    <p className="col-span-2 font-bold text-gray-800">[ PICTUER-UPPER BODY ] </p>
                                    <p className="col-span-1">＄30 </p>
                                    <p className="col-span-1">4 </p>
                                    <p className="col-span-1">＄120 </p>
                                </div>
                                <div className="grid grid-cols-6 gap-5 p-3">
                                    <p className="p-3"></p>
                                    <p className="col-span-2 font-bold text-gray-800">[ PICTUER-FULL LENGTH ] </p>
                                    <p className="col-span-1">＄75 </p>
                                    <p className="col-span-1">2 </p>
                                    <p className="col-span-1">＄150 </p>
                                </div>
                                <div className="grid grid-cols-6 gap-5 p-3">
                                    <p className="p-3"></p>
                                    <p className="col-span-2 font-bold text-gray-800">[ MOVIE-10minute ] </p>
                                    <p className="col-span-1">＄130 </p>
                                    <p className="col-span-1">1 </p>
                                    <p className="col-span-1">＄130 </p>
                                </div>
                                <hr />
                                <div className="grid grid-cols-5 p-5">
                                    <p className="col-span-1">ハッシュタグ</p>
                                    <div className="col-span-4">
                                        <TagGroup tags={["＃KAWAII", "#ANIME", "＃DRESS", "＃JAPAN"]} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3">
                        <div className="mx-auto mt-9 p-4 shadow-md shadow-gray-400">
                            <div className="flex items-center gap-3 mb-5 md:flex-row flex-col">
                                <VFM_Avatar size={28} img={contract?.creator?.avatar} alt="wait" />
                                <div>
                                    <h1 className="text-badge m-0">CREATER</h1>
                                    <h1>{contract?.creator?.username}</h1>
                                </div>
                            </div>
                            <div>
                                <div className="p-3 border">
                                    <div className="grid grid-cols-6 gap-5 p-3">
                                        <p className="col-span-2 border-blue-700">REQUESTER</p>
                                        <p className="col-span-4">{contract?.client?.username}</p>
                                    </div>
                                    <div className="grid grid-cols-6 gap-5 p-3">
                                        <p className="col-span-2 border-blue-700">料金</p>
                                        <p className="col-span-4">＄{contract?.price}</p>
                                    </div>
                                    <div className="grid grid-cols-6 gap-5 p-3">
                                        <p className="col-span-2 border-blue-700">購入日</p>
                                        <p className="col-span-4">{contract?.created_at?.slice(0, 10)}</p>
                                    </div>
                                    <div className="grid grid-cols-6 gap-5 p-3">
                                        <p className="col-span-2 border-blue-700">オプション</p>
                                        <p className="col-span-4">６点</p>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full">
                                <VFMProgress values={contract?.status} />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="carosal-box" className="mt-10">
                    <ContractMessages contractId={id} />
                    <p onClick={handleOpen} className="my-5 text-blue-700 cursor-pointer title-message-box">{t("定型文登録はこちらから（３つまで登録可能です。）")}</p>
                </section>
                {
                    contract?.status < 3 ? user?.user?.user_type === 'Client' ?
                        <div className="flex items-center justify-center mt-5">
                            <Button
                                loading={isLoadingContract}
                                onClick={() => setOpenContract(true)}
                                type="primary"
                                className='py-6 px-10'
                                icon={<FaRegCalendarCheck className="w-5 h-5" />}  >
                                契約する
                            </Button>
                        </div> : <></> : user?.user?.id === contract?.client_id ?
                        <>

                            <div className="flex flex-wrap gap-5 justify-center mt-10 " >
                                <Button
                                    disabled={contract?.status !== 5}
                                    loading={isLoadingComplete}
                                    onClick={handleComplete}
                                    type="primary"
                                    icon={<GrCompliance />}
                                    danger
                                    size="large"
                                    className="px-12">
                                    検収を完了する
                                </Button>
                                <Button
                                    disabled={contract?.status !== 4}
                                    loading={isLoadingReceived}
                                    onClick={handleReceived}
                                    icon={<RiFolderReceivedLine />}
                                    size="large"
                                    className="bg-blue-500 px-12 text-white ">
                                    {t("Delivery receipt")}
                                </Button>
                                <Button
                                    disabled={contract?.status !== 4}
                                    loading={isLoadingRevert}
                                    onClick={handleRevert}
                                    type="primary"
                                    icon={<GrRevert />}
                                    size="large"
                                    className="px-12 bg-black">
                                    検収を差戻しする
                                </Button>
                            </div>
                        </> : contract?.status === 3 ?
                            <>
                                <UploadButton />
                                <hr className="mt-10 pb-5" />
                                <div className="flex flex-row">
                                    <Button type="default" icon={<FcUpload />} >
                                        ファイルを選択
                                    </Button>
                                    <p className="ml-2">遛択されていません</p>
                                </div>
                                <div className="flex flex-wrap gap-5 justify-center mt-10" >
                                    <Button
                                        disabled={contract?.status > 3}
                                        onClick={handleDelivery}
                                        type="primary"
                                        icon={<BsFillSendArrowUpFill />}
                                        size="large"
                                        className="px-20">
                                        納品する
                                    </Button>
                                </div>
                            </> : <></>
                }
            </div >
            <Modal
                open={openContract}
                onCancel={handleCloseContract}
                footer={
                    <Button type="primary" onClick={handleContract} icon={<TbCoinYen className="w-5 h-5 text-yellow-200" />} className="bg-blue-500">
                        <span className="text-white-200">契約金の支払い</span>
                    </Button>
                }
            >
                <div className="pt-10 flex flex-row">
                    <label className="mr-2">購入金額: </label>
                    <Input type="number" className="w-32" value={contractPrice} onChange={handleChange} />
                    <span className="ml-2">$</span>
                </div>
            </Modal>

            <FormModal open={open} onCancel={handleClose} onConfirm={closefun} />
        </>
    );
}

export default Progress;
