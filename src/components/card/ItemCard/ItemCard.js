import React from 'react';
import { useTranslation } from "react-i18next";
import { CiViewList } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import './style.css';


const ItemCard = ({ image, name, price, updated_at, id }) => {
    const [t, i18] = useTranslation();
    const navigate = useNavigate();

    const currentDate = new Date();
    const createdDate = new Date(updated_at);

    const thresholdInDays = 3;

    const thresholdDate = new Date(currentDate);
    thresholdDate.setDate(currentDate.getDate() - thresholdInDays);

    const isNew = createdDate > thresholdDate;

    return (
        <div div draggable={false}
            // Assuming each product has a unique id
            className={`item-card text-center flex-shrink-0 shadow-lg border shadow-gray-400 ${isNew ? 'w-350 cursor-pointer' : 'w-460'}`}
        >
            {isNew && <div className='absolute top-5 left-0 transform -translate-x-1/2 translate-y-1/2 bg-red-500 text-white py-2 px-4 rotate-[-45deg] z-10 shadow-sm shadow-gray-500'>
                <span className='px-12 ml-20 font-montserrat text-sm'>{t("NEW")}</span>
            </div>}
            <figure>
                <img
                    src={image}
                    alt="t-shirt"
                />
            </figure>
            <section className="item-details">
                <div className="min-details">
                    <h1>{name}</h1>
                    <h1 className="price">{price}$</h1>
                </div>
                <Button type="primary" className="w-full my-7 py-5" onClick={() => { navigate('/product/' + id) }} icon={<CiViewList className="w-6 h-6" />} >商品詳細画面へ</Button>
            </section>
        </div>
    );
}

export default ItemCard;
