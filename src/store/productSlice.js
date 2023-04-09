const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

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
        // setProdects(state, action) {
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsBR.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProductsBR.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProductsBR.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },

});

export const { setProdects, setStatus } = productSlice.actions;
export default productSlice.reducer;


export const fetchProductsBR = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
});

//Thunk
// export function fetchProductsBR() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProdects(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (error) {
//             console.log(error);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     }
// }