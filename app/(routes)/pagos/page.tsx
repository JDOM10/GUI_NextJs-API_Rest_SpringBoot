"use client";

import { useEffect, useState } from "react";
import { PagosClient } from "./components/client"; // Importa el componente PagosClient
import { PagosColumn } from "./components/columns"; // Importa la interfaz PagosColumn
import axios from "axios";

const PagoPage = () => {
  const [pagos, setPagos] = useState<PagosColumn[]>([]); // Estado para almacenar los pagos

  useEffect(() => {
    const obtenerPagos = async () => {
      try {
        const pagosData = await axios.get('http://localhost:4000/pago');// Obtiene los pagos de la API
        setPagos(pagosData.data); // Actualiza el estado con los pagos obtenidos
      } catch (error) {
        console.error("Error al obtener pagos:", error);
      }
    };

    obtenerPagos(); // Llama a la función para obtener pagos cuando el componente se monta
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PagosClient data={pagos} /> {/* Pasa los pagos al componente PagosClient */}
      </div>
    </div>
  );
};

export default PagoPage;
