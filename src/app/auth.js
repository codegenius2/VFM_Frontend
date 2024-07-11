import axios from "axios";
import { store } from "../store";
import { logOut } from "../store/slices/userSlice";
import { NotificationManager } from "react-notifications";

const checkAuth = () => {
    /*  Getting token value stored in localstorage, if token is not present we will open login page 
        for all internal dashboard routes  */
    const TOKEN = localStorage.getItem("token");
    const PUBLIC_ROUTES = [
        "login",
        "forgot-password",
        "register",
    ];

    const isPublicPage = PUBLIC_ROUTES.some((r) =>
        window.location.href.includes(r)
    );

    axios.interceptors.request.use(
        function (config) {
            // UPDATE: Add this code to show global loading indicator
            // document.body.classList.add("loading-indicator");
            return config;
        },
        function (error) {
            NotificationManager.error(error, 'Error')
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            // document.body.classList.remove("loading-indicator");
            if (error.response?.status === 401) {
                store.dispatch(logOut());
            }
            return Promise.reject(error);
        }
    );

    if (!TOKEN && !isPublicPage) {
        return;
    } else {
        axios.defaults.headers.common["Authorization"] = `${TOKEN}`;
        return TOKEN;
    }
};

export default checkAuth;