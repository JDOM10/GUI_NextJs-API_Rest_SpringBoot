import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type PlanesColumn = {
    tipoplanId: number;
    tipoplanNombre: string;
    tipoplanDuracion: string;
    tipoplanPrecio: number;
    tipoplanEstado: boolean;
}

export const columns: ColumnDef<PlanesColumn>[] = [
    {
        accessorKey: "tipoplanId",
        header: "ID",
    },
    {
        accessorKey: "tipoplanNombre",
        header: "Nombre",
    },
    {
        accessorKey: "tipoplanDuracion",
        header: "Duración",
    },
    {
        accessorKey: "tipoplanPrecio",
        header: "Email",
    },
    {
        accessorKey: "tipoplanEstado",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.tipoplanEstado ? 'text-green-500' : 'text-red-500'}>
                {row.original.tipoplanEstado ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
