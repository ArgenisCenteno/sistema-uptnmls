const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import Layout from '../components/Layout'
import Swal from 'sweetalert2'
import axios from 'axios'

const inicialState = {
    nombre: "", 
    direccion: "",
    email: "",
    telefono: ""
  }

const RegistrarProveedor = () => {

    const [formData, setFormData] = useState(inicialState) 

    const handleChange = (event) => {
      const { name, value } = event.target || event;
      setFormData({
        ...formData,
        [name]: value,
      }); 
    };

    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
      if(formData.telefono.length != 11){
        Swal.fire({
              
          icon: 'error',
          title: "Telefono invalido ",
          text: 'Ingrese un número de telefono válido' 
        })
        return;
      }
        try {
            
          const {data} = await axios.post(`${apiKey}/api/proveedor/crear-proveedor`, formData);
          if(data){ 
            Swal.fire({
              
              icon: 'success',
              title: "Correcto ",
              text: data 
            })
            console.log(data)
          } 
          setFormData({
            nombre: "", 
            direccion: "",
            email: "",
            telefono: ""
          })
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
    <Layout  >  
    <h2 className='m-4 pl-4  '>Registrar Proveedor</h2>
    <form className=' m-4 p-3 boxShadow' onSubmit={handleSubmit} style={{backgroundColor: "#ebeaea", borderRadius: "12px" }}>
      <div className="row mb-3">
    <div className="col-6  mb-3">
      {/* Nombre input */}
      <div className="form-outline">
        <label className="form-label font-weight-bold" htmlFor="form8Example1">Nombre de la categoría</label>
        <input type="text" id="form8Example1" name='nombre' onChange={handleChange} placeholder='Nombre' className="form-control" />
      </div>
    </div>
    <div className="col-6  mb-3">
      {/* Descripcion input */}
      <div className="form-outline">
        <label className="form-label font-weight-bold"  >Dirección</label>
        <input type='text'  name='direccion' placeholder='Dirección'  onChange={handleChange}  className="form-control" />
      </div>
    </div>
    <div className="col-6  mb-3">
      {/* Descripcion input */}
      <div className="form-outline">
        <label className="form-label font-weight-bold"  >Email</label>
        <input type="email" id="form8Example1" name='email' onChange={handleChange} placeholder='Email' className="form-control" />

      </div>
    </div>
    <div className="col-5  mb-3">
      {/* Descripcion input */}
      <div className="form-outline">
        <label className="form-label font-weight-bold"  >Telefono</label>
        <input type='number'  name='telefono'  onChange={handleChange}  placeholder='Telefono' className="form-control" />
      </div>
    </div>
  </div>
   

  
  
 
  <div className='row mb-3'>
  
      <div className='col-4'>
    <button type='submit' className='btn btn-primary'>Aceptar</button>
      </div>
  </div>
  </form>
  </Layout>
  )
}

export default RegistrarProveedor