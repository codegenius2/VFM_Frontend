import React, { useState, useEffect } from "react";
import Iconsimg from "../../assets/images/Icons.png";
import { GrStatusGood } from "react-icons/gr";
import { FaRegDotCircle } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { Select } from "antd";
import { CgMoreO } from "react-icons/cg";
const TableStatus = ({ categoryData }) => {

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



    const statusMap = {
        1: '相談',
        2: '応募',
        3: '契約',
        4: '納品',
        5: '検収',
        6: '完了'
    };
    const statusImageMap = {
        1: <CgMoreO className="text-gray-500 w-10 h-10" />,
        2: <FaRegDotCircle className="text-pink-500 w-10 h-10" />,
        3: <FaRegDotCircle className="text-orange-500 w-10 h-10" />,
        4: <FaRegDotCircle className="text-purple-500 w-10 h-10" />,
        5: <FaRegDotCircle className="text-blue-500 w-10 h-10" />,
        6: <GrStatusGood className="text-green-500 w-10 h-10" />
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
                    <div id="header" className="bg-[#024DBE] text-white grid grid-cols-9">
                        <h1 className="col-span-1 py-3 font-medium text-center">販売商品カテゴリ</h1>                        <h1 className="col-span-1 py-3 font-medium text-center">販売商品タイトル</h1>
                        <h1 className="col-span-1 py-3 font-medium text-center">金額</h1>
                        <h1 className="col-span-1 py-3 font-medium text-center">契約日</h1>
                        <h1 className="col-span-1 py-3 font-medium text-center">納品予定日</h1>
                        <h1 className="col-span-1 py-3 font-medium text-center">取引完了日</h1>
                        <h1 className="col-span-1 py-3 font-medium text-center">進捗</h1>
                        <h1 className="col-span-1 py-3 font-medium text-center">リクエスター名</h1>
                        <h1 className="col-span-1 py-3 font-medium text-center">クリエイター名</h1>
                    </div>
                    {data.map((data, index) => (
                        <>
                            <div key={index} className="grid grid-cols-9 py-5 items-center text-center border-b-gray-500 border">

                                <h1 className="col-span-1 whitespace-normal break-word">{data.category}</h1>
                                <h1 className="col-span-1 whitespace-normal break-word">{data.product?.name}</h1>
                                <h1 className="col-span-1 whitespace-normal break-word">${data.price}</h1>
                                <h1 className="col-span-1 whitespace-normal break-word">{data.created_at.slice(0, 10)}</h1>
                                <h1 className="col-span-1 whitespace-normal break-word">{data.updated_at.slice(0, 10)}</h1>
                                <h1 className="col-span-1 whitespace-normal break-word">{data.updated_at.slice(0, 10)}</h1>
                                <div className="col-span-1 flex items-center flex-col text-xs">
                                    {statusImageMap[data?.status]}
                                    <h1 className="p-2 items-center">{statusMap[data?.status] || statusMap.default}</h1>
                                </div>
                                <div className="col-span-1 flex flex-col gap-2 items-center">
                                    <img src={data.client?.avatar} className="rounded-full w-10 h-10" />
                                    <span>{data.client?.username}</span>
                                </div>
                                <div className="col-span-1 flex flex-col gap-2 items-center">
                                    <img src={data.creator?.avatar} className="rounded-full w-10 h-10" />
                                    <span>{data.creator?.username}</span>
                                </div>
                            </div>
                            <hr />
                        </>
                    ))}

                </div>
            </div >
        </>
    );
}

export default TableStatus;