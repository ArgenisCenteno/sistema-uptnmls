import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import RutaPrivada from "./Route/Private";
import Home from "./pages/Home.jsx"
import Bienes from "./pages/Bienes";
import Categorias from "./pages/Categorias";
import Incorporaciones from "./pages/Incorporaciones";
import RegistrarCategoria from "./pages/RegistrarCategoria.jsx";
import EditarCategoria from "./pages/EditarCategoria.jsx";
import RegistrarBien from "./pages/RegistrarBien.jsx";
import EditarBien from "./pages/EditarBien.jsx";
import Proveedores from "./pages/Proveedores.jsx";
import RegistrarProveedor from "./pages/RegistrarProveedor.jsx";
import ActualizarProveedor from "./pages/ActualizarProveedor.jsx";
import Departamentos from "./pages/Departamentos.jsx";
import RegistrarDepartamento from "./pages/RegistrarDepartamento.jsx";
import EditarDepartamento from "./pages/EditarDepartamento.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import RegistrarUsuario from "./pages/RegistrarUsuario.jsx";
import EditarUsuario from "./pages/EditarUsuario.jsx";
import RegistrarIncorporacion from "./pages/RegistrarIncorporacion.jsx";
import Incorporacion from "./pages/Incorporacion.jsx";
import RegistrarAsignacion from "./pages/RegistrarAsignacion.jsx";
import Asignaciones from "./pages/Asignaciones.jsx";
import Asignacion from "./pages/Asignacion.jsx";
import RegistrarTransferencia from "./pages/RegistrarTransferencia.jsx";
import Transferencias from "./pages/Transferencias.jsx";
import Transferencia from "./pages/Transferencia.jsx";
import GestionDepartamento from "./pages/GestionDepartamento.jsx";
import BienesBox from "./components/BienesBox.jsx";
import Mantenimiento from "./pages/BienesMantenimiento.jsx";
import Desincorporaciones from "./pages/Desincorporaciones.jsx";
import Solicitud from "./pages/Solicitudes.jsx";
 

function App() {
 

  return (
    <>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/sistema" element={<RutaPrivada/>}>
          <Route path='inicio' element={<Home/>} />  
          <Route path='bienes' element={<Bienes/>} /> 
          <Route path='registrar-bien' element={<RegistrarBien/>} />
          <Route path='bien/:codigo' element={<EditarBien/>} />   
          <Route path='categorias' element={<Categorias/>} />  
          <Route path='registrar-categoria' element={<RegistrarCategoria/>} />  
          <Route path='categoria/:codigo' element={<EditarCategoria/>} />  
          <Route path='categoria' element={<EditarCategoria/>} />  
          <Route path='proveedores' element={<Proveedores/>} />  
          <Route path='registrar-proveedor' element={<RegistrarProveedor/>} />
          <Route path='proveedor/:codigo' element={<ActualizarProveedor/>} />  
          <Route path='departamentos' element={<Departamentos/>} />    
          <Route path='registrar-departamento' element={<RegistrarDepartamento/>} />  
          <Route path='departamento/:codigo' element={<EditarDepartamento/>} />  
          <Route path='incorporacion/:codigo' element={<Incorporacion/>} /> 
          <Route path='incorporaciones' element={<Incorporaciones/>} /> 
          <Route path='gestion-departamento/:codigo' element={<GestionDepartamento/>} /> 
          <Route path='registrar-incorporacion' element={<RegistrarIncorporacion/>} />
          <Route path='usuarios' element={<Usuarios/>} /> 
          <Route path='usuario/:codigo' element={<EditarUsuario/>} /> 
          <Route path='registrar-usuario' element={<RegistrarUsuario/>} />
          <Route path='asignaciones' element={<Asignaciones/>} />
          <Route path='mantenimiento-bienes' element={<Mantenimiento/>} />
          <Route path='asignacion/:codigo' element={<Asignacion/>} />
          <Route path='registrar-asignacion' element={<RegistrarAsignacion/>} />
          <Route path='registrar-transferencia' element={<RegistrarTransferencia/>} />
          <Route path='transferencias' element={<Transferencias/>} />
          <Route path='transferencia/:codigo' element={<Transferencia/>} />
          <Route path='desincorporaciones' element={<Desincorporaciones/>} />
          <Route path='solicitudes' element={<Solicitud/>} />
          </Route>
       </Routes>
    </>
  )
}

export default App
