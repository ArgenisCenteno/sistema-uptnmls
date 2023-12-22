const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Función para obtener los bienes desde el servidor
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get(`${apiKey}/api/usuario/traer-usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener los bienes:', error);
    }
  };

  useEffect(() => {
    // Llama a la función para obtener los bienes cuando el componente se monta
    obtenerUsuarios();
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
     const { data } = await axios.delete(`${apiKey}/api/usuario/eliminarUsuario/${idBien}`);
     if (data) {
       // Si la petición tiene éxito, mostrar un mensaje de éxito
       Swal.fire({
         icon: 'success',
         title: 'Usuario eliminado',
         text: data.message, // Puedes usar el mensaje que devuelve la petición
       });
       obtenerUsuarios()
       // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
     }  
   } catch (error) {
      console.log(error)
     Swal.fire({
       icon: 'error',
       title: 'Error',
       text: 'Hubo un error inesperado al intentar eliminar el Departamento',
     });
   }
 }
};

  // Define las columnas para la DataGrid
  const columns = [
    { field: 'id_usuario', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 120  },  
    { field: 'apellido', headerName: 'Apellido', width: 120 },
    { field: 'email', headerName: 'Email', width: 260 },
    {
        field: 'rol',
        headerName: 'Rol',
        width: 140,
        renderCell: (params) => (
          <span className={params.value ==  1 ? 'btn btn-primary' : 'btn btn-warning'}>
            {params.value ==  1 ? 'Administrador' : 'Coordinador'}
          </span>
        ),
      },
      {
        field: 'estado',
        headerName: 'Estado',
        width: 120,
        renderCell: (params) => (
          <span className={params.value ==  'activo' ? 'btn btn-success' : 'btn btn-danger'}>
            {params.value ==  'activo' ? 'Activo' : 'Inactivo'}
          </span>
        ),
      },
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 300,
        sortable: false,
        renderCell: (params) => (
          <div>
            <button
            className='btn btn-danger ml-4'
            onClick={() => handleDeleteBien(params.row.id_usuario)}
          >
            Eliminar
          </button>
  
            {/* Botón para ver la categoría (puedes redirigir a una página de detalles) */}
            <Link
              to={`/sistema/usuario/${params.row.id_usuario}`}
              className='btn btn-primary text-white ml-4'
               
            >
              Editar
            </Link>
             
          </div>
        ),
      },
  ];
 
  return (
    <Layout>
     <div className='bookTableHeader'>
        <div className='title'>
            <h1>Usuarios</h1>
            
        </div>
       <div className='btnAddBook'>
        <Link to={"/sistema/registrar-usuario"}>
         <button className='btn btn-primary'>Registrar Usuario</button>
        </Link>
        
       </div>
        
      </div>
      <div style={{ height: 530, width: '100%' }}  >
        <DataGrid
        
          rows={usuarios}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]} 
          getRowId={(row) => row.id_usuario}
        />
      </div>
    </Layout>
  );
};

export default Usuarios;
