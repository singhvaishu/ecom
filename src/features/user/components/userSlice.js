import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrder } from './userApi';

const initialState = {
    userOrders: [],
    status: 'idle',
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrder',
    async (id) => {
        const response = await fetchLoggedInUserOrder(id);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'user/fetchLoggedInUserOrder',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },



    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                //this info can be diffrent or more from loggedIn User Info
                state.userOrders = action.payload;
            });
    },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;


export default userSlice.reducer;