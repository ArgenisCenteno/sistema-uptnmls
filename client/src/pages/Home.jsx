import React from 'react'
import Layout from "../components/Layout.jsx"
import TopBox from '../components/TopBox.jsx'
import "../style/Home.scss"
import BienesBox from '../components/BienesBox.jsx'
import IncorporacionesBox from '../components/IncorporacionesBox.jsx'
import TransferenciaBox from '../components/Transferencias.jsx'
import DepartamentosBox from '../components/DepartamentosBox.jsx'
import UsuariosBox from '../components/UsuariosBox.jsx'
import BienesMantenimientoBox from '../components/BienesMantenimientoBox.jsx'
import IncorporacionesBarra from '../components/IncorporacionesBarra.jsx'  
import PieChartBox from '../components/PieChart.jsx'
const Home = () => {
  return (
    <>
     <Layout >   
    <div className='mt-4 mb-4'> <h1>Panel de Administración </h1></div>
      <div className="home"> 
         <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
         <BienesBox/>
      </div>
      <div className="box box2">
         <IncorporacionesBox/>
      </div>
      <div className="box box2">
         <DepartamentosBox/>
      </div>
      <div className="box box2">
         <UsuariosBox/>
      </div>
      <div className="box box2">
         <TransferenciaBox/>
      </div>
      <div className="box bo2">
         <BienesMantenimientoBox/>
      </div>
     
      <div className="box box2">
         <PieChartBox/> 
      </div>
      <div className="box box2">
         <IncorporacionesBarra/>
      </div>
      <div className="box box2">
         <IncorporacionesBarra/>
      </div>
       
      </div>
    
     </Layout>
    </>
    
  )
}

export default Home