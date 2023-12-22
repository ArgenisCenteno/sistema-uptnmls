import React from 'react'
import { Link } from 'react-router-dom'
import "../style/BienesBox.scss"
const UsuariosBox = () => {
  return (
    <div className="bienesBox">
    <div className="boxInfo">
      <div className="title">
      
        <span>Usuarios</span>
      </div>
      <h1>732</h1>
      <div className="chartInfo">
<div className="chart">

</div>
<div className="texts">
  <span
    className="percentage"
    
  >
    
   <span class="material-symbols-outlined" style={{ color: 'yellow', fontSize: '84px'}}>
   group
        </span>
  </span>
 
</div>
</div>
      <Link to="/" style={{ color: 'yellow'}}>
        Ver más
      </Link>
    </div>

  </div>
  )
}

export default UsuariosBox