const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import Layout from '../components/Layout'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useParams } from 'react-router-dom';


const initialState = {
    nombre: '',
    apellido: '',
    email: '', 
    rol: '',
    estado: ''
  };

const EditarUsuario = () => {
    const params = useParams()
    const [formData, setFormData] = useState(initialState) 

    const handleChange = (event) => {
      const { name, value } = event.target ;
      setFormData({
        ...formData,
        [name]: value,
      }); 
    };

    const traerUsuario = async(e) =>{ 
        try {
       
        const {data} = await axios.get(`${apiKey}/api/usuario/traerUsuario/${params.codigo}`) 
         if(data){
        setFormData({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,  
            rol: data.rol,
            estado: data.estado
        })
 
      }
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => { 

        traerUsuario() 
    }, [])

    
    const handleSubmit = async (e) =>{
        e.preventDefault()
       
        try {
            
          const {data} = await axios.put(`${apiKey}/api/usuario/actualizar-usuario/${params.codigo}`, formData);
          if(data){ 
            Swal.fire({
              
              icon: 'success',
              title: "Correcto ",
              text: data 
            }) 
          } 
          traerUsuario()
        } catch (error) {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:  error.response.data, 
          })
        }
         
      } 

  return (
    <Layout>
    <h2 className="m-4 pl-4">Editar Usuario</h2>
    <form
      className="m-4 p-3 boxShadow"
      onSubmit={handleSubmit}
      style={{ backgroundColor: '#ebeaea', borderRadius: '12px' }}
    >
      <div className="row mb-3">
        <div className="col-6 mb-3">
          {/* Nombre input */}
          <div className="form-outline">
            <label className="form-label font-weight-bold" htmlFor="form8Example1">
              Nombre  
            </label>
            <input
              type="text"
              id="form8Example1"
              name="nombre"
              onChange={handleChange}
              placeholder="Nombre"
              className="form-control"
              value={formData.nombre}
            />
          </div>
        </div>
        <div className="col-6 mb-3">
          {/* Descripcion input */}
          <div className="form-outline">
            <label className="form-label font-weight-bold">Apellido</label>
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              onChange={handleChange}
              className="form-control"
              value={formData.apellido}
            />
          </div>
        </div>
        <div className="col-6 mb-3">
          {/* Descripcion input */}
          <div className="form-outline">
            <label className="form-label font-weight-bold">Rol</label>
            <select
              name="rol" 
              className="form-control"
              onChange={handleChange}
              value={formData.rol}
            >
              <option value="">Seleccione un rol</option>
              <option value="1">Administrador</option>
              <option value="2">Coordinador</option>
            </select>
          </div>
        </div>
        <div className="col-6 mb-3">
          {/* Descripcion input */}
          <div className="form-outline">
            <label className="form-label font-weight-bold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="form-control"
              value={formData.email}
            />
          </div>
        </div>
        <div className="col-6 mb-3">
          {/* Descripcion input */}
          <div className="form-outline">
            <label className="form-label font-weight-bold">Clave</label>
            <select
              name="estado" 
              className="form-control"
              onChange={handleChange}
              value={formData.estado}
            >
              <option value="">Seleccione un rol</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>


      <div className="row mb-3">
        <div className="col-4">
          <button type="submit" className="btn btn-primary">
            Aceptar
          </button>
        </div>
      </div>
    </form>
  </Layout>
  )
}

export default EditarUsuario  
