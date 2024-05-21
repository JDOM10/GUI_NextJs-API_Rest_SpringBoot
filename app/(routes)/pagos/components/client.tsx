"use client";

import { ArrowBigLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, PagosColumn } from "./columns";

interface PagosClientProps {
  data: PagosColumn[];
}

export const PagosClient: React.FC<PagosClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Pagos`} description="Administrar Pagos" />
        <Button onClick={() => router.push(`pagos/0`)}>
          <Plus className="mr-2 h-4 w-4"/>
          Añadir</Button>
      </div>
      <Separator />
      <Button onClick={() => router.push('/')}>
          <ArrowBigLeft className="mr-2 h-6 w-6"/>
          Regresar
      </Button>
      <DataTable searchKeys={["cliente", "pagoCod"]} columns={columns} data={data} />
    </>
  );
};