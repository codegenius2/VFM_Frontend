import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Modal } from 'antd';
import image35 from "../../../assets/images/image 35.png";

import ItemCounter from '../button/counter';

const AddToCartModal = ({ open, onCancel, onClickOK, product }) => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('M');
    const [t, i18] = useTranslation();



    return (
        <Modal
            open={open}
            onOk={onClickOK}
            onCancel={onCancel}
            okText={<div className='relative px-5'>
                <MdOutlineAddShoppingCart className='left-0.5 top-0.5 text-xl absolute' />
                <span className='ml-2'>Add to Cart</span></div>}
            cancelText="Cancel"
            width={900}
        >
            <div className='w-92'>
                <h1 className="text-center py-4 text-3xl font-bold">{t("OPTION")}</h1>
                <div className="justify-center items-center flex flex-col">
                    <div className='flex w-52 h-52'>
                        <img className="obsect-cover w-full h-full" src={product?.image} alt="wait" />
                    </div>
                    <div className="mt-6 flex flex-col gap-4 align-middle text-center">
                        <p className="flex justify-center text-xl mt-6">{product?.creator?.username}</p>
                        <div className="flex items-center justify-center gap-4">
                            <p className="font-bold text-gray-400"> PICTUER-UPPER BODY</p>
                            <p className="font-thin text-gray-400 mr-5">＄35.00 USD</p>
                            <ItemCounter />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <p className="font-bold text-gray-400"> PICTUER-UPPER BODY</p>
                            <p className="font-thin text-gray-400 mr-5">＄35.00 USD</p>
                            <ItemCounter />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <p className="font-bold text-gray-400"> PICTUER-UPPER BODY</p>
                            <p className="font-thin text-gray-400 mr-5">＄35.00 USD</p>
                            <ItemCounter />
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <p className="font-bold text-gray-400"> PICTUER-UPPER BODY</p>
                            <p className="font-thin text-gray-400 mr-5">＄35.00 USD</p>
                            <ItemCounter />
                        </div>
                        <p className="cart-popup-txt">{t("If you do not purchase any options, you will only pay for the basic data of this product.")}</p>
                    </div>
                </div>
            </div>
        </Modal >
    );
};

export default AddToCartModal;
