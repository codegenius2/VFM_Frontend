import Header from "../../components/header";
import React, { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Adminlogin() {
    const Swal = require('sweetalert2');
    const navigate = useNavigate();
    const [age, setAge] = useState('');
    const [loginpage, setLoginpage] = useState(true);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const pageChagne = () => {
        setLoginpage(!loginpage);
    }

    const loginpagefun = () => {
        localStorage.setItem("activeadmin", 0);
        navigate('/design-management-screen');
    }

    const registerFun = () => {
        Swal.fire({
            icon: "success",
            title: "新規アカウント作成が完了しました",
            showConfirmButton: false,
            timer: 2500
        });
        setTimeout(() => {
            localStorage.setItem("activeadmin", 0);
            navigate('/design-management-screen');
        }, 2500);
    }

    return (
        <>
            {/* <Header page={"adminlogin"} pagetitle={"VRTUAL FASHION MALL に クリエイター または、ユーザーとして登録する "} /> */}
            <section>
                <div className="px-10 py-20">
                    {loginpage ? (
                        <div className="admin-login-box bg-white p-10 rounded shadow">
                            <p className="admin-login-box-title text-2xl font-bold mb-5">ログイン</p>
                            <div className="">
                                <div className="admin-flex-justify flex items-center mb-4">
                                    <p className="font-semibold w-36">ユーザー名</p>
                                    <input className="w-full bg-white border border-gray-200 rounded-lg text-gray-700 text-sm h-12 leading-tight px-3" placeholder="ユーザー名" type="text" />
                                </div>
                                <div className="admin-flex-justify flex items-center mb-4">
                                    <p className="font-semibold w-36">パスワード</p>
                                    <input className="w-full bg-white border border-gray-200 rounded-lg text-gray-700 text-sm h-12 leading-tight px-3" type="password" placeholder="" />
                                </div>
                                <button onClick={loginpagefun} type="submit" class="w-full max-w-[360px] mx-auto mt-8 flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center mb-2 ">ログイン</button>
                                <p onClick={pageChagne} className="admin-login-last-line text-rose-600 cursor-pointer mt-4 font-normal">新規アカウント作成</p>
                            </div>
                        </div>
                    ) : (
                        <div className="admin-login-box bg-white p-10 rounded shadow">
                            <p className="admin-login-box-title text-2xl font-bold mb-5">新規アカウント作成</p>
                            <div>
                                <div className="admin-flex-justify flex items-center mb-4">
                                    <p className="font-semibold w-36">ユーザー名</p>
                                    <input className="input-admin-login border rounded px-3 py-2 w-full" placeholder="ユーザー名" type="text" />
                                </div>
                                <div className="admin-flex-justify flex items-center mb-4">
                                    <p className="font-semibold w-36">パスワード</p>
                                    <input className="input-admin-login border rounded px-3 py-2 w-full" type="password" placeholder="" />
                                </div>
                                <div className="admin-flex-justify flex items-center mb-4">
                                    <p className="font-semibold w-36">パスワード再確認</p>
                                    <input className="input-admin-login border rounded px-3 py-2 w-full" type="password" placeholder="" />
                                </div>
                                <button onClick={registerFun} className="admin-login-btn bg-blue-500 text-white rounded px-4 py-2">新規アカウント作成</button>
                                <p onClick={pageChagne} className="admin-login-last-line text-blue-500 cursor-pointer mt-4">ログイン</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Adminlogin;
