import React from 'react'
import { Link } from 'react-router-dom'
import "../style/BienesBox.scss"
const DepartamentosBox = () => {
  return (
    <div className="bienesBox">
    <div className="boxInfo">
      <div className="title">
     
        <span>Departamentos</span>
      </div>
      <h1>36</h1>
      <div className="chartInfo">
<div className="chart">

</div>
<div className="texts">
  <span
    className="percentage"
    
  >
    
   <span class="material-symbols-outlined" style={{ color: 'turquoise', fontSize: '84px'}}>
   demography
        </span>
  </span>
 
</div>
</div>
      <Link to="/" style={{ color: 'turquoise'}}>
        Ver más
      </Link>
    </div>

  </div>
  )
}

export default DepartamentosBox