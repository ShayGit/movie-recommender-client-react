import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import LoadingIcon from "../components/Loading/LoadingIcon";
import MessageBox from "../components/MessageBox";
import Movies from "../components/Movies/Movies";
import { fetchMoviesData } from "../slices/moviesSlice";

const ContentScreen = () => {
  const { moviesRecommendation, moviesRated, status, errors } = useSelector(
    (state) => state.movies
  );
  const {  userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMoviesData());
  }, [userInfo]);
  
  return (
    <Switch>
      <Route name="home" exact path="/">
        {status ==="loading" ? (
           <LoadingIcon size="fa-5x"/>
        ) : (
          <div>
            <h1>Recommended For You:</h1>
            <Movies moviesData={moviesRecommendation} isRated={false} />
          </div>
        )}
        {status ==="failed" && <MessageBox variant="danger">{errors}</MessageBox>}
      </Route>
      <Route name="myratings" exact path="/myratings">
        {status ==="loading" ? (
          <LoadingIcon size="fa-5x"/>
        ) : (
          <div>
            <h1>My Rated Movies:</h1>
            <Movies moviesData={moviesRated} isRated={true} />
          </div>
        )}
        {status ==="failed" && <MessageBox variant="danger">{errors}</MessageBox>}
      </Route>
    </Switch>
  );
};

export default ContentScreen;
