import React, { useState } from "react";
import './styles.css'
import Rating from '../Rating/Rating'
import DeleteButton from "../DeleteButton/DeleteButton";
const MovieCard = ({rating, onRatingChange,deleteRating}) => {
    
  return (
      <div className="movie-card">
          {rating.id&&
          <DeleteButton deleteRating={()=>deleteRating(rating.id)}/>}
          <img alt={`${rating.movie.title}`} className="movie-image" src={rating.movie.image}/>
          <label>
              {rating.movie.title}
          </label>
          <div>
              <Rating rating={rating.rating} onRatingChange={(ratingValue)=>onRatingChange(rating.id?rating.id:"",rating.movie.id,ratingValue)}/>
          </div>
      </div>
  );
};

export default MovieCard;
