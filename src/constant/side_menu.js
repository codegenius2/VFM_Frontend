import { RiProgress5Line } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

export const DESIGNER_MENU = {
    title: 'Resources',
    pathname: '/designer',
    subMenus: [
        {
            title: 'SHOW ROOM',
            pathname: 'designer/designer',
            icon: <FaUserTie className="w-8 h-8 text-green-500" />
        },
        {
            title: 'PROGRESS',
            pathname: 'admin/matching-status',
            icon: <RiProgress5Line className="w-8 h-8 text-yellow-500" />
        },
        {
            title: 'CHAT',
            pathname: 'admin/requester',
            icon: <IoChatbubblesOutline className="w-8 h-8 text-blue-700" />
        },
        {
            title: 'MY ACCOUNT',
            pathname: 'admin/matching-status',
            icon: <ImProfile className="w-8 h-8 text-pink-500" />
        }
    ],
};


export const REQUEST_MENU = {
    title: 'Resources',
    pathname: '/Resources',
    subMenus: [
        {
            title: 'REQUEST',
            pathname: 'designer/designer',
            icon: <FaUserTie className="w-8 h-8 text-green-500" />
        },
        {
            title: 'PROGRESS',
            pathname: 'admin/matching-status',
            icon: <RiProgress5Line className="w-8 h-8 text-yellow-500" />
        },
        {
            title: 'CHAT',
            pathname: 'admin/requester',
            icon: <IoChatbubblesOutline className="w-8 h-8 text-blue-700" />
        },
    ],
};

