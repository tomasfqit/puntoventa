import { FormInput } from "@/components/ui/app-components/FormInput";
import { FormSelect } from "@/components/ui/app-components/FormSelect";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { Bodega } from "@/interfaces/Table";
import { useAlmacenList } from "@/services/almacen/useMarcaList";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formBodegaSchema } from "./schemaFormBodega";

interface FormBodegaProps {
  initialData?: Bodega;
}

export function FormBodega({ initialData }: FormBodegaProps) {
  const { closeModal } = useModal();
  const { data: almacenes } = useAlmacenList();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<Bodega>({
    resolver: zodResolver(formBodegaSchema),
    defaultValues: {
      id: initialData?.id || 0,
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
    if (initialData) {
      // updateProducto(
      //   { producto: data, id: initialData.id },
      //   {
      //     onSuccess: () => {
      //       toast.success("Producto actualizado con exito");
      //       closeModal();
      //     },
      //   }
      // );
    } else {
      // createProducto(data, {
      //   onSuccess: () => {
      //     toast.success("Producto creado con exito");
      //     closeModal();
      //   },
      // });
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
        options={(almacenes || [])?.map((almacen) => ({
          label: almacen.nombre,
          value: almacen.id,
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
