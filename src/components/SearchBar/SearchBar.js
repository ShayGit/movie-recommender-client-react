import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../Loading/LoadingIcon";
import "./styles.css";
import SearchMovieItem from "./SearchMovieItem";
import MessageBox from "../MessageBox";
import { fetchMoviesData, searchMovies, setOrUpdateRatingData } from "../../slices/moviesSlice";
import ReactDOM from 'react-dom';
const SearchBar = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch()
  const {maxPage,movies,status, errors} = useSelector((state)=> state.movies.moviesSearch) 

const searchContainer = useRef()
const handleClickOutside= (e)=> {
  if (searchContainer.current && !searchContainer.current.contains(e.target)) {
    setSearchPhrase("")
    setPage(1)
  }
}
useEffect(()=>{
  document.addEventListener('click', handleClickOutside, true);
  return () => {
      document.removeEventListener('click', handleClickOutside, true);
  };
},[])

const handleSearch = (e)=>{
  setSearchPhrase(e.target.value);
  setPage(1)
  dispatch(searchMovies({searchPhrase:e.target.value,page:1}))
}

const setRating = async (movieId, rating)=>{
  await dispatch(setOrUpdateRatingData({ratingId:undefined,movieId,rating,isRated:false}));
  await dispatch(fetchMoviesData());
  dispatch(searchMovies({searchPhrase:searchPhrase,page:1}))
  setPage(1)
}


const handleScroll = (e) => {
  const bottom = Math.floor(e.target.scrollHeight) - Math.floor(e.target.scrollTop) === Math.floor(e.target.clientHeight) ;
  if (bottom &&page!==maxPage) { 
        dispatch( searchMovies({searchPhrase:searchPhrase,page:page+1}))
        setPage(page+1); 
  }
  
}

  return (
    <div className="app-searchbar-container" ref={searchContainer}>
      <input
        className="app-searchbar"
        placeholder="Search a movie..."
        value={searchPhrase}
        onChange={handleSearch}
      />
      {searchPhrase && (
        <div className="search-results-container" onScroll={handleScroll} >
         
          
           {movies && movies.map((movie) => (
            <SearchMovieItem key={movie.id} movie={movie} onRating={setRating}/>
          ))} 
          {status === "failed"? <MessageBox variant="danger">{errors}</MessageBox> :
          status === "loading" ?<LoadingIcon size="fa-3x"/>:
          movies.length===0 &&
              <MessageBox variant="info">{"Movie not found or already rated."}</MessageBox>}
          
          
        </div>
        
      )}
      
    </div>
  );
};

export default SearchBar;
