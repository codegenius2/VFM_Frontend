import React, { useState, useEffect } from 'react';
import { Select, Input, Badge, Upload, Button, Modal, message, Tag } from 'antd';
import toast from "react-hot-toast";
import { FaPenClip } from 'react-icons/fa6';
import SuccessModal from '../../components/common/modal/success';
import Ellipse2 from "../../assets/images/Ellipse 2.png";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import expand from "../../assets/images/Expand_right_light.png";
import imageProduct from "../../assets/images/image 35.png";
import { useTranslation } from 'react-i18next';
import { TagGroup } from "../../components/common/tagGroup";
import VFM_Avatar from "../../components/common/avatar";
import { BsEye } from 'react-icons/bs';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddShowRoom = () => {
    const [isopen, setIsOpen] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(null);
    const [hashtags, setHashtags] = useState([]);
    const [basePrice, setBasePrice] = useState(100);
    const [topImagePrice, setTopImagePrice] = useState(100);
    const [fullImagePrice, setFullImagePrice] = useState(100);
    const [videofivePrice, setVideoFivePrice] = useState(100);
    const [videotenPrice, setVideoTenPrice] = useState(100);
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState({});
    const [preview, setPreview] = useState(null);
    const { user } = useSelector(state => state?.user)

    const handleClosePreview = () => setOpenPreview(false);
    const handleOpenPreview = () => setOpenPreview(true);

    const { tags, categories } = useSelector(state => state.common)

    useEffect(() => {
        const newErrors = {};
        if (title?.length == 0) {
            newErrors.title = 'タイトルは必須!';
        } else if (title?.length > 50) {
            newErrors.title = '全角50文字以内';
        } else {
            newErrors.title = "";
        }
        // if (!hashtags) {
        //     newErrors.hashtags = 'ハッシュタグは必須!';
        // } else if (hashtags.split(',').length > 10) {
        //     newErrors.hashtags = '10件まで登録可能';
        // }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
    }, [title, hashtags])



    const handleClick = async () => {

        if (!errors.title && !errors.hashtags) {
            if (!image) {
                toast.error('Please select an image!');
                return;
            }
            setIsLoading(true);
            const data = new FormData();
            data.append('name', title);
            data.append('category_id', category);
            data.append('price', basePrice);
            data.append('image', image);
            data.append('tag_ids', hashtags[0]);
            data.append('description', title);
            await axios.post('/products', data);
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

    const handleCancel = () => setIsOpen(false);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = useState(false);
    const handleClose1 = () => setOpen1(false);

    const [profile, setProfile] = useState(false);
    const profileOpen = () => setProfile(true);


    const [t] = useTranslation();
    return (<>
        <Badge.Ribbon text={t("商品登録画面")} className="mt-4 p-2 px-7 text-xl" >
            <div className="shadow-sm shadow-gray-400 py-28 flex flex-col gap-5 mt-20 px-4">
                <div className="grid md:grid-cols-12 flex-row">
                    <span>タイトル</span>
                    <div className="col-span-2"></div>
                    <div className="col-span-9">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                        <p className="text-sm"></p>
                    </div>
                </div>

                <div className="md:grid-cols-12 grid flex-row">
                    <span>カテゴリ</span>
                    <div className="col-span-2"></div>
                    <div className="col-span-9">
                        <Select className="w-full" value={category} onChange={setCategory} options={categories} />
                    </div>
                </div>

                <div className="md:grid-cols-12 grid flex-row">
                    <p className="col-span-2">ハッシュタグ</p>
                    <div className="col-span-1"></div>
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
                <p>オプション料金</p>
                <hr />

                <div className="grid md:grid-cols-12 flex-row">
                    <p className="col-span-2">上半身画像１枚分</p>
                    <div className="col-span-1"></div>
                    <div className="col-span-9">
                        <Select
                            className='w-full'
                            defaultValue="lucy"
                            value={topImagePrice}
                            onChange={setTopImagePrice}
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


                <div className="grid md:grid-cols-12 flex-row">
                    <p className="col-span-2">全身画像１枚分</p>
                    <div className="col-span-1"></div>
                    <div className="col-span-9">
                        <Select
                            className='w-full'
                            defaultValue="lucy"
                            value={fullImagePrice}
                            onChange={setFullImagePrice}
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
                <div className="grid md:grid-cols-12 flex-row">
                    <p className="col-span-2">動画５秒分</p>
                    <div className="col-span-1"></div>
                    <div className="col-span-9">
                        <Select
                            className='w-full'
                            defaultValue="lucy"
                            value={videofivePrice}
                            onChange={setVideoFivePrice}
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

                <div className="grid md:grid-cols-12 flex-row">
                    <p className="col-span-2">動画10秒分</p>
                    <div className="col-span-1"></div>
                    <div className="col-span-9">
                        <Select
                            className='w-full'
                            defaultValue="lucy"
                            value={videotenPrice}
                            onChange={setVideoTenPrice}
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
                <p>商品イメージ</p>
                <div className="">
                    <div className="flex-row flex gap-3">
                        {/* <Upload
                            {...property}
                        > */}

                        {/* <Upload
                            name="image"
                            listType="picture"
                            beforeUpload={() => false} // Prevent automatic upload
                            onChange={handleImageChange}
                        >
                            <Button icon={<UploadOutlined />}>ファイノえ選択</Button>
                        </Upload> */}
                        <input type="file" onChange={handleImageChange} />
                        {!image && <p>選火されていません</p>}
                    </div>
                    <p>ファイル形式Iよ）咋＜3・ゆ6、画像サイズは4X8まで</p>
                </div>
                <div className="flex flex-row gap-5 justify-center">
                    <Button type="primary" loading={isLoading} onClick={handleClick} className="w-48 bg-blue-500" icon={<FaPenClip />} >{t('Register')}</Button>
                    <Button type="primary" onClick={handleOpenPreview} className="w-48 bg-green-500" icon={<BsEye />} >{t('Preview')}</Button>
                </div>
            </div >
        </Badge.Ribbon>
        <Modal open={openPreview} onCancel={handleClosePreview} footer={<></>} width={1200}>
            <div className="py-24 px-2">
                <section id="product-title">
                    <p className="flex gap-1 text-sm mb-3">CREATER
                        <img className="w-5" src={expand} alt="expand" />
                    </p>
                    <div className="bg-blue-600 text-white py-1 font-medium rounded-md text-sm">
                        <p className="p-4 text-xl">■CREATER■ &nbsp;{user?.user?.username}</p>
                    </div>
                </section>
                <section id="carousel-box">
                    <div className="grid md:grid-cols-12 grid:row gap-5  mb-10">
                        <div className="gird col-span-6">
                            <Carousel className="carousel-product mt-24">
                                {[imageProduct, imageProduct, imageProduct].map((image, index) => (
                                    <div key={index}>
                                        {preview && <img className="main-img-carousel" src={preview} alt="product" />}
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="gird col-span-6 border border-gray-300 m-auto mt-10 text-center w-full py-10">
                            <div className='grid grid-row gap-2'>
                                <div className='grid grid-cols-6'>
                                    <div className='col-span-2'>
                                        タイトル
                                    </div>
                                    <div className='col-span-4'>
                                        {title}
                                    </div>
                                </div>
                                <div className='grid grid-cols-6'>
                                    <div className='col-span-2'>
                                        カテゴリー
                                    </div>
                                    <div className='col-span-4'>
                                        {categories?.filter(item => item.value === category)[0]?.label}
                                    </div>
                                </div>
                                <div className='grid grid-cols-6'>
                                    <div className='col-span-2'>
                                        ハッシュタグ
                                    </div>
                                    <div className='col-span-4'>
                                        {/* <TagGroup tags={['＃2024-SS', 'First', 'Collection', '#DRESS', '#JAPA']} /> */}
                                        <div className='col-span-4'>
                                            <div className="flex items-center justify-start gap-2 w-full flex-wrap m-0 relative left-0 right-0 ml-auto mr-auto my-5">
                                                {hashtags.map(item => <Tag key={item.id} closable bordered={false} color="blue">{tags?.filter(tag => tag.value === item)[0]?.label}</Tag>)}
                                            </div >
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-6'>
                                    <div className='col-span-2'>
                                        オプション
                                    </div>
                                    <div className='col-span-4'>
                                        <p className='text-red-500 text-sm'>クライアントから送られてきた各画像・動画に</p>
                                        <p className="text-red-500 text-sm">デジタルファッションを合成して納品する1枚当たりの価格</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='grid grid-cols-6'>
                                    <div className='col-span-2'>
                                        本体価格
                                    </div>
                                    <div className='col-span-4'>
                                        <p>${basePrice}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='grid grid-cols-6'>
                                    <div className='col-span-2'>
                                        上半身画像１枚分
                                    </div>
                                    <div className='col-span-4'>
                                        <p >＄35.00 USD</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='grid grid-cols-6'>
                                    <div className='col-span-2'>
                                        全身画像１枚分
                                    </div>
                                    <div className='col-span-4'>
                                        <p >＄35.00 USD</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='grid grid-cols-6'>
                                    <div className='col-span-2'>
                                        動画５秒分
                                    </div>
                                    <div className='col-span-4'>
                                        <p >＄35.00 USD</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='grid grid-cols-6 mb-20'>
                                    <div className='col-span-2'>
                                        動画10秒分
                                    </div>
                                    <div className='col-span-4'>
                                        <p >＄35.00 USD</p>
                                    </div>
                                </div>
                            </div>
                            <div className="gird md:col-span-6 flex-row border border-gray-300 m-auto mt-10 text-center w-full py-10">
                                <div className=' shadow-lg shadow-gray-400 p-5'>
                                    <VFM_Avatar img={user?.user?.avatar} size={32} path="/designer/profile" />
                                    <h1 className="text-[#5E4FDC]">CREATER</h1>
                                    <p className="text-lg font-thin mt-1 mb-1">{user?.user?.username}</p>
                                    <hr className='pb-5' />
                                    <div className='flex flex-col mt-5'>
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
                                                <p>${basePrice}</p>
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section >
            </div >
        </Modal >
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