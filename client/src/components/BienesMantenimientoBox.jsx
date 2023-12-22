import React from 'react'
import { Link } from 'react-router-dom'
import "../style/BienesBox.scss"
const BienesMantenimientoBox = () => {
  return (
    <div className="bienesBox">
    <div className="boxInfo">
      <div className="title">
       
        <span>Bienes en mantenimiento</span>
      </div>
      <h1>12</h1>
      <div className="chartInfo">
<div className="chart">

</div>
<div className="texts">
  <span
    className="percentage"
    
  >
    
   <span class="material-symbols-outlined" style={{ color: 'orange', fontSize: '84px'}}>
   home_repair_service
        </span>
  </span>
 
</div>
</div>
      <Link to="/" style={{ color: 'orange'}}>
        Ver más
      </Link>
    </div>

  </div>
  )
}

export default BienesMantenimientoBox