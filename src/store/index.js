import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

export const store = configureStore({
  reducer: rootReducer,
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;
export const AppThunk = (returnType = void 0) => (dispatch, getState) => {
  return returnType;
};