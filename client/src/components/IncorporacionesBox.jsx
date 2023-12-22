import React from 'react'
import { Link } from 'react-router-dom'
import "../style/BienesBox.scss"
const IncorporacionesBox = () => {
  return (
    <div className="bienesBox">
    <div className="boxInfo">
      <div className="title">
       
        <span>Incorporaciones</span>
      </div>
      <h1>732</h1>
      <div className="chartInfo">
<div className="chart">

</div>
<div className="texts">
  <span
    className="percentage"
    
  >
    
   <span class="material-symbols-outlined" style={{ color: 'violet', fontSize: '84px'}}>
   edit_square 
        </span>
  </span>
 
</div>
</div>
      <Link to="/" style={{ color: 'violet'}}>
        Ver más
      </Link>
    </div>

  </div>
  )
}

export default IncorporacionesBox