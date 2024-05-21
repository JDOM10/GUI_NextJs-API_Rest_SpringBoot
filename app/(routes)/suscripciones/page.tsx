"use client";

import { useEffect, useState } from "react";
import { SuscripcionesClient } from "./components/client"; // Importa el componente SuscripcionesClient
import { SuscripcionesColumn } from "./components/columns"; // Importa la interfaz SuscripcionesColumn
import axios from "axios";

const SuscripcionPage = () => {
  const [suscripciones, setSuscripciones] = useState<SuscripcionesColumn[]>([]); // Estado para almacenar los suscripciones

  useEffect(() => {
    const obtenerSuscripciones = async () => {
      try {
        const suscripcionesData = await axios.get('http://localhost:4000/suscripcion');// Obtiene los suscripciones de la API
        setSuscripciones(suscripcionesData.data); // Actualiza el estado con los suscripciones obtenidos
      } catch (error) {
        console.error("Error al obtener suscripciones:", error);
      }
    };

    obtenerSuscripciones(); // Llama a la función para obtener suscripciones cuando el componente se monta
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SuscripcionesClient data={suscripciones} /> {/* Pasa los suscripciones al componente SuscripcionesClient */}
      </div>
    </div>
  );
};

export default SuscripcionPage;
