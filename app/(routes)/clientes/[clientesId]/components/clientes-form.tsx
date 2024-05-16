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
  cli_ID: z.string().min(1).max(10, { message: "La cédula debe tener 10 digitos." }),
  cli_NOMBRE: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  cli_APELLIDO: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  cli_PAIS: z.string().min(1, { message: "Debe ingresar al menos 1 caracter." }),
  cli_EMAIL: z.string().email({ message: "Debe ingresar un correo electrónico válido." }),
  cli_ESTADO: z.boolean(),
});

type ClientesFormValues = z.infer<typeof formSchema>;

interface ClientesFormProps {
}

export const ClientesForm: React.FC<ClientesFormProps> = ({ }) => {
  const params = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar Cliente" : "Crear Cliente";
  const description = initialData ? "Editar un Cliente." : "Añadir un nuevo Cliente.";
  const toastMessage = initialData ? "Cliente actualizado" : "Cliente creado";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<ClientesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? undefined : {
      cli_ID: "",
      cli_NOMBRE: "",
      cli_APELLIDO: "",
      cli_PAIS: "",
      cli_EMAIL: "",
      cli_ESTADO: true,
    },
  });

  useEffect(() => {
    const fetchClienteData = async (clienteId: string) => {
      try {
        const clienteData = await axios.get(`http://localhost:4000/cliente/${clienteId}`);
        form.reset(clienteData.data); // Restablecer el formulario con los datos del cliente obtenidos
      } catch (error) {
        console.error("Error fetching cliente data:", error);
      }
    };

    if (typeof params.clientesId === 'string' && params.clientesId !== '0') {
      // Si no hay datos iniciales pero hay un ID de cliente en los parámetros de la URL, lo usamos para buscar los datos del cliente
      fetchClienteData(params.clientesId);
      setInitialData(true);
    }
  }, [params.clientesId, form]);


  const onSubmit = async (data: ClientesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`http://localhost:4000/cliente/${params.clientesId}`, data);
      } else {
        await axios.post(`http://localhost:4000/cliente`, data);
      }
      router.refresh();
      router.push(`/../clientes`);
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
      await axios.delete(`http://localhost:4000/cliente/${params.clientesId}`);
      router.refresh();
      router.push(`/clientes`);
      router.refresh();
      toast.success("Cliente borrado");
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
            name="cli_ID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cédula*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Cedula" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cli_NOMBRE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cli_APELLIDO"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cli_PAIS"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País*</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="País" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cli_EMAIL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico*</FormLabel>
                <FormControl>
                <Input disabled={loading} placeholder="Correo Electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cli_ESTADO"
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
          <Button className="ml-5" onClick={() => router.push("/clientes")} type="reset">
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
