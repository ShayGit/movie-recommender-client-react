import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../slices/userSlice";
import SearchBar from "../SearchBar/SearchBar";
import MenuWrapper from "../Menu/Menu";
import "./styles.css";

const Header = ({ userInfo, toggleTheme }) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };
  const dropdownRef = useRef();
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropDownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <div className="small-header">
        {userInfo && <SearchBar />}

        <MenuWrapper>
          {userInfo ? (
            <>
              
                <Link to="/">
                  Recommendations
                </Link>

                <Link to="/myratings">
                  My Ratings
                </Link>
             
              <a onClick={toggleTheme}>Change theme</a>
              
                <Link to="/" onClick={signoutHandler}>
                  Sign out
                </Link>
              
            </>
          ) : (
            <>
              
                <Link to="/signin">
                  Signin
                </Link>
              
              
                <Link to="/signup">
                  Signup
                </Link>
              
              <a onClick={toggleTheme}>Change theme</a>
            </>
          )}
        </MenuWrapper>
      </div>
      <header className="App-header large-header">
        <Link className="App-logo" to="/">
          Movies
        </Link>
        {userInfo ? (
          <>
            <SearchBar />
            <div className="dropdown" ref={dropdownRef}>
              <button className="primary" onClick={toggleDropDown}>
                {userInfo.firstName ? userInfo.firstName : userInfo.username}{" "}
                <i className="fa fa-caret-down" />
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-content">
                  <li onClick={() => setIsDropDownOpen(false)}>
                    <Link to={"/"}>Recommendations</Link>
                  </li>
                  <li onClick={() => setIsDropDownOpen(false)}>
                    <Link to={"/myratings"}>My Ratings</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      Sign out
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <button className="menu-button" onClick={toggleTheme}>
              Theme
            </button>
          </>
        ) : (
          <div className="header-buttons">
            <Link className="inner-item" to="/signin">
              <button>Signin</button>
            </Link>

            <Link className="inner-item" to="/signup">
              <button className="primary">Signup</button>
            </Link>

            <button onClick={toggleTheme}>Theme</button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
