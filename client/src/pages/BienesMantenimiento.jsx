// Importaciones necesarias
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

// Componente Mantenimiento
const Mantenimiento = () => {
  // Estado para almacenar los datos ficticios de bienes en mantenimiento
  const [bienesMantenimiento, setBienesMantenimiento] = useState([
    {
      id: 1,
      codigo: '2023001',
      nombre: 'Juan Pérez',
      costo: 500,
      tecnico: 'Ana García',
      fechaRegistro: '2023-01-15',
      fechaDevolucion: '2023-02-01',
    },
    // Puedes agregar más objetos según sea necesario
  ]);

  // Define las columnas para la DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'codigo', headerName: 'Código', width: 120 },
    { field: 'nombre', headerName: 'Usuario', width: 200 }, 
    { field: 'tecnico', headerName: 'Técnico', width: 120 },
    { field: 'fechaRegistro', headerName: 'Fecha de Registro', width: 200 },
    { field: 'fechaDevolucion', headerName: 'Fecha de Devolución', width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <div>
          {/* Botón para eliminar la categoría */}
          <button className='btn btn-danger' onClick={() => handleDeleteBien(params.row.id)}>
            Eliminar
          </button>
          <Link className='btn btn-primary text-white' to={`/sistema/mantenimiento/${params.row.id}`}>
            Detalles
          </Link>
          <Link className='btn btn-success text-white' to={`/sistema/mantenimiento/${params.row.id}`}>
            Finalizar
          </Link>
        </div>
      ),
    },
  ];

  // Función para eliminar un bien por ID
  const handleDeleteBien = (idBien) => {
    // En este punto, puedes agregar la lógica para eliminar el bien si lo deseas
    console.log(`Eliminar bien con ID ${idBien}`);
  };

  return (
    <Layout>
      <div className='bookTableHeader'>
        <div className='title'>
          <h1>Bienes en Mantenimiento</h1>
        </div>
        <div className='btnAddBook'>
        <Link to={"/sistema/registrar-asignacion"}>
         <button className='btn btn-primary'>Registrar mantenimiento</button>
        </Link>
        
       </div>
      </div>
      <div style={{ height: 480, width: '100%' }}>
        <DataGrid
          rows={bienesMantenimiento}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={(row) => row.id}
        />
      </div>
    </Layout>
  );
};

export default Mantenimiento;
