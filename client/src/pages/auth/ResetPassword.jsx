import {useState} from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; 
import logo from '../../img/logo.jpg'
import banner from '../../img/banner.jpg'
import '../../style/Auth.scss'
import { Link } from 'react-router-dom';

const ResetPassword = () => {
const [shown, setShown] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const switchShown = () => setShown(!shown);
const onChange = ({ currentTarget }) => setPassword(currentTarget.value);



  return (
    <div className="container-login" >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100"> 
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4"> 
                <div className="text-center">
                  <img src={logo} 
                     width="110px"  alt="logo"/> 
                      <h4>Recuperar contraseña</h4>
                </div> 
                <form> 
                
                  <div className="form-outline mt-4 mb-4">
                  <label className="form-label" > <strong>Email</strong> </label>
                    <input type="email"  className="form-control"
                      placeholder="Ingrese su email" /> 
                  </div> 
                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3" type="button">Enviar email</button> 
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                   <p className="mb-0 me-2 text-center">Regresar a login</p>
                    <Link to="/login">
                       <button type="button" className="btn btn-outline-success">Login</button>
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

export default ResetPassword