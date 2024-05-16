"use client";

import { ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, ClientesColumn } from "./columns";

interface ClientesClientProps {
  data: ClientesColumn[];
}

export const ClientesClient: React.FC<ClientesClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Clientes`} description="Administrar Clientes" />
        <Button onClick={() => router.push(`clientes/0`)}>
          <Plus className="mr-2 h-4 w-4"/>
          Añadir</Button>
      </div>
      <Separator />
      <Button onClick={() => router.push('/')}>
          <ArrowBigLeft className="mr-2 h-6 w-6"/>
          Regresar
      </Button>
      <DataTable searchKeys={["cli_ID"]} columns={columns} data={data} />
    </>
  );
};