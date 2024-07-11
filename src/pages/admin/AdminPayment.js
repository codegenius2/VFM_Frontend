import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { LuRefreshCw } from "react-icons/lu";

const AdminPayment = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(1);
    const [year, setYear] = useState(2024);
    // const [data, setData] = useState([]);

    useEffect(() => {
    }, [active, year])


    // const filterContract = (dataArray) => {
    //     return dataArray.filter(item => {
    //         const date = new Date(item.created_at);
    //         return date.getFullYear() === year && date.getMonth() === active; // Month is zero-indexed (0=Jan, 6=Jul)
    //     });
    // };


    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/payments');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: '販売商品カテゴリ', dataIndex: 'category', key: 'category' },
        { title: '販売商品タイトル', dataIndex: 'title', key: 'title' },
        { title: '金額', dataIndex: 'amount', key: 'amount' },
        { title: '売上日', dataIndex: 'sale_date', key: 'sale_date' },
        { title: 'クライアント名', dataIndex: 'client_name', key: 'client_name' },
        { title: 'クリエイター名', dataIndex: 'creator_name', key: 'creator_name' },
        { title: '入金額', dataIndex: 'deposit_amount', key: 'deposit_amount' },
        { title: '入金日', dataIndex: 'deposit_date', key: 'deposit_date' },
        {
            title: '入金済/未入金',
            dataIndex: 'is_paid',
            key: 'is_paid',
            render: (is_paid) => (is_paid ? '入金済' : '未入金'),
        },
    ];

    return (
        <div>
            <div className="flex items-end flex-col">
                <p className="justify-end">{year}年 {active + 1}月入金総額 0円</p>
                <hr />
                <p className="justify-end">{year}年 {active + 1}月入金数	0件</p>
            </div>
            <Button onClick={fetchPayments} className="my-2" icon={<LuRefreshCw />} loading={loading}>リフレッシュ</Button>
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
            <h1 className="text-sm w-48 left-0 relative right-0 ml-auto border-b-2 border-badge pb-1 text-right">{year}年 {active + 1}月マッチ数　{payments?.length}件</h1>
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
            <Table dataSource={payments} columns={columns} rowKey="id" />
        </div>
    );
};

export default AdminPayment;

