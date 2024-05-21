import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type SuscripcionesColumn = {
    susId: number;
    cliente: string;
    tipoplan: string;
    susStartDate: string;
    susEndDate: string;
    susRenovacionAuto: boolean;
    susEstado: boolean;
}

export const columns: ColumnDef<SuscripcionesColumn>[] = [
    {
        accessorKey: "susId",
        header: "ID",
    },
    {
        accessorKey: "cliente",
        header: "Cliente",
    },
    {
        accessorKey: "tipoplan",
        header: "Plan",
    },
    {
        accessorKey: "susStartDate",
        header: "Fecha Inicio",
    },
    {
        accessorKey: "susEndDate",
        header: "Fecha Fin",
    },
    {
        accessorKey: "susRenovacionAuto",
        header: "Renovación Automática",
        cell: ({ row }) => (
            <span className={row.original.susRenovacionAuto ? 'text-green-500' : 'text-red-500'}>
                {row.original.susRenovacionAuto ? 'Si' : 'No'}
            </span>
        ),
    },
    {
        accessorKey: "susEstado",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.susEstado ? 'text-green-500' : 'text-red-500'}>
                {row.original.susEstado ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
