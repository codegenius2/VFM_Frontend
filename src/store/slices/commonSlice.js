import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        products: [],
        categories: [],
        creators: [],
        tags: [],
        cartLength: 0,
        unreadMessages: [],
        requirements: [],
        clients: []
    },
    reducers: {
        setClients: (state, action) => {
            state.clients = action.payload;
        },
        setCartLength: (state, action) => {
            state.cartLength = action.payload;
        },
        setUnreadMessages: (state, action) => {
            state.unreadMessages = action.payload;
        },
        setCreators: (state, action) => {
            state.creators = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload.map(item => { return { value: item.id, label: item?.name } });
        },
        setTags: (state, action) => {
            state.tags = action.payload.map(item => { return { value: item.id, label: item?.name } });
        },
        setRequirements: (state, action) => {
            state.requirements = action.payload;
        },
    }
})

export const { setProducts, setCategories, setTags, setRequirements, setCreators, setUnreadMessages, setClients, setCartLength } = commonSlice.actions

export default commonSlice.reducer