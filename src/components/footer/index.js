import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FooterContent from './FooterContent';

const Footer = () => {
    const location = useLocation();
    const paths = ['/auth'];
    return paths.includes(location.pathname) ? null : <FooterContent />;
};

export default Footer;