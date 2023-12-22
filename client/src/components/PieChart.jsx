import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import "../style/PieChart.scss"

const productosData = [
  { producto: "Laptop", existencia: 50 },
  { producto: "Teléfono móvil", existencia: 35 },
  { producto: "Tablet", existencia: 60 },
  { producto: "Impresora", existencia: 25 },
  { producto: "Monitor", existencia: 40 },
];

const PieChartBox = () => {
  const sortedProductos = productosData.sort((a, b) => b.existencia - a.existencia);
  const top5Productos = sortedProductos.slice(0, 5);
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe"];

  return (
    <div className="pieChartBox">
      <h1 className="pieChartTitle">Bienes con más stock</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              cursor={{ fill: "#none" }}
            />
            <Pie
              data={top5Productos}
              dataKey="existencia"  
              nameKey="producto"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {top5Productos.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartBox;
