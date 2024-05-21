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
  cliente: z.string().min(1, { message: "Selecciona una cédula." }),
  tipoplan: z.string().min(1, { message: "Selecciona una cédula." }),
  susStartDate: z.string().optional(),
  susEndDate: z.string().optional(),
  susRenovacionAuto: z.boolean(),
  susEstado: z.boolean(),
});

type Cliente = {
  cli_ID: string;
  cli_NOMBRE: string;
};

type Plan = {
  tipoplanId: number;
  tipoplanNombre: string;
};

type SuscripcionesFormValues = z.infer<typeof formSchema>;

interface SuscripcionesFormProps {}

export const SuscripcionesForm: React.FC<SuscripcionesFormProps> = ({}) => {
  const params = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [planes, setPlanes] = useState<Plan[]>([]);

  const title = initialData ? "Editar Suscripcion" : "Crear Suscripcion";
  const description = initialData
    ? "Editar una Suscripcion."
    : "Añadir una nueva Suscripcion.";
  const toastMessage = initialData
    ? "Suscripcion actualizada"
    : "Suscripcion creada";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<SuscripcionesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? undefined
      : {
          cliente: "",
          tipoplan: "0",
          susStartDate: "",
          susEndDate: "",
          susEstado: true,
          susRenovacionAuto: true,
        },
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/cliente");
        const clientesData = response.data; // Use the 'data' property instead of 'json' method

        setClientes(
          clientesData.map((cliente: any) => ({
            cli_ID: cliente.cli_ID,
            cli_NOMBRE: cliente.cli_NOMBRE,
          }))
        );
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/plan");
        const planesData = response.data; // Use the 'data' property instead of 'json' method
        setPlanes(
          planesData.map((plan: any) => ({
            tipoplanId: plan.tipoplanId,
            tipoplanNombre: plan.tipoplanNombre,
          }))
        );
      } catch (error) {
        console.error("Error fetching planes:", error);
      }
    };

    fetchPlanes();
  }, []);

  const [loadingSuscripcion, setLoadingSuscripcion] = useState(true);

  useEffect(() => {
    const fetchSuscripcionData = async (suscripcionId: string) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/suscripcion/${suscripcionId}`
        );
        const suscripcionData = response.data;
        form.reset({
          ...suscripcionData,
          tipoplan: String(suscripcionData.tipoplan), // Asegúrate de que se establece correctamente
        });
        setLoadingSuscripcion(false); // Datos cargados correctamente
        setInitialData(true);
      } catch (error) {
        console.error("Error fetching suscripcion data:", error);
      }
    };

    if (
      typeof params.suscripcionesId === "string" &&
      params.suscripcionesId !== "0"
    ) {
      fetchSuscripcionData(params.suscripcionesId);
    } else {
      setLoadingSuscripcion(false); // No hay datos para cargar
    }
  }, [params.suscripcionesId, form]);

  if (loadingSuscripcion) {
    return <p>Cargando datos...</p>; // O cualquier spinner o indicador de carga
  }

  const onSubmit = async (data: SuscripcionesFormValues) => {
    try {
      setLoading(true);
      const formattedData = {
        ...data,
        tipoplan: parseInt(data.tipoplan, 10), // Convert tipoplan to a number
      };

      if (initialData) {
        await axios.put(
          `http://localhost:4000/suscripcion/${params.suscripcionesId}`,
          formattedData
        );
      } else {
        await axios.post(`http://localhost:4000/suscripcion`, formattedData);
      }

      router.refresh();
      router.push(`/../suscripciones`);
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
      await axios.delete(
        `http://localhost:4000/suscripcion/${params.suscripcionesId}`
      );
      router.refresh();
      router.push(`/suscripciones`);
      router.refresh();
      toast.success("Suscripcion borrado");
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-7"
        >
          <FormField
            control={form.control}
            name="cliente"
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
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Selecciona un Cliente:"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-[200px]">
                    {clientes.map((cliente) => (
                      <SelectItem key={cliente.cli_ID} value={cliente.cli_ID}>
                        {cliente.cli_NOMBRE}
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
            name="tipoplan"
            render={({ field }) => {
              // Verifica el valor actual de field.value
              const selectedPlan = planes.find(
                (plan) => plan.tipoplanId === parseInt(field.value, 10)
              );
              return (
                <FormItem>
                  <FormLabel>Plan*</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={(selectedValue) => {
                      field.onChange(selectedValue); // Convierte a número y almacena
                    }}
                    value={String(field.value)} // Asegúrate de que sea una cadena
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>
                          {selectedPlan
                            ? selectedPlan.tipoplanNombre
                            : "Selecciona un Plan:"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[200px]">
                      {planes.map((plan) => (
                        <SelectItem
                          key={String(plan.tipoplanId)}
                          value={String(plan.tipoplanId)}
                        >
                          {plan.tipoplanNombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="susRenovacionAuto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Renovación Automática</FormLabel>
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
                        <SelectValue
                          defaultValue={String(field.value)}
                          placeholder="Selecciona una opción:"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Si</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="susEstado"
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
                        <SelectValue
                          defaultValue={String(field.value)}
                          placeholder="Selecciona un estado"
                        />
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
          <Button
            className="ml-5"
            onClick={() => router.push("/suscripciones")}
            type="reset"
          >
            Cancelar
          </Button>
        </form>
      </Form>
    </>
  );
};
