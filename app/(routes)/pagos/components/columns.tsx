import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type PagosColumn = {
    pagoId: number;
    cliente: string;
    pagoCod: string;
    pagoTipo: string;
    pagoMonto: number;
    pagoFecha: string;
    pagoPendiente: string;
    pagoEstado: boolean;
}

export const columns: ColumnDef<PagosColumn>[] = [
    {
        accessorKey: "pagoId",
        header: "ID",
    },
    {
        accessorKey: "cliente",
        header: "Cliente",
    },
    {
        accessorKey: "pagoCod",
        header: "Código de Pago",
    },
    {
        accessorKey: "pagoTipo",
        header: "Tipo de Pago",
    },
    {
        accessorKey: "pagoMonto",
        header: "Monto",
        cell: ({ row }) => (
            row.original.pagoMonto !== null ? `$${row.original.pagoMonto.toFixed(2)}` : 'N/A'
        ),
    },
    {
        accessorKey: "pagoFecha",
        header: "Fecha de Pago",
    },
    {
        accessorKey: "pagoPendiente",
        header: "Pendiente",
    },
    {
        accessorKey: "pagoEstado",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.pagoEstado ? 'text-green-500' : 'text-red-500'}>
                {row.original.pagoEstado ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
