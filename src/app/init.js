import axios from "axios"

const initializeApp = () => {

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

    } else {
        console.log = () => { };
    }

}

export default initializeApp