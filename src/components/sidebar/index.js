import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VscDiffAdded } from "react-icons/vsc";
import { FcAddImage } from "react-icons/fc";
import { GrAdd } from "react-icons/gr";
import { DESIGNER_MENU } from '../../constant/side_menu';
import { REQUEST_MENU } from '../../constant/side_menu';
import { Button } from 'antd'


const Sidebar = ({ setCurrent }) => {

    const navigate = useNavigate();

    const [active, setActive] = useState('')
    const location = useLocation();
    useEffect(() => {
        setCurrent && setCurrent(active)
    }, [active])



    return (
        <aside id="logo-sidebar" className="relative top-0 left-0 z-40 md:w-64 h-screen transition-transform -translate-x-full md:translate-x-0 w-16" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                {location.pathname === '/designer/profile' ? <Button type="default" size="large" className="w-full my-4 py-2 text-blue-300 border-blue-500" icon={<GrAdd className="w-5 h-5 text-blue-400" />}><p className="md:block hidden text-sm">このクリエイターに依頼をする</p></Button>
                    : location.pathname === '/designer/dashboard' ?
                        <Button onClick={() => { navigate('/designer/add-show-room') }} type="default" size="large" className="w-full my-4 py-2 text-blue-300 border-blue-500" icon={<GrAdd className="w-5 h-5 text-blue-400" />}><p className="md:block hidden">Add Show Room</p></Button>
                        : <Button onClick={() => { navigate('/requester/add-request') }} type="default" size="large" className="w-full my-4 py-2 text-blue-300 border-blue-500" icon={<GrAdd className="w-5 h-5 text-blue-400" />}><p className="md:block hidden">Add Request</p></Button>

                }
                {location.pathname === '/designer/profile' ? "" :
                    <ul className="space-y-2 font-medium">

                        {location.pathname === '/designer/dashboard' ? DESIGNER_MENU?.subMenus?.map((item) => {
                            return (
                                <li>
                                    < a onClick={() => { setActive(item?.title) }} className={`flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-300  hover:scale-105 hover:text-white group transition duration-500 ${active === item?.title ? "bg-blue-400 text-white" : ""}`} >
                                        {item?.icon}
                                        <span className="hidden md:block ml-2">{item?.title}</span>
                                    </a>
                                </li>
                            )

                        }) : REQUEST_MENU?.subMenus?.map((item) => {
                            return (
                                <li>
                                    < a onClick={() => { setActive(item?.title) }} className={`flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-300  hover:scale-105 hover:text-white group transition duration-500 ${active === item?.title ? "bg-blue-400 text-white" : ""}`} >
                                        {item?.icon}
                                        <span className="hidden md:block ml-2">{item?.title}</span>
                                    </a>
                                </li>
                            )

                        })
                        }

                    </ul>}
            </div >
        </aside >
    )
}

export default Sidebar
