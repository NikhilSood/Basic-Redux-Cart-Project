import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze(
    {
        LOADING: 'loading',
        IDLE: 'idle',
        ERROR: 'error'
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        setProdects(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
});

export const { setProdects, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunk
export function fetchProductsBR() {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            dispatch(setProdects(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}