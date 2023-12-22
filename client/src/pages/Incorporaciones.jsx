const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Incorporaciones = () => {
 
  const [incorporaciones, setIncorporaciones] = useState([]);


  const traerIncorporaciones = async () =>{
    try {
      const {data} = await axios.get(`${apiKey}/api/incorporacion/obtener-incorporaciones`)
      if(data){
        setIncorporaciones(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    traerIncorporaciones()
   
  }, [])
  

  // Define las columnas para la DataGrid
  const columns = [
    { field: 'id_incorporacion', headerName: 'ID', width: 90 },
    { field: 'fecha_incorporacion', headerName: 'Fecha', width: 200 },
    { field: 'nombre_proveedor', headerName: 'Proveedor', width: 180 }, 
    { field: 'cantidad', headerName: 'Cantidad ', width: 140 },
    { field: 'costo', headerName: 'Costo', width: 120 },
    { field: 'codigo_incorporacion', headerName: 'Código', width: 120 },
    { field: 'nombre_completo_usuario', headerName: 'Usuario', width: 140 },
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
              
            >
              Eliminar
            </button>
  
            {/* Botón para ver la categoría (puedes redirigir a una página de detalles) */}
            <Link
              className='btn btn-primary text-white'
              to={`/sistema/incorporacion/${params.row.id_incorporacion}`}
               
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
            <h1>Incorporaciones</h1>
            
        </div>
       <div className='btnAddBook'>
        <Link to={"/sistema/registrar-incorporacion"}>
         <button className='btn btn-primary'>Realizar incorporación</button>
        </Link>
        
       </div>
        
      </div>
      <div style={{ height: 480, width: '100%' }}>
        <DataGrid
          rows={incorporaciones}
          columns={columns} 
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={(row) => row.id_incorporacion}
        />
      </div>
    </Layout>
  );
};

export default Incorporaciones;
