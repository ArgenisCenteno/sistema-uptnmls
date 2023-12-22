import React from 'react'
import Menu from './Menu'
import NavBar from './Navbar'


const Layout = ({children}) => {
  return (
    <div className="main">
    <NavBar />
    <div className="menu-container">
      <div className="menuContainer">
        <Menu />
        
      </div>
      <div className="contentContainer">
      <div className="">
          {children}
        </div>
      </div>
    </div>
     
  </div>
  )
}

export default Layout