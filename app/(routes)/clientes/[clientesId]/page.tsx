"use client";

import { ClientesForm } from "@/app/(routes)/clientes/[clientesId]/components/clientes-form";


const ClientesPageAdd = ({ 

}) => {

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientesForm /> {}
      </div>
    </div>
  );
};

export default ClientesPageAdd;
