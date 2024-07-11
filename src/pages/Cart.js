import React, { useState, useEffect } from "react";
import image35 from "../assets/images/image 35.png";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CustomModal from "../components/custommodal";

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

function Cart() {
    const initialCartData = {
        items: [
            {
                id: 1,
                name: "Kaiyo Aoki [ Eclipse of Elegance ]",
                price: 400,
                quantity: 1,
                image: image35
            },
            {
                id: 2,
                name: "Kaiyo Aoki [ Eclipse of Elegance ]",
                price: 400,
                quantity: 1,
                image: image35
            },
            {
                id: 3,
                name: "Kaiyo Aoki [ Eclipse of Elegance ]",
                price: 400,
                quantity: 1,
                image: image35
            }
        ],
        total: 1200
    };

    const [cartData, setCartData] = useState(initialCartData);
    const [payment, setPayment] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* <Header page={"webscreens"} pagetitle={"CART"} /> */}
            {/* <section id="main-section" className="cart-section-main-1">
                <div id="login" className="auth-divs">
                    <Breadcrumb
                        className="p-5"
                        separator=">"
                        items={[
                            {
                                title: 'TOP_PAGE',
                                href: '/'
                            },
                            {
                                title: 'CART',
                            },
                        ]}
                    />

                    <div className="cart-bar">
                        <p>{!payment ? <>{t("CART")}</> : <>{t("PAYMENT COMPLETION")}</>}</p>
                    </div>
                </div>
                {!payment ?
                    <>
                        <div className="w-2_3 mx-auto cart-detials-box mb-10 relative">
                            <img className="absolute w-[30px] right-[10px] top-[10px]" src={Dell_light} />
                            <h1 onClick={() => { handleOpen() }} className="text-2xl font-bold cart-title text-center pt-5 pb-10">Kaiyo Aoki [ Eclipse of Elegance ]</h1>
                            {cartData.items.map((item, index) => (
                                <div key={index} className="sub-cart--products">
                                    <img className="cart_box_img" src={item.image} alt="wait" />
                                    <p className="number-s-cart">{item.quantity}</p>
                                    <p className="kai-sub-title text-x">{item.name}</p>
                                    <p className="text-gray-700 relative top-4 mt-1 text-xs">${item.price.toFixed(2)} USD</p>
                                </div>
                            ))}
                            <hr className="w-3/4 mx-auto" />
                            <div className="total-cart">
                                <h1 className="font-bold text-xl">TOTAL</h1>
                                <h1 className="font-bold text-xl">${cartData.total.toFixed(2)} USD</h1>
                                <hr className="w-3/4 mx-auto" />
                            </div>
                        </div>
                        <div className="w-2_3 mx-auto cart-detials-box mb-10 relative">
                            <img onClick={() => { handleOpen() }} className="absolute w-[30px] right-[10px] top-[10px]" src={Dell_light} />
                            <h1 className="text-2xl font-bold cart-title text-center pt-5 pb-10">Kaiyo Aoki [ Eclipse of Elegance ]</h1>
                            {cartData.items.slice(0, 1).map((item, index) => (
                                <div key={index} className="sub-cart--products">
                                    <img className="cart_box_img" src={item.image} alt="wait" />
                                    <p className="number-s-cart">{item.quantity}</p>
                                    <p className="kai-sub-title text-x">{item.name}</p>
                                    <p className="text-gray-700 relative top-4 mt-1 text-xs">${item.price.toFixed(2)} USD</p>
                                </div>
                            ))}
                            <hr className="w-3/4 mx-auto" />
                            <div className="total-cart">
                                <h1 className="font-bold text-xl">TOTAL</h1>
                                <h1 className="font-bold text-xl">${cartData.total.toFixed(2)} USD</h1>
                                <hr className="w-3/4 mx-auto" />
                            </div>
                        </div>
                        <div className="w-2_3 mx-auto">
                            <hr className="w-3/4 mx-auto" />
                            <div className="total-cart">
                                <h1 className="font-bold text-xl">TOTAL</h1>
                                <h1 className="font-bold text-xl">${cartData.total.toFixed(2)} USD</h1>
                                <hr className="w-3/4 mx-auto" />
                            </div>
                        </div>
                        <p className="text-center font-bold text-blue-500">{t("Continue shopping")}</p>
                        <button onClick={() => { setPayment(!payment) }} className="proceed-to-payment hover:opacity-50 duration-500 shadow-md shadow-gray-500">Proceed to payment</button>
                    </> :
                    <div className="text-center">
                        <p>{t("Payment has been completed")}</p>
                        <p onClick={() => { navigate("/progress") }} className="text-blue-500 cursor-pointer">{t("This chat screen")}</p>
                        <p>{t("Please start communicating with the corresponding designer.")}</p>
                    </div>}
            </section> */}
            <CustomModal open={open} handleClose={handleClose}>
                <div className="modal-1-box">
                    <p>{t("Product deleted")}</p>
                </div>
            </CustomModal>

        </>
    );
}

export default Cart;
