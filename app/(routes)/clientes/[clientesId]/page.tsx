"use client";

import { useEffect, useState } from "react";
import { ClientesForm } from "@/app/(routes)/clientes/[clientesId]/components/clientes-form";
import { fetchClientesbyID } from "@/lib/cliente/[clienteId]/route"; // Importa la función fetchClientesbyID desde tu servicio cliente

const ClientesPageAdd = ({ 
  params 
}: { 
  params: { ClientesId: string } 
}) => {

  const [clientes, setClientes] = useState<any>(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const clienteId = String(params.ClientesId); // Convert clienteId to string
        // Obtiene los datos del cliente utilizando la función fetchClienteById
        const clienteData = await fetchClientesbyID({ params: { clienteId } }); // Pass clienteId as a string
        setClientes(clienteData); // Actualiza el estado con los datos del cliente obtenidos
      } catch (error) {
        console.error("Error al obtener datos del cliente:", error);
      }
    };

    obtenerCliente(); // Llama a la función para obtener datos del cliente cuando el componente se monta
  }, [params.ClientesId]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientesForm initialData={clientes} />
      </div>
    </div>
  );
};

export default ClientesPageAdd;
