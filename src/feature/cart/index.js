import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { Breadcrumb } from 'antd';
import image35 from "../../assets/images/image 35.png";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CustomModal from "../../components/custommodal";
import ItemCounter from "../../components/common/button/counter";
import { FaSimCard } from "react-icons/fa";
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Badge } from 'antd';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCartLength } from "../../store/slices/commonSlice";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [payment, setPayment] = useState(false);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        await axios.get('/cart')
            .then(response => {
                dispatch(setCartLength(response.data.cart?.items?.length))
                setCart(response.data.cart);
                setTotalPrice(response.data.totalPrice);
            })
            .catch(error => console.error('Error fetching cart:', error));
    }

    const removeFromCart = (itemId) => {
        axios.delete(`/cart/${itemId}`)
            .then(response => {
                fetchData()
                setTotalPrice(response.data.totalPrice);
            })
            .catch(error => console.error('Error removing from cart:', error));
    };

    const handleIncrease = async (cartItemId) => {
        try {
            await axios.post(`/cart/increase/${cartItemId}`);
            fetchData();
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const handleDecrease = async (cartItemId) => {
        try {
            await axios.post(`/cart/decrease/${cartItemId}`);
            fetchData();
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!cart) {
        return <div>カートの積載。。。</div>;
    }

    return (
        <>
            <section id="main-section" className="bg-white py-8 antialiased">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">ショッピングカート</h2>

                    <Breadcrumb
                        className="p-5"
                        separator=">"
                        items={[
                            {
                                title: 'DEGITAL_FASHION',
                            },
                            {
                                title: 'CART',
                            },
                        ]}
                    />
                    <div className="cart-bar">
                        <p>{!payment ? <>{t("CART")}</> : <>{t("PAYMENT COMPLETION")}</>}</p>
                    </div>
                    {!payment ?
                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl shadow-md shadow-gray-400">
                                <div className="space-y-6">
                                    {cart?.items?.map((item, index) => (
                                        <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <Badge count={item?.quantity} color="blue">
                                                    <a href="#" className="shrink-0 md:order-1">
                                                        <img className="h-20 w-20" src={item?.product?.image} alt="imac image" />
                                                    </a>
                                                </Badge>
                                                <label htmlFor="counter-input" className="sr-only">数量を選択:</label>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <ItemCounter
                                                        cartItemId={item.id}
                                                        quantity={item.quantity}
                                                        onIncrease={handleIncrease}
                                                        onDecrease={handleDecrease}
                                                    />
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900">{item.price}$</p>
                                                    </div>
                                                </div>
                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <a href="#" className="text-base font-medium text-gray-900 hover:underline">{item.name}</a>
                                                    <div className="flex items-center gap-4">
                                                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => removeFromCart(item.id)}>{t("削除")}</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full shadow-md shadow-gray-400">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                    <p className="text-xl font-semibold text-gray-900">オーダー概要</p>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">貯蓄</dt>
                                                <dd className="text-base font-medium text-gray-900">${totalPrice}</dd>
                                            </dl>
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">Savings</dt>
                                                <dd className="text-base font-medium text-green-600">-$299.00</dd>
                                            </dl>
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">店舗ピックアップ</dt>
                                                <dd className="text-base font-medium text-gray-900">$99</dd>
                                            </dl>
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">税金</dt>
                                                <dd className="text-base font-medium text-gray-900">$79</dd>
                                            </dl>
                                        </div>
                                        <hr />
                                        <dl className="flex items-center justify-between gap-4 pt-2">
                                            <dt className="text-base font-bold text-gray-900">合計</dt>
                                            <dd className="text-base font-bold text-gray-900">${totalPrice + 121}</dd>
                                        </dl>
                                    </div>
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                        <form className="space-y-4">
                                            <Button type="primary" className='w-full py-5' icon={<FaSimCard />} onClick={() => navigate('/payment')}>{t("お支払いに進む")}</Button>
                                        </form>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <a href="/all-items" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline">
                                            引き続き、お買い物を続ける
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className="text-center my-20">
                            <p>{t("支払いが完了しました")}</p>
                            <p onClick={() => navigate("/progress")} className="text-blue-500 cursor-pointer">{t("こちらのチャット画面より")}</p>
                            <p>{t("該当クリエイターとやり取りを始めてください")}</p>
                        </div>
                    }
                </div>
            </section>
            <CustomModal open={open} handleClose={handleClose}>
                <div className="modal-1-box">
                    <p>{t("Product deleted")}</p>
                </div>
            </CustomModal>
        </>
    );
}

export default Cart;
