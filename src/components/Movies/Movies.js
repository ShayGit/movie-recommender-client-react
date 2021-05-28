import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux';
import { fetchMoviesData, setOrUpdateRatingData, deleteRatingData } from '../../slices/moviesSlice';
import MessageBox from '../MessageBox';
import MovieCard from './MovieCard';
import './styles.css'

const Movies = ({moviesData, isRated})=> {
    const dispatch = useDispatch();

    const setOrUpdateRating = async (ratingId,movieId, rating)=>{
             await dispatch(setOrUpdateRatingData({ratingId,movieId,rating,isRated}));
             await dispatch(fetchMoviesData());
        
    }
    const deleteRating = async (ratingId)=>{
        await dispatch(deleteRatingData(ratingId));
        await dispatch(fetchMoviesData());
    }

    return (
        <div className="movies">
            {moviesData&& moviesData.map(item=>{
                return(
                <MovieCard key={item.movie.id} rating={item} onRatingChange={setOrUpdateRating} deleteRating={deleteRating}/>
                )
            })
        }
        { moviesData.length===0 && <MessageBox variant="danger">{isRated?"There are no ratings yet, please rate a movie.":"There are no recommendations yet, rate some movies first."}</MessageBox>}
        </div>
    )
}

export default Movies;