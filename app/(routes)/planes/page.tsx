"use client";

import { useEffect, useState } from "react";
import { PlanesClient } from "../planes/components/client"; // Importa el componente PlanesClient
import { PlanesColumn } from "../planes/components/columns"; // Importa la interfaz PlanesColumn
import axios from "axios";

const PlanPage = () => {
  const [planes, setPlanes] = useState<PlanesColumn[]>([]); // Estado para almacenar los planes

  useEffect(() => {
    const obtenerPlanes = async () => {
      try {
        const planesData = await axios.get('http://localhost:4000/plan');// Obtiene los planes de la API
        setPlanes(planesData.data); // Actualiza el estado con los planes obtenidos
      } catch (error) {
        console.error("Error al obtener planes:", error);
      }
    };

    obtenerPlanes(); // Llama a la función para obtener planes cuando el componente se monta
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlanesClient data={planes} /> {/* Pasa los planes al componente PlanesClient */}
      </div>
    </div>
  );
};

export default PlanPage;
