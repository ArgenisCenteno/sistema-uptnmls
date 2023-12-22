const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const GestionDepartamento = () => {
  const [bienes, setBienes] = useState([]);
  const params = useParams() 

  // Función para obtener los bienes desde el servidor
  const obtenerBienes = async () => {
    try {
      const response = await axios.get(`${apiKey}/api/departamento/bienes-asignados/${params.codigo}`);
      console.log(response.data)
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
    { field: 'id_bienes_asinados', headerName: 'ID', width: 90 },
    { field: 'nombre_bien', headerName: 'Nombre', width: 200 }, 
    { field: 'ubicacion_ejemplar', headerName: 'Ubicación', width: 200 },
    { field: 'valor_ejemplar', headerName: 'Valor', width: 120 },
    { field: 'vigencia', headerName: 'Vigencia', width: 120 },
     
  ];
 
  return (
    <Layout>
     <div className='bookTableHeader'>
        <div className='title'>
            <h1>Bienes Asignados</h1>
            
        </div>
       <div className='btnAddBook'>
        
        
       </div>
        
      </div>
      <div style={{ height: 530, width: '100%' }} className='text-white'>
        <DataGrid
        
          rows={bienes}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]} 
          getRowId={(row) => row.id_bienes_asinados}
        />
      </div>
    </Layout>
  );
};

export default GestionDepartamento;
