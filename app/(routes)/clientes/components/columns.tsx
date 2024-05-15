import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ClientesColumn = {
    cli_ID: string;
    cli_NOMBRE: string;
    cli_APELLIDO: string;
    cli_PAIS: string;
    cli_EMAIL: string;
    cli_ESTADO: boolean;
}

export const columns: ColumnDef<ClientesColumn>[] = [
    {
        accessorKey: "cli_ID",
        header: "ID",
    },
    {
        accessorKey: "cli_NOMBRE",
        header: "Nombre",
    },
    {
        accessorKey: "cli_APELLIDO",
        header: "Apellido",
    },
    {
        accessorKey: "cli_PAIS",
        header: "País",
    },
    {
        accessorKey: "cli_EMAIL",
        header: "Email",
    },
    {
        accessorKey: "cli_ESTADO",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.cli_ESTADO ? 'text-green-500' : 'text-red-500'}>
                {row.original.cli_ESTADO ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
