// Importaciones necesarias
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Componente Solicitud
const Solicitud = () => {
  // Estado para almacenar los datos ficticios de solicitudes
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      fecha_solicitud: '2023-03-01',
      departamento: 'Recursos Humanos',
      solicitante: 'Juan Pérez',
      tipo_solicitud: 'Incorporación',
      estado: 'No procesada',
    },
    {
      id: 2,
      fecha_solicitud: '2023-03-02',
      departamento: 'Tecnología de la Información',
      solicitante: 'María Gómez',
      tipo_solicitud: 'Transferencia',
      estado: 'Procesada',
    },
    {
      id: 3,
      fecha_solicitud: '2023-03-03',
      departamento: 'Operaciones',
      solicitante: 'Carlos Rodríguez',
      tipo_solicitud: 'Desincorporación',
      estado: 'Aprobada',
    },
    {
      id: 4,
      fecha_solicitud: '2023-03-04',
      departamento: 'Logística',
      solicitante: 'Ana Martínez',
      tipo_solicitud: 'Asignación',
      estado: 'Rechazada',
    },
    // Puedes agregar más objetos según sea necesario
  ]);

  // Función para eliminar una solicitud por ID
  const handleDeleteSolicitud = async (idSolicitud) => {
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

    // Si el usuario confirma la eliminación, actualizar el estado
    if (confirmResult.isConfirmed) {
      setSolicitudes((prevSolicitudes) =>
        prevSolicitudes.filter((solicitud) => solicitud.id !== idSolicitud)
      );

      // Aquí puedes realizar cualquier otra acción que necesites después de la eliminación
    }
  };

  // Define las columnas para la DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'fecha_solicitud', headerName: 'Fecha de Solicitud', width: 180 },
    { field: 'departamento', headerName: 'Departamento', width: 200 },
    { field: 'solicitante', headerName: 'Solicitante', width: 200 },
    { field: 'tipo_solicitud', headerName: 'Tipo de Solicitud', width: 200 },
    { field: 'estado', headerName: 'Estado', width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          {/* Botón para eliminar la solicitud */}
          <button
            className='btn btn-danger'
            onClick={() => handleDeleteSolicitud(params.row.id)}
          >
            Eliminar
          </button>

          {/* Botón para editar la solicitud (Enlace a la página de edición) */}
          <Link
            to={`/sistema/editar-solicitud/${params.row.id}`}
            style={{ textDecoration: 'none' }}
          >
            <button className='btn btn-primary' style={{ marginLeft: '8px' }}>
              Editar
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="bookTableHeader">
        <div className="title">
          <h1>Solicitudes</h1>
        </div>
      </div>
      <div style={{ height: 480, width: '100%' }}>
        <DataGrid
          rows={solicitudes}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={(row) => row.id}
        />
      </div>
    </Layout>
  );
};

export default Solicitud;
