const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Bienes = () => {
  const [bienes, setBienes] = useState([]);

  // Función para obtener los bienes desde el servidor
  const obtenerBienes = async () => {
    try {
      const response = await axios.get(`${apiKey}/api/bien/obtener-bienes`);
      setBienes(response.data);
    } catch (error) {
      console.error('Error al obtener los bienes:', error);
    }
  };

  useEffect(() => {
    // Llama a la función para obtener los bienes cuando el componente se monta
    obtenerBienes();
  }, []);

  // Función para eliminar un  bien por ID
 const handleDeleteBien = async (idBien) => {
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
     const { data } = await axios.delete(`${apiKey}/api/bien/eliminar-bien/${idBien}`);
     if (data) {
       // Si la petición tiene éxito, mostrar un mensaje de éxito
       Swal.fire({
         icon: 'success',
         title: 'Bien eliminado',
         text: data.message, // Puedes usar el mensaje que devuelve la petición
       });
       obtenerBienes()
       // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
     }  
   } catch (error) {
      console.log(error)
     Swal.fire({
       icon: 'error',
       title: 'Error',
       text: 'Hubo un error inesperado al intentar eliminar el bien',
     });
   }
 }
};

  // Define las columnas para la DataGrid
  const columns = [
    { field: 'id_bien', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 200 }, 
    { field: 'descripcion', headerName: 'Descripción', width: 400 },
    { field: 'categoria', headerName: 'Categoría', width: 120 },
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 400,
        sortable: false,
        renderCell: (params) => (
          <div>
            <button
            className='btn btn-danger ml-4'
            onClick={() => handleDeleteBien(params.row.id_bien)}
          >
            Eliminar
          </button>
  
            {/* Botón para ver la categoría (puedes redirigir a una página de detalles) */}
            <Link
              to={`/sistema/bien/${params.row.id_bien}`}
              className='btn btn-primary text-white ml-4'
               
            >
              Editar
            </Link>

            <button
              className='btn btn-success text-white ml-4'
               
            >
              Ejemplares
            </button>
          </div>
        ),
      },
  ];
 
  return (
    <Layout>
     <div className='bookTableHeader'>
        <div className='title'>
            <h1>Bienes</h1>
            
        </div>
       <div className='btnAddBook'>
        <Link to={"/sistema/registrar-bien"}>
         <button className='btn btn-primary'>Registrar bien</button>
        </Link>
        
       </div>
        
      </div>
      <div style={{ height: 530, width: '100%' }} className='text-white'>
        <DataGrid
        
          rows={bienes}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]} 
          getRowId={(row) => row.id_bien}
        />
      </div>
    </Layout>
  );
};

export default Bienes;
