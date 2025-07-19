import { FormInput } from "@/components/ui/app-components/FormInput";
import { FormInputNumber } from "@/components/ui/app-components/FormInputNumber";
import { FormSelect } from "@/components/ui/app-components/FormSelect";
import { Button } from "@/components/ui/button";
import { Producto } from "@/interfaces/Table";
import { useCategoriasList } from "@/services/categorias/useCategoriasList";
import { useMarcaList } from "@/services/marca/useMarcaList";
import { useModeloList } from "@/services/modelo/useModeloList";
import { useProductoCreate } from "@/services/productos/useProductoCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SFormProductoData, formProductoSchema } from "./schemaFormProducto";

interface FormProductoProps {
  initialData?: Producto;
  isLoading?: boolean;
}

export function FormProducto({
  initialData,
  isLoading = false,
}: FormProductoProps) {
  const { data: marcas } = useMarcaList();
  const { data: modelos } = useModeloList();
  const { data: categorias } = useCategoriasList();
  const { mutate: createProducto, isPending } = useProductoCreate();
  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = useForm<SFormProductoData>({
    resolver: zodResolver(formProductoSchema),
    defaultValues: {
      marca_id: initialData?.marca_id || 0,
      categoria_id: initialData?.categoria_id || 0,
      modelo_id: initialData?.modelo_id || 0,
      nombre: initialData?.nombre || "",
      stock: initialData?.stock || 0,
    },
  });

  const handleFormSubmit = async (data: SFormProductoData) => {
    try {
      console.log("data aaaaaaaaaaa=>", data);
      createProducto(data, {
        onSuccess: () => {
          console.log("Producto creado con exito");
        },
        onError: (error) => {
          console.error("Error creando producto:", error);
        },
        onSettled: () => {
          console.log("Producto creado con exito");
        },
      });
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
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
            disabled={isPending || isLoading}
            type="button"
            variant="outline"
            onClick={() => console.log("cancelar")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isPending || isLoading}>
            {isPending || isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
