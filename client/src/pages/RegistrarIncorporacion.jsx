const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../context/auth';

const initialState = {
 incorporacion: { fecha_incorporacion: '',
                  id_proveedor: '', 
                  cantidad: '',
                  costo: '',
                  id_usuario: ''
                },

 bienes: [{ 
                  id_bien: '',  
                  estado: 'disponible',
                  valor: 0, 
 } ]
};

const RegistrarIncorporacion = () => {
    const [formData, setFormData] = useState(initialState);
    const [costoTotal, setCostoTotal] = useState(0);
    const [auth, setAuth] = useAuth();

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        incorporacion: {
          ...formData.incorporacion,
          [name]: value,
        },
      });

     console.log(formData)
    };
  
    const handleBienesChange = (event, index) => {
      const { name, value } = event.target;
      const nuevosBienes = [...formData.bienes];
      nuevosBienes[index] = {
        ...nuevosBienes[index],
        [name]: value,
      };
      setFormData({
        ...formData,
        bienes: nuevosBienes,
      });
     
        console.log(formData)
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
          id_bien: '', 
          estado: 'disponible',
          valor: '', 
        }));
        setFormData({
          ...formData,
          bienes: nuevosBienes,
          incorporacion: {
            ...formData.incorporacion,
            cantidad,
          },
        });
      }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        
      formData.incorporacion.id_usuario = auth.user.id_usuario
  
      try {
       const response = await axios.post(`${apiKey}/api/incorporacion/crear-incorporacion`, formData)

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
        <h2 className="m-4 pl-4">Registrar Incorporacion</h2>
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
                  name="fecha_incorporacion"
                  onChange={handleChange}
                  value={formData.incorporacion.fecha_incorporacion}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="col-6 mb-3">
              <div className="form-outline">
                <label className="form-label font-weight-bold" htmlFor="idProveedor">
                  Proveedor
                </label>
                <select
                  className="form-control"
                  name="id_proveedor"
                  onChange={handleChange} 

                  required

                >
                    <option value="" >Seleccione un Proveedor</option>
                  <option value="5">Auto Motors Inc.</option>
                  <option value="4">Furniture World Ltd</option>
                  <option value="2">Tech Solutions S.A</option>
                </select>
              </div>
            </div>
            {/* Agrega más inputs para los valores de incorporacion aquí... */}
          </div>
  
          <div className="row mb-3">
            <div className="col-6 mb-3">
              <div className="form-outline">
                <label className="form-label font-weight-bold" htmlFor="costoTotal">
                  Costo Total
                </label>
                <input
                  type="number"
                  step="any"
                  name="costo"
                  placeholder='Costo Total'
                  onChange={handleChange}
                  value={formData.incorporacion.costo}
                  className="form-control" 
                  required
                />
              </div>
            </div>
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
                  value={formData.incorporacion.cantidad}
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
                      Escoger bien al que pertenecera 
                    </label>
                    <select className='form-control' name="id_bien"
                      onChange={(e) => handleBienesChange(e, index)} required>
                        <option value="">Seleccione un Bien</option>
                        <option value="12">Automovil Toyoya Camry</option>
                        <option value="10">Computador de Escritorio HP</option>
                        <option value="11">Silla de Oficina ergonomica</option>
                        
                    </select>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="form-outline">
                    <label className="form-label font-weight-bold" htmlFor={`valor-${index}`}>
                      Valor
                    </label>
                    <input
                      type="number"
                      step="any"
                      id={`valor-${index}`}
                      name="valor"
                      onChange={(e) => handleBienesChange(e, index)}
                      value={bien.valor}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-6 mb-3">
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

export default RegistrarIncorporacion;
