import React from 'react'
import { Link } from 'react-router-dom'
import "../style/BienesBox.scss"
const TransferenciaBox = () => {
  return (
    <div className="bienesBox">
    <div className="boxInfo">
      <div className="title">
      
        <span>Transferencias</span>
      </div>
      <h1>732</h1>
      <div className="chartInfo">
<div className="chart">

</div>
<div className="texts">
  <span
    className="percentage"
    
  >
    
   <span class="material-symbols-outlined" style={{ color: '9867C5', fontSize: '84px'}}>
   move_down
        </span>
  </span>
 
</div>
</div>
      <Link to="/" style={{ color: '#9867C5'}}>
        Ver más
      </Link>
    </div>

  </div>
  )
}

export default TransferenciaBox