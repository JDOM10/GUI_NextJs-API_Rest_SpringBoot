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
  SUS_ID: z.optional(z.coerce.number()),
  TIPOPLAN_ID: z.string().min(1, { message: "Selecciona una cédula." }),
  SUS_STARTDATE: z.string().optional(),
  SUS_ENDDATE: z.string().optional(),
  SUS_RENOVACIONAUTO: z.boolean(),
  SUS_ESTADO: z.boolean(),
});

type Cliente = {
  CLI_ID: string;
  CLI_NOMBRE: string;
};

type Plan = {
  TIPOPLAN_ID: number;
  TIPOPLAN_NOMBRE: string;
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
          CLI_ID: "",
          SUS_ID: 0,
          TIPOPLAN_ID: "0",
          SUS_STARTDATE: "",
          SUS_ENDDATE: "",
          SUS_ESTADO: true,
          SUS_RENOVACIONAUTO: true,
        },
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("https://localhost:5016/api/Cliente/Listar");
        const clientesData = response.data; // Use the 'data' property instead of 'json' method

        setClientes(
          clientesData.map((cliente: any) => ({
            CLI_ID: cliente.CLI_ID,
            CLI_NOMBRE: cliente.CLI_NOMBRE,
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
        const response = await axios.get("https://localhost:5016/api/TipoPlan/Listar");
        const planesData = response.data; // Use the 'data' property instead of 'json' method
        setPlanes(
          planesData.map((plan: any) => ({
            TIPOPLAN_ID: plan.TIPOPLAN_ID,
            TIPOPLAN_NOMBRE: plan.TIPOPLAN_NOMBRE,
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
          `https://localhost:5016/api/Suscripcion/leer/${suscripcionId}`
        );
        const suscripcionData = response.data;
        form.reset({
          ...suscripcionData,
          TIPOPLAN_ID: String(suscripcionData.TIPOPLAN_ID), // Asegúrate de que se establece correctamente
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
        TIPOPLAN_ID: parseInt(data.TIPOPLAN_ID, 10), // Convert TIPOPLAN_ID to a number
      };

      if (initialData) {
        await axios.put(
          `https://localhost:5016/api/Suscripcion/Actualizar/${params.suscripcionesId}`,
          formattedData
        );
      } else {
        await axios.post(`https://localhost:5016/api/Suscripcion/Insertar/`, formattedData);
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
      await axios.put(
        `https://localhost:5016/api/Suscripcion/Eliminar/${params.suscripcionesId}`
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
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Selecciona un Cliente:"
                      />
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
            name="TIPOPLAN_ID"
            render={({ field }) => {
              // Verifica el valor actual de field.value
              const selectedPlan = planes.find(
                (plan) => plan.TIPOPLAN_ID === parseInt(field.value, 10)
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
                            ? selectedPlan.TIPOPLAN_NOMBRE
                            : "Selecciona un Plan:"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[200px]">
                      {planes.map((plan) => (
                        <SelectItem
                          key={String(plan.TIPOPLAN_ID)}
                          value={String(plan.TIPOPLAN_ID)}
                        >
                          {plan.TIPOPLAN_NOMBRE}
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
            name="SUS_RENOVACIONAUTO"
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
            name="SUS_ID"
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
            name="SUS_ESTADO"
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
