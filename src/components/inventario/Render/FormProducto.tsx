import { FormInput } from "@/components/ui/app-components/FormInput";
import { FormInputNumber } from "@/components/ui/app-components/FormInputNumber";
import { FormSelect } from "@/components/ui/app-components/FormSelect";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { Producto } from "@/interfaces/Table";
import { useCategoriasList } from "@/services/categorias/useCategoriasList";
import { useMarcaList } from "@/services/marca/useMarcaList";
import { useModeloList } from "@/services/modelo/useModeloList";
import { useProductoCreate } from "@/services/productos/useProductoCreate";
import { useProductoUpdate } from "@/services/productos/useProductoUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SFormProductoData, formProductoSchema } from "./schemaFormProducto";

interface FormProductoProps {
  initialData?: Producto;
}

export function FormProducto({ initialData }: FormProductoProps) {
  const { closeModal } = useModal();
  const { data: marcas } = useMarcaList();
  const { data: modelos } = useModeloList();
  const { data: categorias } = useCategoriasList();
  const { mutate: createProducto, isPending } = useProductoCreate();
  const { mutate: updateProducto, isPending: isPendingUpdate } =
    useProductoUpdate();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<SFormProductoData>({
    resolver: zodResolver(formProductoSchema),
    defaultValues: {
      marca_id: initialData?.marca_id || 0,
      categoria_id: initialData?.categoria_id || 0,
      modelo_id: initialData?.modelo_id || 0,
      nombre: initialData?.nombre || "",
      stock: initialData?.stock || 0,
      precio_venta: initialData?.precio_venta || 0,
      precio_compra: initialData?.precio_compra || 0,
      descripcion: initialData?.descripcion || "",
    },
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [initialData, reset]);

  const handleFormSubmit = async (data: SFormProductoData) => {
    if (initialData) {
      updateProducto(
        { producto: data, id: initialData.id },
        {
          onSuccess: () => {
            toast.success("Producto actualizado con exito");
            closeModal();
          },
        }
      );
    } else {
      createProducto(data, {
        onSuccess: () => {
          toast.success("Producto creado con exito");
          closeModal();
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <FormInput<SFormProductoData>
        name="nombre"
        label="Nombre *"
        type="text"
        placeholder="Ingrese el nombre"
        control={control}
        toUpperCase
        error={errors.nombre?.message}
      />

      <FormInput<SFormProductoData>
        name="descripcion"
        label="Descripción"
        placeholder="Ingrese la descripción"
        control={control}
        toUpperCase
        error={errors.descripcion?.message}
      />
      <div className="flex flex-col gap-2">
        <FormInputNumber<SFormProductoData>
          name="stock"
          label="Stock *"
          placeholder="Ingrese el stock"
          control={control}
          error={errors.stock?.message}
          register={register}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <FormInputNumber<SFormProductoData>
          name="precio_venta"
          label="Precio de venta"
          placeholder="Ingrese el precio de venta"
          control={control}
          error={errors.precio_venta?.message}
          register={register}
        />
        <FormInputNumber<SFormProductoData>
          name="precio_compra"
          label="Precio de compra"
          placeholder="Ingrese el precio de compra"
          control={control}
          error={errors.precio_compra?.message}
          register={register}
        />

        <FormSelect<SFormProductoData>
          name="marca_id"
          label="Marca *"
          control={control}
          options={(marcas || [])?.map((marca) => ({
            label: marca.nombre,
            value: marca.id,
          }))}
          placeholder="Seleccionar marca"
          error={errors.marca_id?.message}
        />

        <FormSelect<SFormProductoData>
          name="categoria_id"
          label="Categoría *"
          control={control}
          options={(categorias || [])?.map((categoria) => ({
            label: categoria.nombre,
            value: categoria.id,
          }))}
          placeholder="Seleccionar categoría"
          error={errors.categoria_id?.message}
        />

        <FormSelect<SFormProductoData>
          name="modelo_id"
          label="Modelo *"
          control={control}
          options={(modelos || [])?.map((modelo) => ({
            label: modelo.nombre,
            value: modelo.id,
          }))}
          placeholder="Seleccionar modelo"
          error={errors.modelo_id?.message}
        />
      </div>

      {/* Form Actions */}
      <div className="w-full flex justify-end mt-auto pt-4">
        <div className="flex gap-3">
          <Button
            disabled={isPending || isPendingUpdate}
            type="button"
            variant="outline"
            onClick={() => closeModal()}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending || isPendingUpdate}>
            {isPending || isPendingUpdate ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
