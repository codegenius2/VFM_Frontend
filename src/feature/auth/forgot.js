import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Radio } from 'antd'
import './auth.css'
import { RequestPageRounded } from '@mui/icons-material';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Auth = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const onSubmit = (data) => {
        toast.success("Logged in");
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSetEmail = (e) => setEmail(e.target.value);
    const handleSetPassword = (e) => setPassword(e.target.value);

    // useEffect(() => {
    //     // alert(email);
    //     // alert(password);
    // }, [email, password])

    const handleLogin = () => {
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    return (
        <div className='bg-white flex justify-center my-12'>
            <Box
                sx={{
                    boxShadow: '0px 5px 6px 2px #ddd',
                    border: '1px solid #d0d0d0',
                    width: '100%',
                    maxWidth: '768px',
                    margin: '0 auto',
                    padding: '20px'
                }}
            >
                <div className='max-w-[500px] mx-auto w-full py-10'>
                    <div className="heading text-center">
                        <h3 className="font-bold text-[20px] mb-4"></h3>
                        <p className="text-center mb-5">
                            パスワードを忘れた方はこちら?{" "}
                        </p>
                    </div>

                    <div className="input-group mb-4 mr-sm-2 block sm:flex items-center">
                        <label className='w-full sm:w-[160px]'>メールアドレス</label>
                        <input
                            type="text"
                            className="w-full bg-white border border-gray-200 rounded-lg text-gray-700 text-sm h-12 leading-tight px-3"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            {...register("email", { required: true })}
                            placeholder="メールアドレス"
                        />
                        {errors.email && (
                            <span className="text-xs text-red-600">Email is required</span>
                        )}
                    </div>

                    <button class="w-full mt-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 " onClick={handleLogin}>転 送</button>
                    {errors.root && (
                        <span className="text-xs text-red-600">{errors.root.message}</span>
                    )}
                </div>


            </Box>
        </div >

    );
}


export default Auth;