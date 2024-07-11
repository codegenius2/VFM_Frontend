import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ADMIN_MENU_DATA } from '../../constant/menu_data';

const AdminNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getIsActive = (path) => {
        return location.pathname === path
            ? 'underline-active active font-extrabold text-xl px-3 py-2 rounded text-shadow-md'
            : 'underline-active font-bold text-xl px-3 py-2 rounded text-shadow-lg';
    };

    return (
        <nav className="bg-navbar colo lg:px-4 shadow-lg">
            <div className=" mx-auto flex justify-between items-center lg:flex-row flex-col p-4 lg:p-0">
                <div className="space-x-4 items-center flex flex-col lg:flex-row">
                    {ADMIN_MENU_DATA?.subMenus?.map(links => {
                        return <button
                            className={getIsActive(links.pathname)}
                            onClick={() => { navigate(links.pathname) }}
                        >
                            {links.title}
                        </button>
                    })
                    }
                </div>

            </div>
        </nav >
    );
};

export default AdminNav;


// import React from 'react';

// const AdminNav = ({ active, handleNavigation, isActive }) => (
//     <div className={!isActive ? 'admin_nav' : 'admin_nav_1'}>
//         <h1 onClick={() => handleNavigation(0)} className={active === '0' ? 'header-active-admin font-bold' : 'font-bold'}>クリエイター管理</h1>
//         <h1 onClick={() => handleNavigation(1)} className={active === '1' ? 'header-active-admin font-bold' : 'font-bold'}>リクエスター管理</h1>
//         <h1 onClick={() => handleNavigation(2)} className={active === '2' ? 'header-active-admin font-bold' : 'font-bold'}>マッチング状況管理</h1>
//     </div>
// );

// export default AdminNav;
