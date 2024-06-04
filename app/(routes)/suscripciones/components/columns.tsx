import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type SuscripcionesColumn = {
    SUS_ID: number;
    CLI_ID: string;
    TIPOPLAN_ID: string;
    SUS_STARTDATE: string;
    SUS_ENDDATE: string;
    SUS_RENOVACIONAUTO: boolean;
    SUS_ESTADO: boolean;
}

export const columns: ColumnDef<SuscripcionesColumn>[] = [
    {
        accessorKey: "SUS_ID",
        header: "ID",
    },
    {
        accessorKey: "CLI_ID",
        header: "Cliente",
    },
    {
        accessorKey: "TIPOPLAN_ID",
        header: "Plan",
    },
    {
        accessorKey: "SUS_STARTDATE",
        header: "Fecha Inicio",
    },
    {
        accessorKey: "SUS_ENDDATE",
        header: "Fecha Fin",
    },
    {
        accessorKey: "SUS_RENOVACIONAUTO",
        header: "Renovación Automática",
        cell: ({ row }) => (
            <span className={row.original.SUS_RENOVACIONAUTO ? 'text-green-500' : 'text-red-500'}>
                {row.original.SUS_RENOVACIONAUTO ? 'Si' : 'No'}
            </span>
        ),
    },
    {
        accessorKey: "SUS_ESTADO",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.SUS_ESTADO ? 'text-green-500' : 'text-red-500'}>
                {row.original.SUS_ESTADO ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
