import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuLogIn } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsCartPlus } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import { Button, Badge, Avatar, Dropdown, Menu } from 'antd'
import { logOut } from '../../store/slices/userSlice';
import axios from 'axios';
import logo from '../../assets/images/logo/LOGO.png';

import LanguageDropdown from './LanguageDropdown';

import { CLIENT_MENU_DATA, CREATOR_MENU_DATA, MENU_DATA } from '../../constant/menu_data';
import { LoginOutlined } from '@ant-design/icons';
import { CiMail } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserNav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.user);
    const { unreadMessages, cartLength } = useSelector(state => state.common)
    const location = useLocation();
    const [showHamburger, setShowHamburger] = useState(false);
    const [active, setActive] = useState('')

    useEffect(() => {
        if (location.pathname === '/') setActive('/home')
    }, [location]);

    useEffect(() => {
        // toast.info("New Message Delivered!")
    }, [unreadMessages])

    const handleOpen = () => setShowHamburger(true)
    const handleClose = () => setShowHamburger(false)
    const handleClick = (path, title) => {
        setActive(title)
        setShowHamburger(false)
        navigate(path)
    }

    const handleLogout = () => {
        if (token) {
            dispatch(logOut());
            toast.success('ログアウトに成功しました。')
            navigate('/auth');
        }
    }
    const menu = (
        <Menu className="w-32">
            {user?.user?.user_type === 'Client' ?
                <Menu.Item key="1" >
                    <div className="flex flex-row items-center justify-start" onClick={() => { navigate('/Requester/dashboard') }}>
                        <ImProfile className="w-4 h-4 mr-1" />
                        <span>My Page</span>
                    </div>
                </Menu.Item> :
                <Menu.Item key="3">
                    <div className="flex flex-row items-center justify-start" onClick={() => { navigate('/designer/dashboard') }}>
                        <ImProfile className="w-4 h-4  mr-1" />
                        <span> My Page</span>

                    </div>
                </Menu.Item>
            }
            <Menu.Item key="2">
                <div className="flex flex-row items-center justify-start" onClick={handleLogout}><BiLogOut className="w-4 h-4  mr-1" />Logout</div>
            </Menu.Item>
        </Menu>
    );

    const mainMenu = (
        <Menu className="sm:w-[540px] w-full p-2">
            {unreadMessages.length > 0 ? unreadMessages?.map((message, index) =>
                <>
                    <Menu.Item key={index} className="m-2">
                        <div className="sm:text-xl text-xs flex flex-row items-center justify-start p-3" onClick={() => { navigate('/progress/' + message?.contract_id) }}>
                            <IoMailOutline className="w-6 h-6 mr-1" />
                            <span>{message?.sender?.username}さんからお問い合わせがありました。</span>
                        </div>

                    </Menu.Item>
                    <hr className="m-3" />
                </>
            ) : (
                <Menu.Item className="m-2">
                    <div className="sm:text-xl text-xs flex flex-row items-center justify-start p-3">
                        <span>メッセージなし</span>
                    </div>
                </Menu.Item>
            )}

            {/* <Menu.Item key="3" className="m-2">
                <div className="flex flex-row items-center justify-start p-2" onClick={() => { navigate('/request-preview') }}>
                    <IoMailOpenOutline className="w-6 h-6  mr-1" />
                    <span> REQUEST_USER000からリクエストが届きました。</span>
                    <Badge count={1}></Badge>
                </div>
            </Menu.Item>
            <hr className="m-3" />
            <Menu.Item key="2" className="p-2">
                <div className="flex flex-row items-center justify-start p-2">
                    <IoMailOpenOutline className="w-6 h-6 mr-1" onClick={() => { navigate('/Requester/dashboard') }} />DESIGNER_USER000さんから応募がありました。</div>
            </Menu.Item>
            <hr className="m-3" />
            <Menu.Item key="4" className="m-2">

                <div className="flex flex-row items-center justify-start p-2">
                    <IoMailOutline className="w-6 h-6 mr-1" />
                    <span>REQUEST_USER000さんがあなたの商品を購入しました。</span>
                    <Badge count={1}></Badge>
                </div>

            </Menu.Item> */}
        </Menu >
    );


    return (
        <header className="bg-gray-100 shadow-sm shadow-gray-500">
            <nav className="w-full flex items-center p-6 lg:p-2 justify-end" aria-label="Global">
                <div className="flex lg:hidden gap-5 flex-row">
                    <div className="flex-row flex gap-4">
                        <Button shape="circle" icon={<TiSocialFacebook className="h-6 w-6 text-blue-500" />} />
                        <Button shape="circle" icon={<FaInstagram className="h-6 w-6  text-blue-500" />} />
                        <Button shape="circle" icon={<RiTwitterXFill className="h-6 w-6  text-blue-500" />} />
                        {user &&
                            <Dropdown overlay={mainMenu}
                                arrow={{
                                    pointAtCenter: true,
                                }}>
                                {unreadMessages?.length > 0 ? <Badge count={unreadMessages?.length}>
                                    <Avatar shape="square" icon={<CiMail />} />
                                </Badge> : <Avatar shape="square" icon={<CiMail />} />

                                }
                            </Dropdown>}

                    </div>
                    <div className="flex flx-row items-center gap-5">

                        {user &&
                            <Dropdown Dropdown overlay={menu}
                                arrow={{
                                    pointAtCenter: true,
                                }}>
                                <Badge dot>
                                    <Avatar shape="square" icon={<FaRegUser />} />
                                </Badge>
                            </Dropdown>}
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={handleOpen}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>

                    </div>
                </div>
                <div className="hidden lg:flex lg:gap-x-4 lg:justify-start items-center">
                    {(user?.user?.user_type === 'Client' ? CLIENT_MENU_DATA : user?.user?.user_type == 'Creator' ? CREATOR_MENU_DATA : MENU_DATA)?.subMenus?.map((links, index) => {
                        return <div className={`group relative flex justify-start gap-x-6 p-4 text-sm leading-6  hover:translate-x-1 transition border duration-300`} key={index} >
                            <div className="flex-auto">
                                <a className={`block font-semibold text-gray-900 border text-xl text-shadow-md shadow-gray-500 ${active === links?.title ? " text-shadow-none" : ""}`} onClick={() => handleClick(links?.pathname, links?.title)} >
                                    {links.title}
                                    <span className="absolute inset-0"> </span>
                                </a>
                                <p className="mt-1 text-gray-600">{links?.description}</p>
                            </div>
                        </div>
                    })
                    }
                    <LanguageDropdown />
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end flex-row gap-4 mr-2">
                    {user?.user?.user_type === 'Client' &&
                        <Badge count={cartLength}>
                            <Button shape="circle" onClick={() => navigate('/cart')} icon={<BsCartPlus className="h-6 w-6 text-blue-500" />} />
                        </Badge>

                    }

                    <a href="https://www.pinterest.com/vfm_official" target="_blank" rel="noopener noreferrer">
                        <Button shape="circle" icon={<TiSocialFacebook className="h-6 w-6 text-blue-500" />} />
                    </a>
                    <a href="https://www.instagram.com/vfm_official" target="_blank" rel="noopener noreferrer">
                        <Button shape="circle" icon={<FaInstagram className="h-6 w-6  text-blue-500" />} />
                    </a>
                    <a href="https://www.x.com/VFM_japan" target="_blank" rel="noopener noreferrer">
                        <Button shape="circle" icon={<RiTwitterXFill className="h-6 w-6  text-blue-500" />} />
                    </a>
                    {user ?
                        <>
                            <Dropdown overlay={mainMenu} placement="bottom"
                                arrow={{
                                    pointAtCenter: true,
                                }}>
                                {unreadMessages?.length > 0 ? <Badge count={unreadMessages?.length}>
                                    <Avatar shape="square" icon={<CiMail />} />
                                </Badge> : <Avatar shape="square" icon={<CiMail />} />

                                }
                            </Dropdown>
                            <Dropdown overlay={menu} placement="bottom"
                                arrow={{
                                    pointAtCenter: true,
                                }}>
                                <Badge dot color="blue" size="large">
                                    <Avatar shape="square" icon={<FaRegUser />} />
                                </Badge>
                            </Dropdown>
                        </> :
                        <Button shape="primary" className="mx-4" icon={<LuLogIn className="h-6 w-6 text-white-500" />} onClick={() => { navigate('/auth') }} />
                    }
                </div>
            </nav >
            {
                showHamburger &&
                <div className="lg:hidden transition duration-500" role="dialog" aria-modal="true" >
                    <div className="fixed inset-0 z-10"></div>
                    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src={logo} alt="" />
                            </a>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" onClick={handleClose}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {(user?.user?.user_type === 'Client' ? CLIENT_MENU_DATA : CREATOR_MENU_DATA)?.subMenus?.map((links, index) => {
                                        return <div className={`group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50`} key={index} >
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white ">
                                                {links.icon}
                                            </div>
                                            <div className="flex-auto">

                                                <a className={`block font-semibold text-gray-900`} onClick={() => handleClick(links.pathname, links?.title)}>
                                                    {links.title}
                                                    <span className="absolute inset-0"></span>
                                                </a>
                                                <p className="mt-1 text-gray-600">{links?.description}</p>
                                            </div>
                                        </div>
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </header >
    );
};

export default UserNav;
