import { FormInput } from "@/components/ui/app-components/FormInput";
import { FormSelect } from "@/components/ui/app-components/FormSelect";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Bodega } from "@/interfaces/Table";
import { useAlmacenList } from "@/services/almacen/useAlmacenList";
import { useBodegaCreate } from "@/services/bodegas/useBodegasCreate";
import { useBodegaUpdate } from "@/services/bodegas/useBodegasUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { formBodegaSchema } from "./schemaFormBodega";

interface FormBodegaProps {
  initialData?: Bodega;
}

export function FormBodega({ initialData }: FormBodegaProps) {
  const { closeModal } = useModal();
  const { data: almacenes } = useAlmacenList();
  const { mutate: updateBodega } = useBodegaUpdate();
  const { mutate: createBodega } = useBodegaCreate();
  const { getParam, clearParams } = useQueryParams();
  const idBodega = getParam("bodega_id");

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Bodega>({
    resolver: zodResolver(formBodegaSchema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      almacen_id: initialData?.almacen_id || 0,
    },
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [initialData, reset]);

  const handleFormSubmit = async (data: Bodega) => {
    const id = idBodega ? Number(idBodega) : 0;
    if (id) {
      updateBodega(
        { bodega: data, id },
        {
          onSuccess: () => {
            toast.success("Bodega actualizada con exito");
            closeModal();
            clearParams();
          },
        }
      );
    } else {
      createBodega(data, {
        onSuccess: () => {
          toast.success("Bodega creada con exito");
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
      <FormInput<Bodega>
        name="nombre"
        label="Nombre *"
        type="text"
        placeholder="Ingrese el nombre"
        control={control}
        toUpperCase
        error={errors.nombre?.message}
      />
      <FormSelect<Bodega>
        name="almacen_id"
        label="Almacen *"
        control={control}
        options={(almacenes || []).map((almacen) => ({
          label: almacen.nombre,
          value: almacen.id || 0,
        }))}
        placeholder="Seleccionar almacen"
        error={errors.almacen_id?.message}
      />
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
