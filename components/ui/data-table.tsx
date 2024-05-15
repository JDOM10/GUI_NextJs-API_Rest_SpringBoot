"use client"

import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  searchKeys: string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKeys,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentSearchKey, setCurrentSearchKey] = useState<string>(searchKeys[0]);

  const searchKeyAliases: { [key: string]: string } = {
    cli_ID: "Cédula",
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    }
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    table.getColumn(currentSearchKey)?.setFilterValue(value);
  };

  const handleSearchKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    table.getColumn(currentSearchKey)?.setFilterValue("");
    const newSearchKey = event.target.value;
    setCurrentSearchKey(newSearchKey);
    table.getColumn(newSearchKey)?.setFilterValue("");
  };
  
  return (
    <div>
      <div className="flex items-center py-4">
        <label htmlFor="searchKey">Seleccionar Filtro:</label>
        <select
          id="searchKey"
          name="searchKey"
          onChange={handleSearchKeyChange}
          value={currentSearchKey}
        >
          {searchKeys.map((key) => (
            <option key={key} value={key}>
              {searchKeyAliases[key]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Input
          placeholder={`Buscar por ${searchKeyAliases[currentSearchKey]}`}
          value={(table.getColumn(currentSearchKey)?.getFilterValue() as string) ?? ""}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <br></br>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-7">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-8 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
