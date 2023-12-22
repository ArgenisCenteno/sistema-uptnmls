import React from 'react'
import "../style/TopBox.scss"

const TopBox = () => {

    const bienes = [
        {
          id_bien: 1,
          nombre: "Laptop",
          descripcion: "Portátil HP de 15 pulgadas",
          categoria: "Electrónica",
          precio: 799.99,
          cantidad_disponible: 10,
        },
        {
          id_bien: 2,
          nombre: "Teléfono móvil",
          descripcion: "iPhone 13 Pro",
          categoria: "Electrónica",
          precio: 1099.99,
          cantidad_disponible: 5,
        },
        {
          id_bien: 3,
          nombre: "Bicicleta",
          descripcion: "Bicicleta de montaña Trek",
          categoria: "Deportes",
          precio: 499.99,
          cantidad_disponible: 8,
        },
        {
          id_bien: 4,
          nombre: "Libro",
          descripcion: "Libro de ciencia ficción: Dune",
          categoria: "Libros",
          precio: 19.99,
          cantidad_disponible: 20,
        },
        {
          id_bien: 5,
          nombre: "Laptop",
          descripcion: "Portátil HP de 15 pulgadas",
          categoria: "Electrónica",
          precio: 799.99,
          cantidad_disponible: 10,
        },
        {
          id_bien: 6,
          nombre: "Teléfono móvil",
          descripcion: "iPhone 13 Pro",
          categoria: "Electrónica",
          precio: 1099.99,
          cantidad_disponible: 5,
        },
        {
          id_bien: 7,
          nombre: "Bicicleta",
          descripcion: "Bicicleta de montaña Trek",
          categoria: "Deportes",
          precio: 499.99,
          cantidad_disponible: 8,
        },
        {
          id_bien: 8,
          nombre: "Libro",
          descripcion: "Libro de ciencia ficción: Dune",
          categoria: "Libros",
          precio: 19.99,
          cantidad_disponible: 20,
        },
      ];
      

  return (
    <div className="topBox">
      <h1>Ultimos bienes registrados</h1>
      <div className="list">
        {bienes.map(bien=>(
          <div className="listItem" key={bien.id_bien}>
            <div className="user">
             
              <div className="userTexts">
                <span className="username">{bien.nombre}</span>
                
              </div>
            </div>
            <span className="amount">{bien.categoria}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox