import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../slices/userSlice";
import SearchBar from "./SearchBar/SearchBar";

const Header = ({userInfo, toggleTheme}) => {
    const [isDropdownOpen, setIsDropDownOpen] = useState(false);
    

    const dispatch = useDispatch();
    const signoutHandler = ()=>{
      dispatch(signout())
    }
  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  }
  const dropdownRef = useRef()
  const handleClickOutside= (e)=> {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropDownOpen(false)
    }
  }
  useEffect(()=>{
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
  },[])
  
  return (
    <header className="App-header">
    <Link className="App-logo" to="/">
      Movies
    </Link>
    {userInfo && (
      <>
      <SearchBar/>
      <div className="dropdown" ref={dropdownRef}>
          <button className="primary" onClick={toggleDropDown}>
            {userInfo.firstName?userInfo.firstName : userInfo.username} <i className="fa fa-caret-down" />
          </button>
          {isDropdownOpen&&
          <ul className="dropdown-content" >
          <li onClick={()=>setIsDropDownOpen(false)}>
            <Link to={"/myratings"}>My Ratings</Link>
          </li>
          <li>
            <Link to="/" onClick={signoutHandler}>
              Sign out
            </Link>
          </li>
        </ul>
        }
          
        </div>
        </>
    )}
    <button onClick={toggleTheme}>
    Theme
  </button>
    
  </header>
  );
};

export default Header;
