const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Select from 'react-select';

const inicialState = {
    nombre: "", 
    descripcion: "",
    categoria: ""
  }
const Asignacion = () => {
    const params = useParams();

    const [formData, setFormData] = useState(inicialState )   
   
     
      const traerIncorporacion = async(e) =>{ 
        try {
       
        const {data} = await axios.get(`${apiKey}/api/incorporacion/obtener-incorporacion/${params.codigo}`) 
         if(data){
            console.log(data)
        
      }
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => { 
        traerIncorporacion()
    }, [])
    
 

  return (
    <Layout  >  
    <h2 className='m-4 pl-4  '>Detalles Asignación</h2>
    <div className="card">
      <div className="card-body">
        <div className="container mb-5 mt-3">
          <div className="row d-flex align-items-baseline">
            <div className="col-xl-9">
              <p style={{ color: '#7e8d9f', fontSize: '20px' }}>ASIGNACIÓN    <strong>ID: #123-123</strong></p>
            </div>
            <div className="col-xl-3 float-end">
              <a className="btn btn-light text-capitalize border-0" data-mdb-ripple-color="dark">
                <i className="fas fa-print text-primary"></i> Imprimir
              </a>
              
            </div>
            <hr />
          </div>

          <div className="container">
            <div className="col-md-12">
              <div className="text-center">
                <i className="fab fa-mdb fa-4x ms-0" style={{ color: '#5d9fc5' }}></i>
                <p className="pt-0">UPTNMLS</p>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-8">
                <ul className="list-unstyled">
                  <li className="text-muted">Encargado: <span style={{ color: '#5d9fc5' }}>Argenis Centeno</span></li>
                  <li className="text-muted">Departamento: </li>
                  <li className="text-muted">Punta de Mata</li>
                  <li className="text-muted">Estado Monagas</li>
                  <li className="text-muted"><i className="fas fa-phone"></i> República Bolivariana de Venezuela</li>
                </ul>
              </div>
              <div className="col-xl-4">
                <p className="text-muted">Invoice</p>
                <ul className="list-unstyled">
                  <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span className="fw-bold">CÓDIGO:</span>#123-456</li>
                  <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span className="fw-bold">Fecha Asignación: </span>Jun 23,2021</li>
                  <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span className="me-1 fw-bold">Estado:</span><span className="badge bg-warning text-black fw-bold">En proceso</span></li>
                </ul>
              </div>
            </div>

            <div className="row my-2 mx-1 justify-content-center">
              <table className="table table-striped table-borderless">
                <thead style={{ backgroundColor: '#84B0CA' }} className="text-white">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Bien</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Código</th>
                    <th scope="col">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Pro Package</td>
                    <td>4</td>
                    <td>$200</td>
                    <td>$800</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Web hosting</td>
                    <td>1</td>
                    <td>$10</td>
                    <td>$10</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Consulting</td>
                    <td>1 year</td>
                    <td>$300</td>
                    <td>$300</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-xl-8">
                <p className="ms-3">Bienes asignados</p>
              </div>
              <div className="col-xl-3">
                <ul className="list-unstyled">
                   <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Cantidad de Bienes</span>$111</li>
                </ul>
                <p className="text-black float-start"><span className="text-black me-3">Costo de Asignación</span><span style={{ fontSize: '25px' }}>0</span></p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-xl-10">
                <p>DEPARTAMENTO DE BIENES PÚBLICOS</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Asignacion