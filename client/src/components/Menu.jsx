import React from 'react'
import "../style/Menu.scss"
import inicio from "../img/home.svg"
import {Link} from "react-router-dom"
const Menu = () => {
  return (
    <div className="menu">
       
    <div className="item"  >
      <span className="title">General</span>
       
        <Link to={"/sistema/inicio"} className="listItem"  > 
        <span class="material-symbols-outlined">
        home
        </span>
           <span className="listItemTitle">Inicio</span>
        </Link>

        <Link to={"/sistema/usuarios"} className="listItem"  >
        <span class="material-symbols-outlined">
        group
        </span>
          <span className="listItemTitle">Usuarios</span>
        </Link>
    
    </div>
    <div className="item"  >
      <span className="title">Sistema</span>
       
        <Link to={"/sistema/categorias"} className="listItem"  >
        <span class="material-symbols-outlined">
        category
        </span>
          <span className="listItemTitle">Categorias</span>
        </Link>
        <Link to={"/sistema/bienes"} className="listItem"  >
        <span class="material-symbols-outlined">
        inventory_2
        </span>
          <span className="listItemTitle">Bienes</span>
        </Link>
        <Link to={"/sistema/incorporaciones"} className="listItem"  >
        <span class="material-symbols-outlined">
edit_square
</span>
          <span className="listItemTitle">Incorporaciones </span>

        </Link>
        <Link to={"/sistema/asignaciones"} className="listItem"  >
        <span class="material-symbols-outlined">
edit_square
</span>
          <span className="listItemTitle">Asignaciones </span>

        </Link>
        
        <Link to={"/sistema/transferencias"} className="listItem"  >
        <span class="material-symbols-outlined">
move_down
</span>
          <span className="listItemTitle">Transferencias</span>
        </Link>
        <Link to={"/sistema/proveedores"} className="listItem"  >
        <span class="material-symbols-outlined">
domain
</span>
          <span className="listItemTitle">Proveedores</span>
        </Link>
        <Link to={"/sistema/departamentos"} className="listItem"  >
        <span class="material-symbols-outlined">
demography
</span>
        <span className="listItemTitle">Departamentos</span>
      </Link>
      <Link to={"/sistema/mantenimiento-bienes"} className="listItem"  >
      <span class="material-symbols-outlined">
build
</span>
        <span className="listItemTitle">Mantenimiento</span>
      </Link>
    </div>
    
</div>
  )
}

export default Menu