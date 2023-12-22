// Importaciones necesarias
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// Componente Desincorporaciones
const Desincorporaciones = () => {
  // Estado para almacenar datos ficticios de desincorporaciones
  const [desincorporaciones, setDesincorporaciones] = useState([
    {
      id: 1,
      codigo: 'D2023001',
      costo: 700,
      estado: 'Desincorporado',
      usuario: 'Juan Pérez',
      departamento: 'Recursos Humanos',
    },
    {
      id: 2,
      codigo: 'D2023002',
      costo: 500,
      estado: 'En Proceso',
      usuario: 'María García',
      departamento: 'Finanzas',
    },
    // Puedes agregar más objetos según sea necesario
  ]);

  // Define las columnas para la DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'codigo', headerName: 'Código', width: 150 },
    { field: 'costo', headerName: 'Costo', width: 120 },
    { field: 'estado', headerName: 'Estado', width: 150 },
    { field: 'usuario', headerName: 'Usuario', width: 200 },
    { field: 'departamento', headerName: 'Departamento', width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          {/* Botón para eliminar la desincorporación */}
          <button
            className='btn btn-danger'
            onClick={() => handleDeleteDesincorporacion(params.row.id)}
          >
            Eliminar
          </button>

          {/* Botón para editar la desincorporación */}
          <Link
            className='btn btn-primary text-white'
            to={`/sistema/desincorporacion/${params.row.id}`}
          >
            Editar
          </Link>
        </div>
      ),
    },
  ];

  // Función para eliminar una desincorporación por ID
  const handleDeleteDesincorporacion = (idDesincorporacion) => {
    // Aquí puedes implementar la lógica para eliminar la desincorporación
    // ...

    // Actualiza el estado después de la eliminación
    setDesincorporaciones((prevDesincorporaciones) =>
      prevDesincorporaciones.filter((d) => d.id !== idDesincorporacion)
    );
  };

  return (
    <Layout>
      <div className='bookTableHeader'>
        <div className='title'>
          <h1>Desincorporaciones</h1>
        </div>
        <div className='btnAddBook'>
        <Link to={"/sistema/registrar-asignacion"}>
         <button className='btn btn-primary'>Realizar desincorporacion</button>
        </Link>
        
       </div>
      </div>
      <div style={{ height: 480, width: '100%' }}>
        <DataGrid
          rows={desincorporaciones}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={(row) => row.id}
        />
      </div>
    </Layout>
  );
};

export default Desincorporaciones;
