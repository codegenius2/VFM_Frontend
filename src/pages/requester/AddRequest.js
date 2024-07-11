import React, { useState, useEffect } from 'react';
import { Select, Input, Tag } from 'antd';
import { BsEye } from 'react-icons/bs';
import { FaPenClip } from 'react-icons/fa6';
import SuccessModal from '../../components/common/modal/success';
import Ellipse2 from "../../assets/images/Ellipse 2.png";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal, Button, Badge } from 'antd';
import toast from "react-hot-toast";
import expand from "../../assets/images/Expand_right_light.png";
import imageProduct from "../../assets/images/image 35.png";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TagGroup } from "../../components/common/tagGroup";
import VFM_Avatar from "../../components/common/avatar";
import ChatBox from '../../components/common/chatBox';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddShowRoom = () => {
    const [isopen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState({});
    const [title, setTitle] = useState("");
    const [hashtags, setHashtags] = useState([]);
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const [isRequired, setIsRequired] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [basePrice, setBasePrice] = useState(100);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenPreview = () => setOpenPreview(true);
    const handleClosePreview = () => setOpenPreview(false);
    const handleCancel = () => setIsOpen(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user } = useSelector(state => state?.user)

    useEffect(() => {
        const newErrors = {};
        if (title?.length === 0) {
            newErrors.title = 'タイトルは必須!';
        } else if (title?.length > 50) {
            newErrors.title = '全角50文字以内';
        } else {
            newErrors.title = "";
        }
        if (description?.length === 0) {
            newErrors.description = 'タイトルは必須!';
        } else if (description?.length > 50) {
            newErrors.description = '全角2000文字以内';
        } else {
            newErrors.description = "";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
    }, [title, description])

    useEffect(() => {
        console.log(tags)
        console.log(hashtags)
    }, [hashtags])

    const { tags } = useSelector(state => state.common)

    const handleClick = async () => {
        if (!errors.title && !errors.description) {
            if (!image) {
                toast.error('Please select an image!');
                return;
            }
            setIsLoading(true);
            const id = await axios.get("/id");
            const data = new FormData();
            data.append('id', id?.data?.id);
            data.append('title', title);
            data.append('budget', basePrice);
            data.append('image', image);
            data.append('tag_ids', hashtags[0]);
            data.append('description', description);
            await axios.post('/requirement', data);
            setIsLoading(false);
            setIsOpen(true);
        }
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);

        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenChatBox = () => setIsRequired(true);

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
        <Badge.Ribbon text={t("リクエスト登録画面")} className="mt-4 p-2 px-7 text-xl" >
            <div className="shadow-sm shadow-gray-400 py-20 px-5 flex flex-col gap-5 mt-12">
                <div className="grid md:grid-cols-12 flex-row mt-8">
                    <span className="col-span-3">タイトル</span>
                    <div className="col-span-9">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-12 flex-row">
                    <span className="col-span-3">リクエスト内容</span>
                    <div className="col-span-9">
                        <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
                        {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                        <p className="text-red-500 text-xs">・デジタルファッション本体のイメージ </p>
                        <p className="text-red-500 text-xs">・希望する納品データ（上半身画像〇枚＋全身〇枚＋動画〇秒〇本）を記載してください</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-12">
                    <p className="col-span-3">タグ</p>
                    <div className="col-span-9">
                        <Select className="w-full" value={hashtags} onChange={setHashtags} options={tags} mode="multiple" />
                    </div>
                </div>
                <div className="md:grid-cols-12 grid flex-row">
                    <p className="col-span-3">基本料金</p>
                    <div className="col-span-9">
                        <Select
                            className='w-full'
                            defaultValue="lucy"
                            value={basePrice}
                            onChange={setBasePrice}
                            options={[
                                { value: 100, label: '100$' },
                                { value: 200, label: '200$' },
                                { value: 300, label: '300$' },
                                { value: 400, label: '400$' },
                                { value: 500, label: '500$' },
                                { value: 600, label: '600$' },
                            ]}
                        />
                        {/* <p className="text-red-500 text-xs">クライアントから送られてきた上半身の画像に</p>
                        <p className="text-red-500 my-1 text-xs">デジタルファッションを合成して納品する1枚当たりの価格</p> */}
                        <p className="text-xs">＄10.USD～登録可能</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-12">
                    <p className="col-span-3">商品イメージ</p>
                    <div className="col-span-9">
                        <div className='flex flex-row gap-3'>
                            {/* <Button>ファイノえ選択</Button>
                            <p>選火されていません</p> */}
                            <input type="file" onChange={handleImageChange} />
                            {!image && <p>選火されていません</p>}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-5 justify-center">
                    <Button type="primary" loading={isLoading} onClick={handleClick} className="w-48 bg-blue-500" icon={<FaPenClip />} >{t('Register')}</Button>
                    <Button type="primary" onClick={handleOpenPreview} className="w-48 bg-green-500" icon={<BsEye />} >{t('Preview')}</Button>
                </div>
            </div >
        </Badge.Ribbon>
        <Modal open={openPreview} onCancel={handleClosePreview} footer={<></>} width={1200}>
            <div className="py-24 xl:px-20 md:px-10 px-5">
                <section id="product-title">
                    <p className="flex gap-1 text-sm mb-3">CLIENAT
                        <img className="w-5" src={expand} alt="expand" />
                    </p>
                    <div className="bg-blue-600 text-white px-5 py-1 font-medium rounded-md text-sm">
                        <p className="p-4 text-xl">■REQUEST■ {user?.user?.username}</p>
                    </div>
                </section>
                <section id="carousel-box">
                    <div className="grid flex-row md:grid-cols-12 gap-5  mb-10">
                        <div className="gird md:col-span-6 flex-row">
                            <Carousel className="carousel-product mt-24">
                                {[imageProduct, imageProduct, imageProduct].map((item, index) => (
                                    <div key={index}>
                                        {preview && <img className="main-img-carousel" src={preview} alt="product" />}
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="gird md:col-span-6 flex-row border border-gray-300 m-auto mt-10 text-center w-full py-10">
                            <div className=' shadow-lg shadow-gray-400 p-5'>
                                <VFM_Avatar img={user?.user?.avatar} size={32} path="/designer/profile" />
                                <h1 className="text-[#5E4FDC]">CREATER</h1>
                                <p className="text-lg font-thin mt-1 mb-1">{user?.user?.username}</p>
                                <hr className='pb-5' />
                                <div className="text-start">
                                    <p>{description}</p>
                                    {/* <p className="text-blue-600 cursor-pointer mt-2" onClick={() => { profileOpen() }}>{t("... 続きを見る")}</p> */}
                                </div>
                                <div className='flex flex-col mt-5'>
                                    <hr />
                                    <div className='grid grid-cols-6 items-center'>
                                        <div className='col-span-2'>
                                            <span>HASHTAGS</span>
                                        </div>
                                        <div className='col-span-4'>
                                            <div className="flex items-center justify-start gap-2 w-full flex-wrap m-0 relative left-0 right-0 ml-auto mr-auto my-5">
                                                {hashtags.map(item => <Tag key={item.id} closable bordered={false} color="blue">{tags?.filter(tag => tag.value === item)[0]?.label}</Tag>)}
                                            </div >
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-6 mb-5'>
                                        <div className=' col-span-2'>
                                            <span>PAY</span>
                                        </div>
                                        <div className=' col-span-4'>
                                            <p>${basePrice}</p>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                {isRequired &&
                    <ChatBox recipient_id={1} />}
            </div >
        </Modal>
        <SuccessModal open={isopen} onCancel={handleCancel} title={"成果的に登録されました。"}></SuccessModal>
    </>);
}

export default AddShowRoom;