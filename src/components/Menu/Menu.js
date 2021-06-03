
import React from "react";
import './styles.css'
import {stack as Menu} from 'react-burger-menu'
const MenuWrapper= ({children}) => {

  return (
    <div className="menu-container">
    <Menu right slide>
    {children}
  </Menu>
  </div>
  );
};

export default MenuWrapper;
