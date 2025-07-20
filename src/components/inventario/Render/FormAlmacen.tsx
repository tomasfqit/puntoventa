import { FormInput } from "@/components/ui/app-components/FormInput";
import { Button } from "@/components/ui/button";
import { CustomToastSonner } from "@/helpers/CustomToastSonner";
import { useModal } from "@/hooks/useModal";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Almacen } from "@/interfaces/Table";
import { useAlmacenCreate } from "@/services/almacen/useAlmacenCreate";
import { useAlmacenUpdate } from "@/services/almacen/useAlmacenUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formAlmacenSchema } from "./schemaFormAlmacen";

interface FormAlmacenProps {
  initialData?: Almacen;
}

export function FormAlmacen({ initialData }: FormAlmacenProps) {
  const { closeModal } = useModal();
  const { mutate: updateAlmacen } = useAlmacenUpdate();
  const { mutate: createAlmacen } = useAlmacenCreate();
  const { getParam, clearParams } = useQueryParams();
  const idAlmacen = getParam("almacen_id");

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Almacen>({
    resolver: zodResolver(formAlmacenSchema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      direccion: initialData?.direccion || "",
    },
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [initialData, reset]);

  const handleFormSubmit = async (data: Almacen) => {
    const id = idAlmacen ? Number(idAlmacen) : 0;
    if (id) {
      updateAlmacen(
        { almacen: data, id },
        {
          onSuccess: () => {
            CustomToastSonner.success("Almacen actualizado con exito");
            closeModal();
            clearParams();
          },
        }
      );
    } else {
      createAlmacen(data, {
        onSuccess: () => {
          CustomToastSonner.success("Almacen creado con exito");
          closeModal();
          clearParams();
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <FormInput<Almacen>
        name="nombre"
        label="Nombre *"
        type="text"
        placeholder="Ingrese el nombre"
        control={control}
        toUpperCase
        error={errors.nombre?.message}
      />
      <FormInput<Almacen>
        name="direccion"
        label="Dirección *"
        type="text"
        placeholder="Ingrese la dirección"
        control={control}
        toUpperCase
        error={errors.direccion?.message}
      />

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
