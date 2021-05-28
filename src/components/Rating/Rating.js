
import React, { useState } from "react";
import './styles.css'

const Rating = ({rating, onRatingChange}) => {
  const [ratingSelect, setRating] = React.useState(rating);
  const [hoverRating, setHoverRating] = React.useState(0);
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    setRating(index);
    onRatingChange(index)
  };
  const fill = (index)=>
  {
    if (hoverRating >= index) {
      return 'orange';
    } else if (!hoverRating && ratingSelect >= index) {
      return 'orange';
    }
    return '';
  }

  return (
      <div className="rating">
        {[1,2,3,4,5].map((index)=>{
          return(
            <i className="fa fa-star"
            key={index} 
            style={{"color":`${fill(index)}`}}
            onMouseEnter={() => onMouseEnter(index)} 
            onMouseLeave={()=>onMouseLeave()} 
            onClick={()=>onSaveRating(index)}></i>
          )
          
        })}
          
    </div>
  );
};

export default Rating;
