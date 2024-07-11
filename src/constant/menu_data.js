
import { LuSearchCheck } from "react-icons/lu";
import { FaBasketShopping } from "react-icons/fa6";
import { GiTravelDress } from "react-icons/gi";
import { MdDesignServices } from "react-icons/md";
import { TbBasketSearch } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa";

export const ADMIN_MENU_DATA = {
    title: 'Resources',
    pathname: '/Resources',
    subMenus: [
        {
            title: 'クリエイター管理',
            pathname: 'admin/designer',
        },
        {
            title: 'リクエスター管理',
            pathname: 'admin/requester',
        },
        {
            title: 'マッチング状況管理',
            pathname: 'admin/matching-status',
        },
        {
            title: '銀行情報管理ページ',
            pathname: 'admin/bank-info'
        },
        {
            title: '支払い管理ページ',
            pathname: 'admin/payment'
        }
    ],
};


export const CREATOR_MENU_DATA = {
    title: 'Resources',
    pathname: '/Resources',
    subMenus: [
        {
            title: 'ALL ITEM',
            pathname: '/all-items',
            icon: <FaBasketShopping className="w-8 h-8 text-blue-500" />
        },
        {
            title: 'HASHTAGS SEARCH',
            pathname: '/hashtag-search',
            icon: <TbBasketSearch className="w-8 h-8 text-yellow-500" />
        },
        {
            title: 'CLIENT',
            pathname: '/request-search',
            icon: <FaUserTie className="w-8 h-8 text-green-500" />
        },
        {
            title: 'HOW TO WEAR',
            pathname: '/how-to-wear',
            icon: <GiTravelDress className="w-8 h-8 text-pink-500" />
        }
    ],
};

export const CLIENT_MENU_DATA = {
    title: 'Resources',
    pathname: '/Resources',
    subMenus: [
        {
            title: 'ALL ITEM',
            pathname: '/all-items',
            icon: <FaBasketShopping className="w-8 h-8 text-blue-500" />
        },
        {
            title: 'HASHTAGS SEARCH',
            pathname: '/hashtag-search',
            icon: <TbBasketSearch className="w-8 h-8 text-yellow-500" />
        },
        {
            title: 'CREATER',
            pathname: '/creator-search',
            icon: <MdDesignServices className="w-8 h-8 text-cyan-500" />
        },
        {
            title: 'HOW TO WEAR',
            pathname: '/how-to-wear',
            icon: <GiTravelDress className="w-8 h-8 text-pink-500" />
        }
    ],
};


export const MENU_DATA = {
    title: 'Resources',
    pathname: '/Resources',
    subMenus: [
        {
            title: 'ALL ITEM',
            pathname: '/all-items',
            icon: <FaBasketShopping className="w-8 h-8 text-blue-500" />
        },
        {
            title: 'HASHTAGS SEARCH',
            pathname: '/hashtag-search',
            icon: <TbBasketSearch className="w-8 h-8 text-yellow-500" />
        },
        {
            title: 'HOW TO WEAR',
            pathname: '/how-to-wear',
            icon: <GiTravelDress className="w-8 h-8 text-pink-500" />
        }
    ],
};


