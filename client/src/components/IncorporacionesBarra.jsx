import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const incorporacionesData = [
  { mes: "Enero", cantidad: 15 },
  { mes: "Febrero", cantidad: 20 },
  { mes: "Marzo", cantidad: 25 },
  { mes: "Abril", cantidad: 18 },
  { mes: "Mayo", cantidad: 22 },
  { mes: "Junio", cantidad: 28 },
  { mes: "Julio", cantidad: 30 },
  { mes: "Agosto", cantidad: 24 },
  { mes: "Septiembre", cantidad: 32 },
  { mes: "Octubre", cantidad: 27 },
  { mes: "Noviembre", cantidad: 19 },
  { mes: "Diciembre", cantidad: 15 },
];

const IncorporacionesBarra = () => {
  return (
    <div className="barChartBox">
      <h1>Incorporaciones Mensuales</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300} >
          <BarChart data={incorporacionesData}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncorporacionesBarra;
