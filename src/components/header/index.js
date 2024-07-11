import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxHooks';
import UserNav from './UserNav';
import AdminNav from './AdminNav';
import { readUser } from '../../services/localStorage.service';
// import { setUser } from '../../store/slices/userSlice';
import TopBar from './Topbar';

const Header = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  if (location.pathname === '/auth/login' || location.pathname === '/auth/sign-up') return null;
  else return (
    <>
      <TopBar />
      {user?.user?.user_type === 'Admin' ? <AdminNav /> : <UserNav />}
    </>
  );
};
export default Header;
