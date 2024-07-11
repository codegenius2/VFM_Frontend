import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Radio, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin, resetError } from '../../store/slices/userSlice';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './auth.css';
import axios from 'axios';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full - width - tabpanel - ${index}`}
            aria-labelledby={`full-width-tab-${index}`
            }
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <span>{children}</span>
                </Box>
            )}
        </div >
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const Auth = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const authState = useSelector(state => state?.auth);
    const { token, user, error } = useSelector(state => state.user);

    const [value, setValue] = useState(0);
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('Client');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [privatePolicy, setPrivatePolicy] = useState(false);
    const [loginPrivatePolicy, setLoginPrivatePolicy] = useState(false);

    const handlePrivatePolicy = () => setPrivatePolicy(!privatePolicy);
    const handleLoginPrivatePolicy = () => setLoginPrivatePolicy(!loginPrivatePolicy);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    useEffect(() => {
        if (token) {
            navigate('/', { replace: true });
        }
    }, [token]);

    useEffect(() => {
        error && toast.error(error)
        setTimeout(() => {
            dispatch(resetError());
        }, 3000);
    }, [error])


    // Login Form Submission Handler
    const handleLogin = async () => {
        try {
            if (validateEmail(loginEmail) && loginPassword.length) {
                const data = { email: loginEmail, password: loginPassword };
                setLoginLoading(true);
                const res = await dispatch(doLogin(data));
                res?.payload?.token && toast.success("ログインに成功しました。");
                setLoginLoading(false);
            }
        }
        catch (err) {
            toast.error(err.data.message)
        }
    };

    const handleRegister = async () => {
        try {
            if (validateEmail(email) && username.length && password.length) {
                const data = { username, email, password };
                setLoadingRegister(true)
                if (userType === 'Client') {
                    await axios.post('/register-client', data).then(response => {
                        toast.success(response.data?.message);
                        setValue(0)
                    }).catch(error => {
                        if (error.response) {
                            toast.error(error.response.data?.email[0]);
                        }
                    })
                } else {
                    await axios.post('/register-creator', data).then(response => {
                        toast.success(response.data?.message);
                        setValue(0)
                    }).catch(error => {
                        if (error.response) {
                            error.response.data?.email && toast.error(error.response.data?.email[0]);
                            error.response.data?.password && toast.error(error.response.data?.password[0]);
                            error.response.data?.username && toast.error(error.response.data?.username[0]);
                        }
                    })
                };
                setLoadingRegister(false)
            }
        } catch (error) {
            error.response.data && toast.error(error.response.data);
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="bg-white flex justify-center my-12">
            <Box
                sx={{
                    boxShadow: '0px 5px 6px 2px #ddd',
                    border: '1px solid #d0d0d0',
                    width: '100%',
                    maxWidth: '768px',
                    margin: '0 auto',
                    padding: '20px',
                }}
            >

                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="ログイン" />
                        <Tab label="新規登録" />
                    </Tabs>
                </AppBar>

                <TabPanel value={value} index={0}>
                    <div className="max-w-[500px] mx-auto w-full py-10">
                        <div className="heading text-center">
                            <h3 className="font-bold text-[20px] mb-4">ログイン</h3>
                            <div className="text-center mb-5">
                                アカウントをお持ちでない方はこちら{' '}
                                <span className="text-rose-500 font-bold cursor-pointer" onClick={() => { setValue(1) }}>
                                    新規登録
                                </span>
                            </div>
                        </div>

                        <div className="input-group mb-4 mr-sm-2 block sm:flex items-center">
                            <label className="w-full sm:w-[160px] mb-3">メールアドレス</label>
                            <div className="w-full">
                                <input
                                    type="text"
                                    className=" bg-white border w-full border-gray-200 rounded-lg text-gray-700 text-sm h-12 leading-tight px-3"
                                    name="loginEmail"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    placeholder="メールアドレス"
                                />
                                {!loginEmail ? (
                                    <span className="text-xs text-red-600">メールアドレスを入力してください</span>
                                ) : !validateEmail(loginEmail) ? <span className="text-xs text-red-600">メールアドレスが正しくありません。</span> : ""}
                            </div>
                        </div>

                        <div className="input-group mb-2 mr-sm-2 block sm:flex items-center">
                            <label className="w-full sm:w-[160px]">パスワード</label>
                            <div className="w-full">
                                <input
                                    type="password"
                                    className="w-full bg-white border border-gray-200 rounded-lg text-gray-700 text-sm h-12 leading-tight px-3"
                                    name="loginPassword"
                                    value={loginPassword}
                                    onChange={(e) => { setLoginPassword(e.target.value) }}
                                    placeholder="パスワード"
                                />
                                {!loginPassword && (
                                    <span className="text-xs text-red-600">パスワードを入力してください</span>
                                )}
                            </div>
                        </div>
                        {/* {authState?.isError && <p>Error: {authState?.message}</p>}
                        {authState?.isSuccess && <p>Success!</p>} */}
                        <div className="flex items-center mb-4 mt-8">
                            <input
                                id="remeberMe"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="remeberMe"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                次回から自動的にログイン
                            </label>
                        </div>
                        <div className="flex items-center mb-4 mt-8">
                            <input
                                id="agreeTerms"
                                type="checkbox"
                                value={loginPrivatePolicy}
                                onClick={handleLoginPrivatePolicy}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="agreeTerms"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                利用規約とプライバシーポリシーに同意します。
                            </label>
                        </div>

                        <div
                            onClick={() => {
                                navigate('/forgot');
                            }}
                            className="cursor-pointer text-blue-500 mb-4 text-right w-full flex items-center justify-end"
                        >
                            パスワードを忘れた方はこちら
                        </div>
                        <Button
                            disabled={!loginPrivatePolicy}
                            loading={loginLoading}
                            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 py-6 text-center me-2 mb-2"
                            onClick={handleLogin}
                        >
                            ログイン
                        </Button>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="max-w-[500px] mx-auto w-full py-10">
                        <div className="heading text-center">
                            <h3 className="font-bold text-[20px] mb-4">新規登録</h3>
                            <div className="text-center mb-5">
                                アカウントをお持ちの方はこちら{' '}
                                <span className="text-rose-500 font-bold cursor-pointer" onClick={() => { setValue(0) }} >
                                    ログイン
                                </span>
                            </div>
                        </div>
                        <Radio.Group
                            className="w-full justify-center mt-2 mb-2"
                            onChange={(e) => { setUserType(e.target.value) }}
                            value={userType}
                        >
                            <Radio.Button value="Client" type="primary" className="bg-blue-500 text-white w-1/2">
                                CLIENT
                            </Radio.Button>
                            <Radio.Button value="Creator" type="primary" className="bg-blue-500 text-white w-1/2">
                                CREATOR
                            </Radio.Button>
                        </Radio.Group>
                        <div className="input-group mb-4 mr-sm-2 block sm:flex items-center">
                            <label className="w-full sm:w-[160px]">ユーザー名</label>
                            <div className="w-full">
                                <Input
                                    type="text"
                                    className="w-full bg-white border border-gray-200 rounded-lg text-gray-700 text-sm h-12 leading-tight px-3"
                                    name="username"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    placeholder="ユーザー名"
                                />
                                {!username && (
                                    <span className="text-xs text-red-600">ユーザー名を入力してください</span>
                                )}
                            </div>
                        </div>

                        <div className="input-group mb-4 mr-sm-2 block sm:flex items-center">
                            <label className="w-full sm:w-[160px]">メールアドレス</label>
                            <div className="w-full">
                                <input
                                    type="text"
                                    className="w-full bg-white border border-gray-200 rounded-lg text-gray-700 text-sm h-12 leading-tight px-3"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="メールアドレス"
                                />
                                {!email ? (
                                    <span className="text-xs text-red-600">メールアドレスを入力してください</span>
                                ) : !validateEmail(email) ? <span className="text-xs text-red-600">メールアドレスが正しくありません。</span> : ""}
                            </div>
                        </div>
                        <div className="input-group mb-2 mr-sm-2 block sm:flex items-center">
                            <label className="w-full sm:w-[160px]">パスワード</label>
                            <div className="w-full">
                                <input
                                    type="password"
                                    className="w-full bg-white border border-gray-200 rounded-lg text-gray-700 text-sm h-12 leading-tight px-3"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="パスワード"
                                />
                                {!password && (
                                    <span className="text-xs text-red-600">パスワードを入力してください</span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center mb-4 mt-8">
                            <input
                                id="agreeTerms"
                                type="checkbox"
                                value={privatePolicy}
                                onClick={handlePrivatePolicy}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="agreeTerms"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                利用規約とプライバシーポリシーに同意します。
                            </label>
                        </div>
                        <Button
                            disabled={!privatePolicy}
                            loading={loadingRegister}
                            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 py-6 text-center me-2 mb-2"
                            onClick={handleRegister}
                        >
                            新規登録
                        </Button>
                    </div>
                </TabPanel>
            </Box>
        </div >
    );
};

export default Auth;