const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Asignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);

  // Función para obtener los bienes desde el servidor
  const obtenerAsignaciones = async () => {
    try {
      const response = await axios.get(`${apiKey}/api/asignacion/obtener-asignaciones`);
      setAsignaciones(response.data);
    } catch (error) {
      console.error('Error al obtener los bienes:', error);
    }
  };

  useEffect(() => {
    // Llama a la función para obtener los bienes cuando el componente se monta
    obtenerAsignaciones();
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
     const { data } = await axios.delete(`${apiKey}/api/asignacion/eliminar-asignacion/${idBien}`);
     if (data) {
       // Si la petición tiene éxito, mostrar un mensaje de éxito
       Swal.fire({
         icon: 'success',
         title: 'Asignación eliminada',
         text: data.message, // Puedes usar el mensaje que devuelve la petición
       });
       obtenerAsignaciones()
       // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
     }  
   } catch (error) {
      console.log(error)
     Swal.fire({
       icon: 'error',
       title: 'Error',
       text: 'Hubo un error inesperado al intentar eliminar la asignación',
     });
   }
 }
};

  // Define las columnas para la DataGrid
  const columns = [
    { field: 'id_asignacion', headerName: 'ID', width: 90 },
    { field: 'fecha_asignacion', headerName: 'Fecha', width: 260 }, 
    { field: 'nombre_departamento', headerName: 'Departamento', width: 130 },
    { field: 'codigo', headerName: 'Código', width: 130 },
    { field: 'nombre_completo_usuario', headerName: 'Usuario', width: 260 },
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 300,
        sortable: false,
        renderCell: (params) => (
          <div>
            <button
            className='btn btn-danger ml-4'
            onClick={() => handleDeleteBien(params.row.id_asignacion)}
          >
            Eliminar
          </button>
  
            {/* Botón para ver la categoría (puedes redirigir a una página de detalles) */}
            <Link
              to={`/sistema/asignacion/${params.row.id_asignacion}`}
              className='btn btn-primary text-white ml-4'
               
            >
              Detalles
            </Link>

             
          </div>
        ),
      },
  ];
 
  return (
    <Layout>
     <div className='bookTableHeader'>
        <div className='title'>
            <h1>Asignaciones</h1>
            
        </div>
       <div className='btnAddBook'>
        <Link to={"/sistema/registrar-asignacion"}>
         <button className='btn btn-primary'>Realizar asignación</button>
        </Link>
        
       </div>
        
      </div>
      <div style={{ height: 530, width: '100%' }} className='text-white'>
        <DataGrid
        
          rows={asignaciones}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]} 
          getRowId={(row) => row.id_asignacion}
        />
      </div>
    </Layout>
  );
};

export default Asignaciones;
