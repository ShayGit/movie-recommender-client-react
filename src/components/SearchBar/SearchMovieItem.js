import React, { useState } from "react";
import Rating from '../Rating/Rating'
import "./styles.css";
const SearchMovieItem = ({movie,onRating}) => {

  
  return (
            <div className="search-item">
                <img alt={`${movie.title}`} src={`${movie.image}`} className="search-item-image"/>
                <span className="movie-title">{movie.title}</span>
                
                
                <Rating onRatingChange={(ratingValue)=>onRating(movie.id,ratingValue)}/>
            </div>
  )
};

export default SearchMovieItem;
