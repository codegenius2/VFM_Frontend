/**
 * @author Kinji Shimizu 
 * @created 05/10/2024
 * @lastModified 06/02/2024
 * @description App
 * @copyright  Studio ARATA
 */

import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import initializeApp from "./app/init";
import CssBaseline from '@mui/material/CssBaseline';
import i18n from './i18n';
import "@fontsource/noto-sans-jp"; // Defaults to weight 400
import "@fontsource/noto-sans-jp/400.css"; // Specify weight
import AppRouter from './router/AppRouter';
import Header from './components/header';
import Footer from './components/footer';
import { I18nextProvider } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import "./global.css";
import axios from 'axios';
import Container from './components/Container';
import { useDispatch } from 'react-redux';
import checkAuth from "./app/auth";
import { getUser } from './store/slices/userSlice'
import { setProducts, setCategories, setTags, setRequirements, setCreators, setUnreadMessages, setClients, setCartLength } from './store/slices/commonSlice';
// import './App.scss'

const App = () => {

    initializeApp();
    const dispatch = useDispatch();

    const toggleLanguage = () => {
        const currentLanguage = i18n.language;
        const newLanguage = currentLanguage === 'en' ? 'jp' : 'ch';
        i18n.changeLanguage(newLanguage);
    };

    const loadData = async () => {
        const products = await axios.get("/products");
        const categories = await axios.get("/categories");
        const tags = await axios.get("/tags");
        const creators = await axios.get("/creators");

        const clients = await axios.get("/clients");
        const requirements = await axios.get("/requirement");
        dispatch(setRequirements(requirements.data));
        dispatch(setCreators(creators.data));
        dispatch(setProducts(products.data));
        dispatch(setTags(tags.data));

        dispatch(setClients(clients.data));
        dispatch(setCategories(categories.data));
    };

    const loadCart = async () => {
        const carts = await axios.get("/cart");
        dispatch(setCartLength(carts?.data?.cart?.items?.length));
    }

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            loadCart();
            fetchUnreadMessages();
            const interval = setInterval(() => {
                fetchUnreadMessages();
            }, 10000);
            return () => clearInterval(interval);
        }
    }, []);

    const fetchUnreadMessages = () => {
        axios.get(`/unread-messages`)
            .then(response => {
                dispatch(setUnreadMessages(response?.data?.unreadMessages));
            })
            .catch(error => console.log(error?.response?.data?.message));
    };

    useEffect(() => {
        loadData();
        if (token) {
            axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
            try {
                dispatch(getUser(token));
            } catch (e) {
                window.location.href = "/login";
            }
        }
    }, [token]);

    return (
        <HelmetProvider>
            <CssBaseline />
            <I18nextProvider i18n={i18n}>
                <Router>
                    <Header />
                    <Container>
                        <AppRouter />
                    </Container>
                    <Footer />
                </Router >
            </I18nextProvider>
            <ToastContainer />
        </HelmetProvider >
    );
};
export default App;
