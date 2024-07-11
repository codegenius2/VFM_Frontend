import { combineReducers } from 'redux';
import userReducer from './userSlice';
import commonReducer from './commonSlice'

const rootReducer = combineReducers({
    user: userReducer,
    common: commonReducer
});

export default rootReducer;
