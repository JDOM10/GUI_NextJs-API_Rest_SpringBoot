import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ClientesColumn = {
    CLI_ID: string;
    CLI_NOMBRE: string;
    CLI_APELLIDO: string;
    CLI_PAIS: string;
    CLI_EMAIL: string;
    CLI_ESTADO: boolean;
}

export const columns: ColumnDef<ClientesColumn>[] = [
    {
        accessorKey: "CLI_ID",
        header: "Cédula",
    },
    {
        accessorKey: "CLI_NOMBRE",
        header: "Nombre",
    },
    {
        accessorKey: "CLI_APELLIDO",
        header: "Apellido",
    },
    {
        accessorKey: "CLI_PAIS",
        header: "País",
    },
    {
        accessorKey: "CLI_EMAIL",
        header: "Email",
    },
    {
        accessorKey: "CLI_ESTADO",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.CLI_ESTADO ? 'text-green-500' : 'text-red-500'}>
                {row.original.CLI_ESTADO ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
