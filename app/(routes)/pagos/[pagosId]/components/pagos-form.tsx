import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  CLI_ID: z.string().min(1, { message: "Selecciona una cédula." }),
  PAGO_ID: z.optional(z.coerce.number()),
  PAGO_TIPO: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  PAGO_COD: z.string().optional(),
  PAGO_MONTO: z.optional(z.coerce.number().min(0, { message: "Debe ingresar un valor válido."}).
  int({ message: "Debe ingresar un número entero."}),),
  PAGO_FECHA: z.string().optional(),
  PAGO_PENDIENTE: z.string().optional(),
  PAGO_ESTADO: z.boolean(),
});

type Cliente = {
  CLI_ID: string;
  CLI_NOMBRE: string;
};

type PagosFormValues = z.infer<typeof formSchema>;

interface PagosFormProps {
}

export const PagosForm: React.FC<PagosFormProps> = ({ }) => {
  const params = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const title = initialData ? "Editar Pago" : "Crear Pago";
  const description = initialData ? "Editar un Pago." : "Añadir un nuevo Pago.";
  const toastMessage = initialData ? "Pago actualizado" : "Pago creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<PagosFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? undefined : {
      CLI_ID: "",
      PAGO_TIPO: "",
      PAGO_ID: 0,
      PAGO_MONTO: 0,
      PAGO_COD: "",
      PAGO_FECHA: "",
      PAGO_PENDIENTE: "pendiente",
      PAGO_ESTADO: true,
    },
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("https://localhost:5016/api/Cliente/Listar");
        const clientesData = response.data; // Use the 'data' property instead of 'json' method
        setClientes(clientesData.map((cliente: any) => ({
          CLI_ID: cliente.CLI_ID,
          CLI_NOMBRE: cliente.CLI_NOMBRE,
        })));
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchPagoData = async (PAGO_ID: string) => {
      try {
        const pagoData = await axios.get(`https://localhost:5016/api/Pago/leer/${PAGO_ID}`);
        form.reset(pagoData.data); // Restablecer el formulario con los datos del pago obtenidos
      } catch (error) {
        console.error("Error fetching pago data:", error);
      }
    };

    if (typeof params.pagosId === 'string' && params.pagosId !== '0') {
      // Si no hay datos iniciales pero hay un ID de pago en los parámetros de la URL, lo usamos para buscar los datos del pago
      fetchPagoData(params.pagosId);
      setInitialData(true);
    }
  }, [params.pagosId, form]);


  const onSubmit = async (data: PagosFormValues) => {
    try {
      setLoading(true);
      console.log(data);
      if (initialData) {
        await axios.put(`https://localhost:5016/api/Pago/Actualizar/${params.pagosId}`, data);
      } else {
        await axios.post(`https://localhost:5016/api/Pago/Insertar`, data);
      }
      router.refresh();
      router.push(`/../pagos`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Algo estuvo mal.");
    } finally {
      setLoading(false);
    }
  };
  

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.put(`https://localhost:5016/api/Pago/Eliminar/${params.pagosId}`);
      router.refresh();
      router.push(`/pagos`);
      router.refresh();
      toast.success("Pago borrado");
    } catch (error: any) {
      toast.error("Algo salió mal.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-7">
        <FormField
            control={form.control}
            name="CLI_ID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente*</FormLabel>
                <Select
                    disabled={loading}
                    onValueChange={(selectedValue) => {
                      field.onChange(selectedValue, 10);
                    }}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Selecciona un Cliente:" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[200px]">
                      {clientes.map((cliente) => (
                        <SelectItem key={cliente.CLI_ID} value={cliente.CLI_ID}>
                          {cliente.CLI_NOMBRE}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="PAGO_TIPO"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Tipo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="PAGO_MONTO"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto*</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="Monto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="PAGO_ID"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="number" className="hidden" disabled={loading} placeholder="ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="PAGO_ESTADO"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={(selectedValue) => {
                      field.onChange(selectedValue === "true");
                    }}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={String(field.value)} placeholder="Selecciona un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
          <Button className="ml-5" onClick={() => router.push("/pagos")} type="reset">
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
