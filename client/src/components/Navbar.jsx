import React from 'react'
import { useAuth } from '../context/auth';
import logo from "../img/logoo.png"
import { NavLink } from 'react-router-dom';
import "../style/NavBar.scss"
const Navbar = () => {

  const [auth, setAuth] = useAuth();

     // CERRAR SESION
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Sesion cerrada");
  };

  return (
    <div className="navbar">
    <div className="logo">
      <img src={logo} width="50px" height="50px"  alt="uptnmls" />
      
      <span>UPTNMLS</span>
    </div>

    <div className="icons">
     
      <div className="user">
        
        <span>{auth?.user?.nombre + " " + auth?.user?.apellido}</span>
      </div>
      <NavLink to={"/"} onClick={handleLogout}>
      <span class="material-symbols-outlined">
      move_item
      </span>
      </NavLink>
      
    </div>
  </div>
  )
}

export default Navbar