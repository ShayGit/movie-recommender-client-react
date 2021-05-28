import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRatingApi, fetchMoviesDataApi, searchMoviesApi, setOrUpdateRatingApi } from "../api/serverCalls";

const initialState = {
    moviesRated: [],
    moviesRecommendation:[],
    moviesSearch:{
        movies:[],
        maxPage: 1,
        status: "idle",
        errors: null,
    },
    status: "idle",
    errors: null,
  };

  export const fetchMoviesData = createAsyncThunk(
    "movies/fetch",
    async (arg,{ rejectWithValue }) => {
      try {
        const movies = await fetchMoviesDataApi();
  
        return movies;
      } catch (error) {
        let message = "";
        if (error.response && error.response.data) {
          for (const [key, value] of Object.entries(error.response.data)) {
            message += `${key}- ${value} \n`;
          }
        } else if (error.message) {
          message = error.message;
        }
  
        return rejectWithValue(message);
      }
    }
  );
  const searchPaginationBatchSize = 8;

  export const searchMovies = createAsyncThunk(
    "movies/search",
    async ({searchPhrase,page},{ rejectWithValue }) => {
      try {
        const response = await searchMoviesApi(searchPhrase,page);
        
        return {movies:response.data,page};
      } catch (error) {
        let message = "";
        if (error.response && error.response.data) {
          for (const [key, value] of Object.entries(error.response.data)) {
            message += `${key}- ${value} \n`;
          }
        } else if (error.message) {
          message = error.message;
        }
  
        return rejectWithValue(message);
      }
    }
  );

  export const setOrUpdateRatingData = createAsyncThunk(
    "movies/rating",
    async (data,{ rejectWithValue }) => {
      try {
        await setOrUpdateRatingApi(data);
        
      } catch (error) {
        let message = "";
        if (error.response && error.response.data) {
          for (const [key, value] of Object.entries(error.response.data)) {
            message += `${key}- ${value} \n`;
          }
        } else if (error.message) {
          message = error.message;
        }
  
        return rejectWithValue(message);
      }
    }
  );

  export const deleteRatingData = createAsyncThunk(
    "movies/deleteRating",
    async (ratingId,{ rejectWithValue }) => {
      try {
        await deleteRatingApi(ratingId);
        
      } catch (error) {
        let message = "";
        if (error.response && error.response.data) {
          for (const [key, value] of Object.entries(error.response.data)) {
            message += `${key}- ${value} \n`;
          }
        } else if (error.message) {
          message = error.message;
        }
  
        return rejectWithValue(message);
      }
    }
  );


  const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
      initMovies: (state) => {
        return {...state, status:'idle',errors:null, moviesSearch:{...state.moviesSearch,status:'idle',errors:null}}
      }
    },
    extraReducers: {
      [fetchMoviesData.pending]: (state, action) => {
        state.status = "loading";
      },
      [fetchMoviesData.fulfilled]: (state, action) => {
        state.status = "succeeded";
        const movies= action.payload;
        state.moviesRated = movies.moviesRated ;
        state.moviesRecommendation = movies.moviesRecommendation ;
      },
      [fetchMoviesData.rejected]: (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
  
      },
      [searchMovies.pending]: (state, action) => {
        state.moviesSearch.status = "loading";
      },
      [searchMovies.fulfilled]: (state, action) => {
        state.moviesSearch.status = "succeeded";
        const data = action.payload
        const page = data.page
        const movies = data.movies.results
        const maxPage = Math.ceil(data.movies.count/searchPaginationBatchSize)
        const ids = state.moviesSearch.movies.map(m=>m.id)
        const appendMovies = movies.filter(movie=>!ids.includes(movie.id)) 
        if(page===1){
            state.moviesSearch.movies = movies
            state.moviesSearch.maxPage = maxPage
        }
        else{
            state.moviesSearch.movies = [...state.moviesSearch.movies, ...appendMovies];
            state.moviesSearch.maxPage = maxPage
        }
      },
      [searchMovies.rejected]: (state, action) => {
        state.moviesSearch.status = "failed";
        state.moviesSearch.errors = action.payload;
  
      },
      [setOrUpdateRatingData.pending]: (state, action) => {
        state.status = "loading";
      },
      [setOrUpdateRatingData.fulfilled]: (state, action) => {
        state.status = "succeeded";
      },
      [setOrUpdateRatingData.rejected]: (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
  
      },
      [deleteRatingData.pending]: (state, action) => {
        state.status = "loading";
      },
      [deleteRatingData.fulfilled]: (state, action) => {
        state.status = "succeeded";
      },
      [deleteRatingData.rejected]: (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
  
      },
    },
  });
  
     export const {initNotes } = moviesSlice.actions
  
  export default moviesSlice.reducer;