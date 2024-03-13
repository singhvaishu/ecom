import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderApi';

const initialState = {
    orders: [],
    status: 'idle',
    currentOrder: null,
};
export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async (order) => {
        const response = await createOrder(order);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        resetOrder: (state) => {
            state.currentOrder = null;
        }
    },



    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders.push(action.payload);
                state.currentOrder = action.payload;
            });
    },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;


export default orderSlice.reducer;