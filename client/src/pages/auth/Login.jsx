const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; 
import {useState} from 'react' 
import axios from 'axios';
import logo from '../../img/logo.jpg'
import banner from '../../img/banner.jpg'

import '../../style/Auth.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Swal from "sweetalert2"
  

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [clave, setclave] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const handleSubtmit = async (e) =>{
    e.preventDefault(); 
    setLoading(true)
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Ingrese un email válido");
      return;
    } else {
      setEmailError("");
    }

    try {
      const res = await axios.post(`${apiKey}/api/usuario/iniciar-sesion`, {
        email,
        clave,
      });
      if (res && res.data.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/sistema/inicio");
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data,
          showConfirmButton: false,
          timer: 1500
        });
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error en las credenciales',
        showConfirmButton: false,
        timer: 2000
      }) 
      setLoading(false)
    }
  } 



  return (
    <div className="container-login" >
  <div className="container-fluid py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100"> 
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4"> 
                <div className="text-center">
                  <img src={logo} 
                     width="110px"  alt="logo"/> 
                      <h4>Iniciar sesión</h4>
                </div> 
                <form onSubmit={handleSubtmit}> 
                
                  <div className="form-outline mb-4">
                  <label className="form-label" > <strong>Email</strong> </label>
                    <input type="email"   className="form-control"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingrese su email" /> 
                  </div>
                  <div className="form-outline mb-4">
                  <label className="form-label"  > <strong>Contraseña</strong> </label>
                    <input type="password"   className="form-control"
                     value={clave}
                     onChange={(e) => setclave(e.target.value)}
                      placeholder="Ingrese su contraseña" /> 
                  </div>
 
                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                     disabled={ loading}
                    type="submit">Ingresar</button> 
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">¿Olvidaste tu contraseña?</p>
                    <Link to="/reset-password">
                       <button type="button" className="btn btn-outline-danger">Recuperar</button>
                    </Link>
                   
                  </div>

                </form>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center ">
            <img src={banner} 
                   width='100%' height='604px' alt="logo"/> 
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        
  )
}

export default Login