import React, { useState, useEffect } from "react";
import Iconsimg from "../../assets/images/Icons.png";
const PaymentTable = ({ categoryData }) => {

    const [active, setActive] = useState(1);
    const [year, setYear] = useState(2024);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(filterContract(categoryData))
    }, [active, year])


    const filterContract = (dataArray) => {
        return dataArray.filter(item => {
            const date = new Date(item.created_at);
            return date.getFullYear() === year && date.getMonth() === active; // Month is zero-indexed (0=Jan, 6=Jul)
        });
    };

    return (
        <>
            <div className="main-admin-search py-12 px-8">
                <select onClick={(e) => setYear(e.target.value)} className="max-w-[360px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="2024">2024年</option>
                    <option value="2023">2023年</option>
                    <option value="2022">2022年</option>
                    <option value="2021">2021年</option>
                    <option value="2020">2020年</option>
                    <option value="2019">2019年</option>
                    <option value="2018">2018年</option>
                    <option value="2017">2017年</option>
                    <option value="2016">2016年</option>
                    <option value="2015">2015年</option>
                </select>
                <h1 className="text-sm w-48 left-0 relative right-0 ml-auto border-b-2 border-badge pb-1 text-right">{year}年 {active + 1}月マッチ数　{data?.length}件</h1>
                <div className="admin-stutus_main-box">
                    <div className={active === 0 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(0) }} className="admin-status-box">
                            <p className="p-3">1月</p>
                        </div>
                    </div>
                    <div className={active === 1 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(1) }} className="admin-status-box">
                            <p className="p-3">2月</p>
                        </div>
                    </div>
                    <div className={active === 2 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(2) }} className="admin-status-box">
                            <p className="p-3">3月</p>
                        </div>
                    </div>
                    <div className={active === 3 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(3) }} className="admin-status-box">
                            <p className="p-3">4月</p>
                        </div>
                    </div>
                    <div className={active === 4 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(4) }} className="admin-status-box">
                            <p className="p-3">5月</p>
                        </div>
                    </div>
                    <div className={active === 5 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(5) }} className="admin-status-box">
                            <p className="p-3">6月</p>
                        </div>
                    </div>
                    <div className={active === 6 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(6) }} className="admin-status-box">
                            <p className="p-3">7月</p>
                        </div>
                    </div>
                    <div className={active === 7 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(7) }} className="admin-status-box">
                            <p className="p-3">8月</p>
                        </div>
                    </div>
                    <div className={active === 8 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(8) }} className="admin-status-box">
                            <p className="p-3">9月</p>
                        </div>
                    </div>
                    <div className={active === 9 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(9) }} className="admin-status-box">
                            <p className="p-3">10月</p>
                        </div>
                    </div>
                    <div className={active === 10 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(10) }} className="admin-status-box">
                            <p className="p-3">11月</p>
                        </div>
                    </div>
                    <div className={active === 11 ? 'active-admin-status-bar' : 'curser-point'}>
                        <div onClick={() => { setActive(11) }} className="admin-status-box">
                            <p className="p-3">12月</p>
                        </div>
                    </div>
                </div>
                <div className="admin-search-box">
                    <div id="header" className="header-admin-table">
                        <h1 className="w-301 text-5 p-2 font-medium text-center">販売商品カテゴリ</h1>
                        <h1 className="w-302 text-5 p-2 font-medium text-center">販売商品タイトル</h1>
                        <h1 className="w-301 text-5 p-2 font-medium text-center">金額</h1>
                        <h1 className="w-301 text-5 p-2 font-medium text-center">売上日</h1>
                        <h1 className="w-301 text-5 p-2 font-medium text-center">クライアント名</h1>
                        <h1 className="w-301 text-5 p-2 font-medium text-center">クリエイター名</h1>
                        <h1 className="w-301 text-5 p-2 font-medium text-center">入金額</h1>
                        <h1 className="w-301 text-5 p-2 font-medium text-center">入金日</h1>
                        <h1 className="w-301 text-5 p-2 font-medium text-center">入金済/未入金</h1>
                    </div>
                    {data.map((data, index) => (
                        <div key={index} className="header-admin-table-1">
                            <h1 className="w-301 p-2 whitespace-normal break-word">{data.category}</h1>
                            <h1 className="w-302 p-2 pr-10 whitespace-normal break-word">{data.product?.name}</h1>
                            <h1 className="w-301 p-2 whitespace-normal break-word">${data.price}</h1>
                            <h1 className="w-301 p-2 whitespace-normal break-word">{data.created_at.slice(0, 10)}</h1>
                            <h1 className="w-301 p-2 whitespace-normal break-word">{data.updated_at.slice(0, 10)}</h1>
                            <h1 className="w-301 p-2 whitespace-normal break-word">{data.updated_at.slice(0, 10)}</h1>
                            <div className="w-301 p-2 flex items-center flex-col text-xs">
                                <img className="w-10" src={Iconsimg} alt="wait" />
                                <h1 className="p-2 items-center">購入完了</h1>
                            </div>
                            <h1 className="w-301 p-2 whitespace-normal break-word">{data.client?.username}</h1>
                            <h1 className="w-301 p-2 whitespace-normal break-word bg-blue-500 text-slate-50">入金済みにする</h1>
                        </div>
                    ))}

                </div>
            </div >
        </>
    );
}

export default PaymentTable;