const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const inicialState = {
    nombre: "", 
    descripcion: ""
  }

const EditarCategoria = () => {
    const params = useParams();
    const [formData, setFormData] = useState(inicialState)
   
    const handleChange = (event) => {
      const { name, value } = event.target || event;
      setFormData({
        ...formData,
        [name]: value,
      });
    };


    const traerCategoria = async(e) =>{ 
        try {
        const {data} = await axios.get(`${apiKey}/api/categoria/obtener-categoria/${params.codigo}`)
         if(data){
        setFormData({
            nombre: data.nombre,
            descripcion: data.descripcion

        })
      }
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => { 
        traerCategoria()
    }, [])
    

    const handleSubmit = async (e) =>{
        e.preventDefault()
       
        try {
          const {data} = await axios.put(`${apiKey}/api/categoria/actualizar-categoria/${params.codigo}`, formData);
          if(data){ 
            Swal.fire({
              
              icon: 'success',
              title: "Correcto ",
              text: data 
            })
            
          } 
          
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
    <h2 className='m-4 pl-4  '>Editar Categoría</h2>
    <form className=' m-4 p-3 boxShadow' onSubmit={handleSubmit} style={{backgroundColor: "#ebeaea", borderRadius: "12px" }}>
      <div className="row mb-3">
    <div className="col-6">
      {/* Nombre input */}
      <div className="form-outline">
        <label className="form-label font-weight-bold" htmlFor="form8Example1">Nombre de la categoría</label>
        <input type="text" id="form8Example1" value={formData.nombre} name='nombre' onChange={handleChange} placeholder='Nombre' className="form-control" />
      </div>
    </div>
    <div className="col-5">
      {/* Descripcion input */}
      <div className="form-outline">
        <label className="form-label font-weight-bold"  >Descripción</label>
        <textarea   name='descripcion' value={formData.descripcion}  onChange={handleChange}  className="form-control" />
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

export default EditarCategoria