import { FormInput } from "@/components/ui/app-components/FormInput";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useQueryParams } from "@/hooks/useQueryParams";
import {
  IPersonaCliente,
  IViewPersonaClienteList,
} from "@/models/IPersonaCliente";
import { useClienteCreate } from "@/services/clientes/useClientesCreate";
import { useClienteUpdate } from "@/services/clientes/useClientesUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { formClienteSchema } from "./schemaFormCliente";

interface FormClienteProps {
  initialData?: IViewPersonaClienteList;
}

export function FormMantCliente({ initialData }: FormClienteProps) {
  const { closeModal } = useModal();
  const { mutate: updateCliente } = useClienteUpdate();
  const { mutate: createCliente } = useClienteCreate();
  const { getParam, clearParams } = useQueryParams();
  const idCliente = getParam("cliente_id");
  const idPersona = getParam("persona_id");

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IPersonaCliente>({
    resolver: zodResolver(formClienteSchema),
    defaultValues: {
      nombres: initialData?.nombres || "",
      apellidos: initialData?.apellidos || "",
      identificacion: initialData?.identificacion || "",
      telefono: initialData?.telefono || "",
      correo: initialData?.correo || "",
      direccion: initialData?.direccion || "",
      cliente: {
        persona_id: initialData?.persona_id || 0,
        tipo_cliente: initialData?.tipo_cliente || "",
      },
    },
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [initialData, reset]);

  const handleFormSubmit = async (data: IPersonaCliente) => {
    const cliente_id = idCliente ? Number(idCliente) : 0;
    const persona_id = idPersona ? Number(idPersona) : 0;
    if (cliente_id > 0 && persona_id > 0) {
      updateCliente(
        {
          clientePersona: data,
          persona_id: persona_id,
          cliente_id: cliente_id,
        },
        {
          onSuccess: () => {
            toast.success("Cliente actualizado con exito");
            closeModal();
            clearParams();
          },
        }
      );
    } else {
      createCliente(data, {
        onSuccess: () => {
          toast.success("Cliente creado con exito");
          closeModal();
          clearParams();
        },
      });
    }
  };

  // Cuando el formulario tiene errores
  const onError: SubmitErrorHandler<FormData> = (errors) => {
    console.log("❌ Errores:", errors);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, onError)}
      className="flex flex-col gap-2 w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <FormInput<IPersonaCliente>
          name="nombres"
          label="Nombres *"
          type="text"
          placeholder="Ingrese los nombres"
          control={control}
          toUpperCase
          error={errors.nombres?.message}
        />
        <FormInput<IPersonaCliente>
          name="apellidos"
          label="Apellidos *"
          type="text"
          placeholder="Ingrese los apellidos"
          control={control}
          toUpperCase
          error={errors.apellidos?.message}
        />
        <FormInput<IPersonaCliente>
          name="identificacion"
          label="Identificación *"
          type="text"
          placeholder="Ingrese la identificación"
          control={control}
          error={errors.identificacion?.message}
        />
        <FormInput<IPersonaCliente>
          name="telefono"
          label="Teléfono"
          type="text"
          placeholder="Ingrese el teléfono"
          control={control}
          error={errors.telefono?.message}
        />
        <FormInput<IPersonaCliente>
          name="correo"
          label="Correo"
          type="text"
          placeholder="Ingrese el correo"
          control={control}
          error={errors.correo?.message}
        />
        <FormInput<IPersonaCliente>
          name="direccion"
          label="Dirección"
          type="text"
          placeholder="Ingrese la dirección"
          control={control}
          error={errors.direccion?.message}
        />
        <FormInput<IPersonaCliente>
          name="cliente.tipo_cliente"
          label="Tipo de Cliente *"
          type="text"
          placeholder="Ingrese el tipo de cliente"
          control={control}
          error={errors.cliente?.tipo_cliente?.message}
        />
      </div>
      {/* Form Actions */}
      <div className="w-full flex justify-end mt-auto pt-4">
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => closeModal()}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </div>
    </form>
  );
}
