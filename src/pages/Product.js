import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'swiper/css';
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import { React, useState, useRef, useEffect } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Modal } from 'antd';
import expand from "../assets/images/Expand_right_light.png";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaRegCalendarCheck } from "react-icons/fa6";
import { Button, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TagGroup } from "../components/common/tagGroup";
import VFM_Avatar from "../components/common/avatar";
import ContractMessages from './ContractChat';
import { NewProducts } from "../constant/new_products";
import { ProductCard } from "../components/card/productCard";
import AddToCartModal from "../components/common/modal";
import { useSelector } from "react-redux";
import axios from 'axios';


const Product = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { products } = useSelector(state => state.common)
    const { user } = useSelector(state => state.user)
    const [open, setOpen] = useState(false);
    const [isRequired, setIsRequired] = useState(false);
    const [product, setProduct] = useState({});
    const [open1, setOpen1] = useState(false);
    const [profile, setProfile] = useState(false);
    const [contractId, setContractId] = useState(0);
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const profileOpen = () => setProfile(true);
    const profileClose = () => setProfile(false);
    const handelContinue = () => {
        axios.post('/cart/add', { product_id: id, quantity: 1 })
            .then(res => {

                toast.success('Successfully added!')
                navigate('/cart');
            })
            .catch(error => {
                toast.error('Error adding to cart:', error)
            });
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

    useEffect(() => {
        contractId === 0 || contractId === undefined ?
            setIsRequired(false) : setIsRequired(true)

    }, [contractId])

    const handleRequired = async () => {
        const res = await axios.post('/contracts', { creator_id: product?.creator?.id, product_id: id, price: product?.price });
        setContractId(res?.data?.data?.id);
        setIsRequired(true);
        scrollToX(2000);
    }

    const fetch = async () => {
        let params = {
            creator_id: product?.creator?.id,
            product_id: id
        };

        const res = await axios.get('/contracts', params);
        if (res.data?.data === null) {
            setContractId(0)
        } else {
            setContractId(res?.data?.data?.id)
        }
    }

    const handleApply = async () => {
        setLoading(true);
        const res = await axios.put('/contracts_status/' + contractId, {
            price: product?.price,
            status: 2
        });
        setContractId(res?.data?.data?.id);
        setIsRequired(true);
        setLoading(false)
        navigate('/progress/' + contractId);
    }

    useEffect(() => {
        setProduct(products.filter(item => item.id == id)[0]);
    })
    useEffect(() => {
        if (user?.user?.user_type === 'Client') {
            fetch();
        }
    }, [])

    return (

        <div className="py-24" ref={scrollContainerRef}>
            <section className="mb-20">
                <p className="flex gap-1 text-sm m-b3">
                    {t("MARCKT PLACE")}
                    <img className="width-25" src={expand} alt="wait" />
                    {t("DRESS ALL ITEM")}
                </p>
                <div className="bg-blue-600 text-white py-1 font-medium rounded-md text-sm">
                    <p className="p-4 text-xl">{product?.creator?.username}</p>
                </div>
            </section>
            <section id="carosal-box">
                <div className="flex md:flex-row flex-col sm:gap-3 gap-5">
                    <div className="md:w-1/2 w-full">
                        <Carousel className="w-full">
                            <div>
                                <img className="main-img-caro" src={product?.image} alt="wait" />
                                <div className="favicon-product"><FavoriteBorderIcon /></div>
                            </div>
                            <div>
                                <img className="main-img-caro" src={product?.image} alt="wait" />
                                <div className="favicon-product"><FavoriteBorderIcon /></div>
                            </div>
                            <div>
                                <img className="main-img-caro" src={product?.image} alt="wait" />
                                <div className="favicon-product"><FavoriteBorderIcon /></div>
                            </div>
                        </Carousel>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <div>
                            <div className="flex flex-col gap-5 py-4">
                                <div className="flex items-center px-5 py-1 border-b">
                                    <span className="font-bold mr-2">{t("Category")}:</span>
                                    <p>{product?.category?.name}</p>
                                </div>
                                <div className="flex items-center px-5 py-1 border-b">
                                    <span className="font-bold w-24">{t("hashtag")}:</span>
                                    <div className="flex items-center justify-start gap-2 w-full flex-wrap m-0 relative left-0 right-0 ml-auto mr-auto my-5">
                                        {product?.tags?.map(tag => <Tag key={tag.id} closable bordered={false} color="blue">{tag.name}</Tag>)}
                                    </div >
                                </div>
                                <div className="flex items-center px-5 py-1 border-b">
                                    <span className="font-bold mr-2">{t("price")}:</span>
                                    <p>＄{product?.price} USD</p>
                                </div>
                                <div className="flex items-center px-5 py-1 border-b">
                                    <span className="font-bold mr-2">{t("option")}:</span>
                                    <p>＄35.00 USD～</p>
                                </div>
                            </div>
                            {user?.user?.user_type === 'Client' &&
                                <>
                                    <Button onClick={handleOpen}
                                        className="w-full bg-blue-500 text-white py-6 my-2"
                                        size="large"
                                        icon={<MdOutlineAddShoppingCart className="w-5 h-5" />} >
                                        <span className="pl-5 text-lg">{t("ADD TO CART")}</span>
                                    </Button>
                                    <Button
                                        className="bg-black my-1 text-white font-bold border-none py-4 w-full text-md round-md rounded-md hover:opacity-80 transition duration-500 shadow-md shadow-gray-500 hover:shadow-none"
                                        disabled={isRequired}
                                        onClick={handleRequired}
                                    >
                                        <span className="text-lg">{t("Inquiries regarding this product (2)")}</span>
                                    </Button>
                                    <Button
                                        className="bg-black text-white font-bold border-none py-4 w-full text-md round-md rounded-md hover:opacity-80 transition duration-500 shadow-md shadow-gray-500 hover:shadow-none"
                                        disabled={!isRequired}
                                        onClick={() => navigate('/progress')}
                                    >
                                        <span className="text-lg">{t("アーティストを指名して依頼をする")}</span>
                                    </Button>
                                </>
                            }
                        </div>
                        <div className="border border-gray-300 m-auto mt-10 text-center shadow-lg w-full p-3 md:p-10 shadow-gray-400 ">
                            <VFM_Avatar img={product?.creator?.avatar} size={32} path={"/designer/profile/" + id} />
                            <h1 className="text-[#5E4FDC]">CREATER</h1>
                            <p className="designer-title">{product?.creator?.username}</p>
                            <div className="text-center">
                                {product?.description}
                                <p className="text-blue-600 cursor-pointer mt-2" onClick={() => { profileOpen() }}>{t("... 続きを見る")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {user?.user?.user_type === 'Client' &&
                    <div className="mb-10">
                        <p className="text-lg font-thin mt-10">あなたへのオススメ</p>
                        <hr className="w-2/3 mb-10" />
                        <div className="product-wrap-1-div-respon sive flex flex-wrap">
                            <ProductCard products={NewProducts} isNew={true} />
                        </div>
                    </div>
                }
                navigate('/progress/' + contractId)
                {
                    isRequired &&
                    <>
                        <ContractMessages contractId={contractId} />
                        <div className="flex items-center justify-center mt-5">
                            <button type="submit" onClick={handleApply} class="max-w-[360px] w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center"> <FaRegCalendarCheck className="w-5 h-5" /><span>応募する</span></button>
                        </div>
                    </>
                }
            </section >
            <AddToCartModal
                product={product}
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
                    <VFM_Avatar img={product?.creator?.avatar} size={32} />
                    <h1 className="text-[#5E4FDC]">CREATER</h1>
                    <p className="designer-title">{product?.creator?.username}</p>
                    <div className="text-center">
                        {product?.description}
                        <p className="text-blue-600 cursor-pointer mt-2 pt-4" onClick={() => { profileOpen() }}>{t("とじる ...")}</p>
                    </div>

                </div>
            </Modal>
        </div >
    );
}

export default Product;
