const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import Layout from '../components/Layout'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const initialState = {
    nombre: '',
    descripcion: '',
    ubicacion: '',
  };

const EditarDepartamento = () => {
    const params = useParams()
    const [formData, setFormData] = useState(initialState) 

    const handleChange = (event) => {
      const { name, value } = event.target ;
      setFormData({
        ...formData,
        [name]: value,
      }); 
    };

    const traerProveedor = async(e) =>{ 
        try {
       
        const {data} = await axios.get(`${apiKey}/api/departamento/traerDepartamento/${params.codigo}`) 
         if(data){
        setFormData({
            nombre: data.nombre,
            descripcion: data.descripcion,
            ubicacion: data.ubicacion,  
        })
 
      }
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => { 

        traerProveedor() 
    }, [])

    
    const handleSubmit = async (e) =>{
        e.preventDefault()
       
        try {
            
          const {data} = await axios.put(`${apiKey}/api/departamento/actualizar-departamento/${params.codigo}`, formData);
          if(data){ 
            Swal.fire({
              
              icon: 'success',
              title: "Correcto ",
              text: data 
            }) 
          } 
          traerProveedor()
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
    <h2 className="m-4 pl-4">Editar Departamento</h2>
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
              Nombre de la categoría
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
            <label className="form-label font-weight-bold">Descripción</label>
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              onChange={handleChange}
              className="form-control"
              value={formData.descripcion}
            />
          </div>
        </div>
        <div className="col-6 mb-3">
          {/* Descripcion input */}
          <div className="form-outline">
            <label className="form-label font-weight-bold">Ubicación</label>
            <select
              name="ubicacion"
              placeholder="Ubicación"
              className="form-control"
              onChange={handleChange}
              value={formData.ubicacion}
            >
              <option value="">Seleccione un departamento</option>
              <option value="Sede Administrativa">Sede Administrativa</option>
              <option value="Sede Nueva">Sede Nueva</option>
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

export default EditarDepartamento