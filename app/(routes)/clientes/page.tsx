"use client";

import { useEffect, useState } from "react";
import { fetchClientes } from "@/lib/cliente/route"; // Importa la función fetchClientes desde tu servicio cliente
import { ClientesClient } from "./components/client"; // Importa el componente ClientesClient
import { ClientesColumn } from "./components/columns"; // Importa la interfaz ClientesColumn

const ClientePage = () => {
  const [clientes, setClientes] = useState<ClientesColumn[]>([]); // Estado para almacenar los clientes

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const clientesData = await fetchClientes(); // Obtiene los clientes de la API
        setClientes(clientesData); // Actualiza el estado con los clientes obtenidos
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };

    obtenerClientes(); // Llama a la función para obtener clientes cuando el componente se monta
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientesClient data={clientes} /> {/* Pasa los clientes al componente ClientesClient */}
      </div>
    </div>
  );
};

export default ClientePage;
