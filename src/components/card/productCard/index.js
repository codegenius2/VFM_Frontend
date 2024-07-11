import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Badge, Button } from 'antd'
import { CiViewList } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import './style.css'

export const ProductCard = ({ products, isNew, isPopular }) => {
    const navigate = useNavigate();
    const [t, i18] = useTranslation();
    const [click, setClick] = useState(false);
    const Ref = useRef();

    useEffect(() => {
        if (!Ref.current) return;
        let isDown = false;
        let startX;
        let scrollLeft;

        Ref.current.addEventListener("mousedown", (e) => {
            isDown = true;
            setClick(true);
            startX = e.pageX - Ref.current.offsetLeft;
            scrollLeft = Ref.current.scrollLeft;
        });
        Ref.current.addEventListener("mouseleave", () => {
            isDown = false;
            setClick(false);
        });
        Ref.current.addEventListener("mouseup", () => {
            isDown = false;
            setClick(false);
        });
        Ref.current.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - Ref.current.offsetLeft;
            const walk = x - startX;
            Ref.current.scrollLeft = scrollLeft - walk;
        });
    }, [Ref]);
    return isPopular ?
        (
            <div
                className="flex gap-10  overflow-x-scroll pb-8 scroll-div text-2xl pr-6"
                style={{
                    transform: click ? "scale(1)" : "scale(0.98)",
                    transition: "all .2s ease"
                }}
                ref={Ref}
            >
                {products.map((item, index) => (
                    <Badge.Ribbon text={item?.category?.name} className="mt-4 p-2 px-7 text-xl" key={index}>
                        <div draggable={false} onClick={() => { navigate('/product/' + item?.id) }}
                            key={item.id} // Assuming each product has a unique id
                            className={`item-card text-center flex-shrink-0 shadow-lg border shadow-gray-400 ${isNew ? 'w-350 cursor-pointer' : 'w-460'}`}
                        >
                            {isNew && <div className='absolute top-5 left-0 transform -translate-x-1/2 translate-y-1/2 bg-red-500 text-white py-2 px-4 rotate-[-45deg] z-10 shadow-sm shadow-gray-500'>
                                <span className='px-12 ml-20 font-montserrat text-sm'>{t("NEW")}</span>
                            </div>}
                            <img src={item.image} alt="wait" className="absolute scale-[1.03] w-[500px] " draggable={false} />
                            <section className="item-details" draggable={false}>
                                <div className="min-details">
                                    <h1 className="font-extrabold text-blue-500">{item.name}</h1>
                                    <h1 className="price font-bold text-red-500">${item.price}</h1>
                                </div>
                                <span className="my-2 text-lg font-semibold">{item?.creator?.username}</span>
                                <Button type="primary" className="w-full my-7 py-5" onClick={() => { navigate('/product/' + item?.id) }} icon={<CiViewList className="w-6 h-6" />} >商品詳細画面へ</Button>
                            </section>
                        </div>
                    </Badge.Ribbon>
                ))
                }
            </div >

        ) : (
            <div
                className="flex gap-10  overflow-x-scroll pb-8 scroll-div text-2xl"
                style={{
                    transform: click ? "scale(1)" : "scale(0.98)",
                    transition: "all .2s ease"
                }}
                ref={Ref}
            >
                {products.map((item, index) => (
                    <div draggable={false} onClick={() => { navigate('/product/' + item?.id) }}
                        key={index}
                        className={`item-card text-center flex-shrink-0 shadow-lg border shadow-gray-400 ${isNew ? 'w-350 cursor-pointer' : 'w-460'}`}
                    >
                        {isNew && <div className='absolute top-5 left-0 transform -translate-x-1/2 translate-y-1/2 bg-red-500 text-white py-2 px-4 rotate-[-45deg] z-10 shadow-sm shadow-gray-500'>
                            <span className='px-12 ml-20 font-montserrat text-sm'>{t("NEW")}</span>
                        </div>}
                        <img src={item.image} alt="wait" className="absolute  scale-[1.03] w-[500px]" draggable={false} />
                        <section className="item-details" draggable={false}>
                            <div className="min-details">
                                <h1 className="font-extrabold text-blue-500">{item.name}</h1>
                                <h1 className="price font-bold text-red-500">${item.price}</h1>
                            </div>
                            <span className="my-2 text-lg font-semibold">{item?.creator?.username}</span>
                            <Button type="primary" className="w-full my-7 py-5" onClick={() => { navigate('/product/' + item?.id) }} icon={<CiViewList className="w-6 h-6" />} >商品詳細画面へ</Button>
                        </section>
                    </div>
                ))
                }
            </div >

        );
};
