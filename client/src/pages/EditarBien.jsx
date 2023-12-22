const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Select from 'react-select';

const inicialState = {
    nombre: "", 
    descripcion: "",
    categoria: ""
  }
const EditarBien = () => {
    const params = useParams();

    const [formData, setFormData] = useState(inicialState )
    const [categorias, setCategorias] = useState([])
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [nombreCategoria, setNombreCategoria] = useState(null)
   
    const handleChange = (event) => {
      const { name, value } = event.target || event;
      setFormData({
        ...formData,
        [name]: value,
      });
    };



    const obtenerCategorias = async() =>{
        try {
          const {data} = await axios.get(`${apiKey}/api/categoria/obtener-categorias`)
          if(data){
            setCategorias(data)
          }
        } catch (error) {
          console.log(error)
        }
      }
  
      const traerCategoria = async(e) =>{ 
        try {
       
        const {data} = await axios.get(`${apiKey}/api/bien/obtenerBienPorId/${params.codigo}`) 
         if(data){
        setFormData({
            nombre: data.nombre,
            descripcion: data.descripcion,
            categoria: data.id_categoria 
        })
        console.log(formData)
        setNombreCategoria(data.categoria)
      }
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => { 

        traerCategoria()
        obtenerCategorias()
    }, [])
    

    const handleSubmit = async (e) =>{
        e.preventDefault()
       
        try {
            formData.categoria = selectedCategoria.value;
          const {data} = await axios.put(`${apiKey}/api/bien/actualizar-bien/${params.codigo}`, formData);
          if(data){ 
            Swal.fire({
              
              icon: 'success',
              title: "Correcto ",
              text: data 
            })
            
          } 
          obtenerCategorias()
          
        } catch (error) {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:  error.response.data, 
          })
        }
         
      } 

      const handleCategoriaChange = (selectedOption) => {
        setSelectedCategoria(selectedOption);

      };

  return (
    <Layout  >  
    <h2 className='m-4 pl-4  '>Editar Bien</h2>
    <form className=' m-4 p-3 boxShadow' onSubmit={handleSubmit} style={{backgroundColor: "#ebeaea", borderRadius: "12px" }}>
      <div className="row mb-3">
    <div className="col-6">
      {/* Nombre input */}
      <div className="form-outline">
        <label className="form-label font-weight-bold" htmlFor="form8Example1">Nombre de la categoría</label>
        <input type="text" id="form8Example1" name='nombre' value={formData.nombre}  onChange={handleChange} placeholder='Nombre' className="form-control" />
      </div>
    </div>
    <div className="col-5">
      {/* Descripcion input */}
      <div className="form-outline">
        <label className="form-label font-weight-bold"  >Descripción</label>
        <textarea   name='descripcion'   onChange={handleChange}  value={formData.descripcion} className="form-control" />
      </div>
    </div>
    <div className="col-5">
      {/* Descripcion input */}
      <div className="form-outline">
        <label className="form-label font-weight-bold"  >Categoría: {nombreCategoria}</label>
        <Select 
        name='categoria'
        value={selectedCategoria}
            onChange={handleCategoriaChange}
    options={categorias.map((categoria) => ({
      value: categoria.id_categoria,
      label: categoria.nombre,
    }))}
    placeholder='Seleccionar una categoria'
  />
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

export default EditarBien