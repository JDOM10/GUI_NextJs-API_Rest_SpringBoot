import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type PlanesColumn = {
    TIPOPLAN_ID: number;
    TIPOPLAN_NOMBRE: string;
    TIPOPLAN_DURACION: string;
    TIPOPLAN_PRECIO: number;
    TIPOPLAN_ESTADO: boolean;
}

export const columns: ColumnDef<PlanesColumn>[] = [
    {
        accessorKey: "TIPOPLAN_ID",
        header: "ID",
    },
    {
        accessorKey: "TIPOPLAN_NOMBRE",
        header: "Nombre",
    },
    {
        accessorKey: "TIPOPLAN_DURACION",
        header: "Duración",
    },
    {
        accessorKey: "TIPOPLAN_PRECIO",
        header: "Email",
    },
    {
        accessorKey: "TIPOPLAN_ESTADO",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.TIPOPLAN_ESTADO ? 'text-green-500' : 'text-red-500'}>
                {row.original.TIPOPLAN_ESTADO ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
