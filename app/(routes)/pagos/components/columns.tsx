import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type PagosColumn = {
    PAGO_ID: number;
    CLI_ID: string;
    PAGO_COD: string;
    PAGO_TIPO: string;
    PAGO_MONTO: number;
    PAGO_FECHA: string;
    PAGO_PENDIENTE: string;
    PAGO_ESTADO: boolean;
}

export const columns: ColumnDef<PagosColumn>[] = [
    {
        accessorKey: "PAGO_ID",
        header: "ID",
    },
    {
        accessorKey: "CLI_ID",
        header: "Cliente",
    },
    {
        accessorKey: "PAGO_COD",
        header: "Código de Pago",
    },
    {
        accessorKey: "PAGO_TIPO",
        header: "Tipo de Pago",
    },
    {
        accessorKey: "PAGO_MONTO",
        header: "Monto",
        cell: ({ row }) => (
            row.original.PAGO_MONTO !== null ? `$${row.original.PAGO_MONTO.toFixed(2)}` : 'N/A'
        ),
    },
    {
        accessorKey: "PAGO_FECHA",
        header: "Fecha de Pago",
    },
    {
        accessorKey: "PAGO_PENDIENTE",
        header: "Pendiente",
    },
    {
        accessorKey: "PAGO_ESTADO",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.PAGO_ESTADO ? 'text-green-500' : 'text-red-500'}>
                {row.original.PAGO_ESTADO ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
