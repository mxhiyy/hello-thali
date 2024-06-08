import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";


export const addRating = createAsyncThunk('feedback/addRating', async (ratingData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token || Cookies.get('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    };
    const res = await axios.post('http://localhost:3000/api/rating', ratingData, config);
    return res.data;
});


export const addReview  = createAsyncThunk('feedback/addReview', async(reviewData, thunkAPI ) => {
    const state = thunkAPI.getState();
    const token = state.auth.token || Cookies.get('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
    };
    const res = await axios.post('http://localhost:3000/api/review', reviewData, config);
    return res.data;
});

export const fetchRatings = createAsyncThunk('feedback/fetchRatings', async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await axios.get('http://localhost:3000/api/allratings', config);
    return res.data;
});

export const fetchReviews = createAsyncThunk('feedback/fetchReviews', async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await axios.get('http://localhost:3000/api/allreviews', config);
    return res.data;
})

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        ratings: [],
        reviews: [],
        loading: false,
    },

    extraReducers: (builder) => {
        builder
        .addCase(addRating.pending,  (state) => {
            state.loading = true;
        })

        .addCase(addRating.fulfilled, (state, action) => {
            state.loading = false;
            state.ratings.push(action.payload);
            toast.success('Thank you for the feedback, we will update soon! ❤️');
        })

        .addCase(addRating.rejected, (state) => {
            state.loading = false;
            toast.error('Uhh Oh! Something bad happened');
        })

        .addCase(addReview.pending , (state) => {
            state.loading = true;
        })

        .addCase(addReview.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews.push(action.payload);
            toast.success('Thank you for the feedback ❤️');
        })

        .addCase(addReview.rejected, (state) => {
            state.loading = false;
            toast.error('Uhh Oh! Something bad happened');
        })
        

        .addCase(fetchRatings.pending, (state) => {
            state.loading = true;
        })

        .addCase(fetchRatings.fulfilled, (state, action) => {
            state.loading = false;
            state.ratings = action.payload;
        })

        .addCase(fetchRatings.rejected, (state) => {
            state.loading = false;
            toast.error('Failed to fetch ratings');
        })

        .addCase(fetchReviews.pending, (state) => {
            state.loading = true;
        })

        .addCase(fetchReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload
        })

        .addCase(fetchReviews.rejected, (state) => {
            state.loading = false;
            toast.error('Failed to fetch Reviews')
        })
    }
});


export default feedbackSlice.reducer;

