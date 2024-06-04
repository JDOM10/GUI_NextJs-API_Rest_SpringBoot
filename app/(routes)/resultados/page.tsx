"use client";
// components/Charts.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PageResultados: React.FC = () => {
  const [actividadUsuarios, setactividadUsuarios] = useState<any>(null);
  const [suscripcionesPorPais, setSuscripcionesPorPais] = useState<any>(null);

  useEffect(() => {
    // Fetch Estado Pagos data
    axios.get('https://localhost:5016/api/SP/ListarActividadUsuarios')
      .then(response => {
        const data = response.data;
        const TotalRenovacionTrue	 = data.map((item: any) => item.TotalRenovacionTrue	);
        const TotalRenovacionFalse = data.map((item: any) => item.TotalRenovacionFalse);

        setactividadUsuarios({
          labels: ['Total de Clientes']	,
          datasets: [
            {
              label: 'Sin renovación automática',
              data: TotalRenovacionFalse,
              backgroundColor: 'rgba(52, 137, 235, 0.5)',
              hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Con renovación automática',
              data: TotalRenovacionTrue,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              hoverBackgroundColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching actividad usuariows data:', error));

    // Fetch Morosidad data
    axios.get('https://localhost:5016/api/SP/ListarAudiosEscuchados')
      .then(response => {
        const data = response.data;
        const Pais = data.map((item: any) => item.Pais);
        const Total_Suscripciones = data.map((item: any) => item.Total_Suscripciones);

        setSuscripcionesPorPais({
          labels: Pais,
          datasets: [{
            data: Total_Suscripciones,
            backgroundColor: [
                '#FFC0CB', '#87CEEB', '#FFFF99', '#98FB98', '#FFD700', '#E6E6FA', '#FFDAB9'
            ],
            hoverBackgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F77825', '#9966FF', '#FF9F40'
            ],
            borderWidth: 1
          }]
        });
      })
      .catch(error => console.error('Error fetching morosidad data:', error));
  }, []);

  return (
    <main className="flex-grow mt-5">
      <section className="container mx-auto">
        <h2 className="text-center">Reporte de Estado de de Clientes</h2>
        {actividadUsuarios && (
          <div className="max-w-lg mx-auto">
            <Bar data={actividadUsuarios} />
          </div>
        )}
      </section>
      <section className="container mx-auto mt-5">
        <h2 className="text-center">Reporte de Suscripciones por País</h2>
        {suscripcionesPorPais && (
          <div className="max-w-md mx-auto">
            <Pie data={suscripcionesPorPais} />
          </div>
        )}
      </section>
    </main>
  );
};

export default PageResultados;