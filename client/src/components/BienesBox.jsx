import React from 'react'
import { Link } from 'react-router-dom'
import "../style/BienesBox.scss"
const BienesBox = () => {
  return (
    <div className="bienesBox">
    <div className="boxInfo">
      <div className="title">
      
      <h1>Bienes </h1>
      </div>
      <h3>732</h3>
      <div className="chartInfo">
<div className="chart">

</div>
<div className="texts">
  <span
    className="percentage"
    
  >
    
   <span class="material-symbols-outlined" style={{ color: 'lime', fontSize: '84px'}}>
        inventory_2
        </span>
  </span>
 
</div>
</div>
      <Link to="/" style={{ color: 'lime'}}>
        Ver más
      </Link>
      
    </div>

  </div>
  )
}

export default BienesBox