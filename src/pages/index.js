
import React, { useState, useEffect } from "react";
import pic_15 from "../assets/images/15.png";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductCard } from "../components/card/productCard";
import { FashiomMall } from "../components/card/FashiomMall";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/navigation'; // Import Navigation styles if using Navigation
import 'swiper/css/pagination'; // Import Pagination styles if using Pagination

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useSelector } from "react-redux";

function Landing() {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const [newProducts, setNewProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  const { products } = useSelector((state) => state.common);


  useEffect(() => {
    const sortedProducts = [...products]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
    setNewProducts(sortedProducts);
  }, [products]);

  useEffect(() => {
    console.log(products)
    const sortedProducts = [...products]
      .filter(item => item.category?.name === titles[activeIndex])
      .slice(0, 5);
    setCategoryProducts(sortedProducts)
  }, [activeIndex])

  const handleNavigation = () => {
    navigate('/auth')
  }

  const titles = ["APPAREL", "ACCESSORY", "HAIRDO", "FOOD", "EFFECT", "INTERIOR DECORATION"];
  return (
    <>
      {/* <Header page={"webscreens"} pagetitle={"landing_screen"} /> */}
      <section id="Slider" className="mt-2">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 1.4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 1.8,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {newProducts?.map(item => < SwiperSlide > <img src={item?.image} alt="Sample Image" className="w-full" /></SwiperSlide>)

          }
        </Swiper>
      </section >
      <section id="products" className="my-32">
        <h1 className="text-badge font-extrabold text-3xl mb-2"> {t("NEW PRODUCTS")}</h1>
        <ProductCard products={newProducts} isNew={true} />
      </section>
      <section id="Active-Creator">
        <div className="bg-gray-100 p-10 text-center item-center">

          <div className="flex items-center">
            <img className="w-[180px] mx-auto mb-2" src={pic_15} />
          </div>
          <p className="text-[45px] md:text-[85px] text-center font-thin py-1">{t("ACTIVE AS A CREATOR")}</p>
          <p className="text-center py-2">
            私たちのプラットフォームでは、<br /> あなたの創作したデジタルファッションを <br />世界中のクライアントに届ける場を提供しています。
          </p>
          {!user && <div className="flex items-center justify-center gap-10 py-10 flex-col md:flex-row">
            <button className="bg-blue-700 text-white shadow-lg shadow-gray-400 font-bold text-sx rounded-lg px-10 py-2 hover:shadow-xs hover:bg-blue-500 transition duration-500 ease-in-out" onClick={handleNavigation}>{t("LOGIN")}</button>
            <button className="bg-blue-700 text-white shadow-lg shadow-gray-400 font-bold text-sx rounded-lg px-10 py-2 hover:shadow-xs hover:bg-blue-500 transition duration-500 ease-in-out" onClick={handleNavigation}>{t("CREATE")}</button>
          </div>
          }

        </div>
      </section >
      <section id="ranking" className="pt-[45px] pb-[40px] my-28">
        <h1 className="text-badge font-extrabold text-3xl pb-10">{t("RANKING")}</h1>
        <div className="flex items-center justify-center gap-4 overflow-x-auto whitespace-nowrap pr-6 mb-10">
          {titles.map((title, index) => (
            <div
              key={index}
              className={`text-md font-bold inline-block whitespace-nowrap cursor-pointer transition duration-300 ease-in-out py-3 px-7 rounded-md  ${index === activeIndex ? 'border-b-1 bg-blue-400 text-white' : 'border-bottom: solid 1px #E5E5E5'}`}
              onClick={() => setActiveIndex(index)}
            >
              {t(title)}
            </div>
          ))}
        </div>

        <div className="flex gap-12 overflow-x-scroll pb-8 scroll-div text-2xl">

          <ProductCard products={categoryProducts} isNew={false} isPopular={true} />
        </div>
      </section >
      <section id="virtual">
        <div className="bg-gray-200 p-5 text-lg font-bold text-center">
          <p>＠VIRTUAL FASHION MALL for Instgram</p>
        </div>
        <FashiomMall />
      </section >
    </>
  );
}

export default Landing;
