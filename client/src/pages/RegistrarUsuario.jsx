const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Swal from 'sweetalert2';
import axios from 'axios';

const initialState = {
  nombre: '',
  apellido: '',
  email: '',
  clave: '',
  rol: '',
};

const RegistrarUsuario = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.rol === '') {
      Swal.fire({
        icon: 'error',
        title: 'Rol de usuario',
        text: 'Seleccione el rol de usuario',
      });
      return;
    }

    try {
      const { data } = await axios.post(`${apiKey}/api/usuario/crear-usuario`, formData);
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: data,
        });
        console.log(data);
      }
      setFormData(initialState);
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
      <h2 className="m-4 pl-4">Registrar Departamento</h2>
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
              />
            </div>
          </div>
          <div className="col-6 mb-3">
            {/* Descripcion input */}
            <div className="form-outline">
              <label className="form-label font-weight-bold">Clave</label>
              <input
                type="password"
                name="clave"
                placeholder="Clave"
                onChange={handleChange}
                className="form-control"
              />
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
  );
};

export default RegistrarUsuario;
