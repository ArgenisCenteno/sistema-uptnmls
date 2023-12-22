const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../context/auth';

const initialState = {
 asignacion: { fecha_asignacion: '',
                  departamento_id: '', 
                  cantidad: '',
                  estado: 'En proceso',
                   usuario_id: ''
                },

 bienes: [{ 
                  id_ejemplar_bien: [] 
 } ]
};

const RegistrarAsignacion = () => {
    const [formData, setFormData] = useState(initialState); 
    const [auth, setAuth] = useAuth();

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        asignacion: {
          ...formData.asignacion,
          [name]: value,
        },
      });

     console.log(formData)
    };
  
    const handleBienesChange = (event, index) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => {
        const nuevosBienes = [...prevFormData.bienes];
        nuevosBienes[index] = {
          ...nuevosBienes[index],
          [name]: value,
        };
        return {
          ...prevFormData,
          bienes: nuevosBienes,
        };
      });
    };
    
    const handleDescartarBien = (index) => {
        const nuevosBienes = [...formData.bienes];
        nuevosBienes.splice(index, 1);
        setFormData({
          ...formData,
          bienes: nuevosBienes,
        });
      };
  
      const handleCantidadChange = (event) => {
        const cantidad = parseInt(event.target.value, 10) || 0;
        const nuevosBienes = Array.from({ length: cantidad }, (_, index) => ({ 
          id_ejemplar_bien: index + 1 // Asignar valores iniciales únicos basados en el índice
        }));
        setFormData({
          ...formData,
          bienes: nuevosBienes,
          asignacion: {
            ...formData.asignacion,
            cantidad: cantidad, // Actualizar la cantidad en asignacion
          },
        });
      }
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        
      formData.asignacion.usuario_id = auth.user.id_usuario
  
      try {
       const response = await axios.post(`${apiKey}/api/asignacion/crear-asignacion`, formData)

       if(response){
        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: response.data,
          });
       }
  
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data,
        });
      }
    };
  
    return (
      <Layout>
        <h2 className="m-4 pl-4">Registrar Asignación</h2>
        <form
          className="m-4 p-3 boxShadow"
          onSubmit={handleSubmit}
          style={{ backgroundColor: '#ebeaea', borderRadius: '12px' }}
        >
          <div className="row mb-3">
            <div className="col-6 mb-3">
              <div className="form-outline">
                <label className="form-label font-weight-bold" htmlFor="fechaIncorporacion">
                  Fecha de Incorporación
                </label>
                <input
                  type="date"
                  name="fecha_asignacion"
                  onChange={handleChange} 
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="col-6 mb-3">
              <div className="form-outline">
                <label className="form-label font-weight-bold" htmlFor="idProveedor">
                  Departamento
                </label>
                <select
                  className="form-control"
                  name="departamento_id"
                  onChange={handleChange} 

                  required

                >
                    <option value="" >Seleccione un Departamento</option>
                  <option value="11">Departamento de Informatica</option>
                  <option value="12">Departamento de Recursos Humanos</option>
                  <option value="13">Departamento de Bienes Publicos</option>
                </select>
              </div>
            </div>
            {/* Agrega más inputs para los valores de incorporacion aquí... */}
          </div>
  
          <div className="row mb-3">
            
            <div className="col-6 mb-3">
              <div className="form-outline">
                <label className="form-label font-weight-bold" htmlFor="cantidad">
                  Cantidad
                </label>
                <input
                  type="number"
                  name="cantidad"
                  placeholder='Cantidad'
                  onChange={handleCantidadChange}
                  
                  className="form-control"
                  required
                />
              </div>
            </div>
            {/* Agrega más inputs para los valores de bienes aquí... */}
          </div>
  
          {formData.bienes.map((bien, index) => (
            <div key={index}>
                <h3>Bien {(index + 1)}</h3>
              <div className="row mb-3">

                <div className="col-6 mb-3">
                  <div className="form-outline">
                    <label className="form-label font-weight-bold" htmlFor={`fechaAdquisicion-${index}`}>
                      Escoger bien a asignar
                    </label>
                    <select className='form-control' name="id_ejemplar_bien"
                      onChange={(e) => handleBienesChange(e, index)} required>
                        <option value="">Seleccione un Bien</option>
                        <option value="54">Bien 1</option>
                        <option value="55">Bien 2</option> 
                        
                    </select>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="form-outline">
                    <label className="form-label font-weight-bold" htmlFor={`fechaAdquisicion-${index}`}>
                      Ubicación del Bien
                    </label>
                     <input type='text' className='form-control ' placeholder='Ubicación' name='ubicacion' onChange={(e) => handleBienesChange(e, index)} required/>
                  </div>
                </div>
                
                <div className="col-6 mt-4 mb-3">
        {/* Agrega un botón para descartar el bien */}
        <button type="button" className="btn btn-danger" onClick={() => handleDescartarBien(index)}>
          Descartar Bien
        </button>
      </div>
              </div>
            </div>
          ))}
  
          <div className="row mb-3">
            <div className="col-4">
              <button type="submit" className="btn btn-primary">
                Aceptar
              </button>
            </div>
          </div>
        </form>
      </Layout>
    );
  };

export default RegistrarAsignacion;
