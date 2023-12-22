const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Swal from 'sweetalert2'

const Categorias = () => {
 
  const [categorias, setCategorias] = useState([]);

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

  useEffect(() => { 
    obtenerCategorias()
  }, [])
  
  // Define las columnas para la DataGrid
  const columns = [
    { field: 'id_categoria', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 400 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          {/* Botón para eliminar la categoría */}
          <button
            className='btn btn-danger'
            onClick={() => handleDeleteCategoria(params.row.id_categoria)}
          >
            Eliminar
          </button>

           
          <Link
            className='btn btn-primary text-white'
            to={`/sistema/categoria/${params.row.id_categoria}`}
          >
            Editar
          </Link>
        </div>
      ),
    },
  ];

  // Función para eliminar una categoría por ID
  const handleDeleteCategoria = async (idCategoria) => {
     // Mostrar un cuadro de diálogo de confirmación
    const confirmResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    // Si el usuario confirma la eliminación, realizar la petición
    if (confirmResult.isConfirmed) {
      try {
        const { data } = await axios.delete(`${apiKey}/api/categoria/eliminar-categoria/${idCategoria}`);
        if (data) {
          // Si la petición tiene éxito, mostrar un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Categoria eliminada',
            text: data.message, // Puedes usar el mensaje que devuelve la petición
          });
          obtenerCategorias()
          // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
        }  
      } catch (error) {
         console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error inesperado al intentar eliminar la categoria',
        });
      }
    }
  };

  return (
    <Layout>
     <div className='bookTableHeader'>
        <div className='title'>
            <h1>Categorias</h1>
            
        </div>
        <div className='btnAddBook'>
        <Link to={"/sistema/registrar-categoria"}>
         <button className='btn btn-primary'>Registrar categoría</button>
        </Link>
        
       </div>
        </div>
      <div style={{ height: 480, width: '100%' }}>
        <DataGrid
          rows={categorias}
          columns={columns} 
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={(row) => row.id_categoria}
        />
      </div>
    </Layout>
  );
};

export default Categorias;
