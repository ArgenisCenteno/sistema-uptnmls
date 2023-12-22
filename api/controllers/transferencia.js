import { db } from "../conexion.js";
export const crearTransferencia = async (req, res) => {
  try {
    const { transferencia, bienes } = req.body;
    console.log(transferencia)

    const anioActual = new Date().getFullYear(); 
        anioActual.toString()
    
        // Consultar el número de secuencia actual para este año
        const r = `SELECT MAX(CAST(SUBSTRING(codigo, 5) AS UNSIGNED)) as ultimoNumero
            FROM transferencia
            WHERE SUBSTRING(codigo, 1, 4) = ?`;

         await db.query(r, [anioActual], (err, data) =>{
          console.log(data[0].ultimoNumero)
          const ultimoNumero = data[0].ultimoNumero || 0; 
          const nuevoNumero = ultimoNumero + 1;  
          const codigo_asignacion = anioActual.toString() + String(nuevoNumero).padStart(2, '0');



          const q = `INSERT INTO transferencia (departamento_origen_id, departamento_destino_id, fecha_transferencia, id_usuario, motivo, codigo, estado) VALUES (?, ?, ?, ?, ?, ?, ?)`;

          // Registra la asignación en la tabla 'asignacion'
           db.query(q, [transferencia.departamento_origen_id, transferencia.departamento_destino_id, transferencia.fecha_transferecia, transferencia.usuario_id, transferencia.motivo, codigo_asignacion,   'En proceso'], (err, data) => {
            console.log(err)
            if (err) return res.status(500).json(err);
            
            const id_transferencia = data.insertId;
      
            // Actualiza el id_incorporacion en el objeto bienes
            const bienesConId = bienes.map((bien) => ({
              ...bien,
              id_transferencia,
            }));
      
            // Registra los bienes asignados en la tabla 'bienes_asignados'
            const q2 = `INSERT INTO bienes_transferidos (id_ejemplar_bien, id_transferencia) VALUES ?`;
      
            // Construye un array de arrays para la inserción múltiple
            const bienesValues = bienesConId.map((bien) => [bien.id_ejemplar_bien, bien.id_transferencia]);
      
            db.query(q2, [bienesValues], (err2, data2) => {
              if (err2) return res.status(500).json(err2);
        
              const q3 = "UPDATE ejemplar_bien SET estado = 'Asignado', ubicacion = ? WHERE id_variacion = ?";
      const params = bienes.flatMap(bien => [bien.ubicacion, bien.id_ejemplar_bien]);
      
      db.query(q3, params, (err3, data3) => {
        if (err3) return res.status(500).json(err3);
  
        res.status(200).json('Asignación registrada exitosamente.');
      });
         
 });
     });
         })

        
  } catch (error) {
    console.error('Error al registrar la asignación:', error);
    res.status(500).json({ error: 'Error al registrar la asignación.' });
  }
};



  export const actualizarAsignacion = async (req, res) => {
    const { id_asignacion, bien_id, departamento_id, fecha_asignacion, usuario_id, estado } = req.body;
    try {
      const consulta = "UPDATE asignacion SET bien_id = ?, departamento_id = ?, fecha_asignacion = ?, usuario_id = ?, estado = ? WHERE id_asignacion = ?";
      const valores = [bien_id, departamento_id, fecha_asignacion, usuario_id, estado, id_asignacion];
      db.query(consulta, valores, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Asignación actualizada correctamente");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  };

  export const obtenerTransferencias = async (req, res) => {
    try {
      const consulta =  `SELECT
      t.id_transferencia,
      t.fecha_transferencia,
      t.motivo,
      t.codigo,
      t.estado,
      d1.nombre AS nombre_origen,
      d2.nombre AS nombre_destino,
      CONCAT(u.nombre, ' ', u.apellido) AS nombre_usuario
  FROM
      transferencia t
  JOIN
      departamento d1 ON t.departamento_origen_id = d1.id_departamento
  JOIN
      departamento d2 ON t.departamento_destino_id = d2.id_departamento
  JOIN
      usuario u ON t.id_usuario = u.id_usuario;
  `;
      db.query(consulta, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  };

  export const obtenerAsignacionPorId = async (req, res) => {
    const { id } = req.params;
    try {
      const consulta = "SELECT * FROM asignacion WHERE id_asignacion = ?";
      db.query(consulta, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Asignación no encontrada");
        return res.status(200).json(data[0]);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  };

  export const eliminarAsignacionPorId = async (req, res) => {
    const { id  } = req.params;
    try {
      const consulta = "DELETE FROM asignacion WHERE id_asignacion = ?";
      db.query(consulta, [id ], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Asignación eliminada correctamente");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  };

  export const obtenerAsignacionesPorRangoDeFecha = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
    try {
      const consulta = "SELECT * FROM asignacion WHERE fecha_asignacion BETWEEN ? AND ?";
      db.query(consulta, [fechaInicio, fechaFin], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  };