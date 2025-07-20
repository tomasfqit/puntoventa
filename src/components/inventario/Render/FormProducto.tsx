import { FormInput } from "@/components/ui/app-components/FormInput";
import { FormInputNumber } from "@/components/ui/app-components/FormInputNumber";
import { FormSelect } from "@/components/ui/app-components/FormSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/hooks/useModal";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Producto } from "@/interfaces/Table";
import { useBodegasList } from "@/services/bodegas/useBodegasList";
import { useCategoriasList } from "@/services/categorias/useCategoriasList";
import { useMarcaList } from "@/services/marca/useMarcaList";
import { useModeloList } from "@/services/modelo/useModeloList";
import { useProductoCreate } from "@/services/productos/useProductoCreate";
import { useProductoUpdate } from "@/services/productos/useProductoUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SFormProductoData, formProductoSchema } from "./schemaFormProducto";

interface FormProductoProps {
  initialData?: Producto;
}

export function FormProducto({ initialData }: FormProductoProps) {
  const [bodegaId, setBodegaId] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);
  const { closeModal } = useModal();
  const { data: marcas } = useMarcaList();
  const { data: modelos } = useModeloList();
  const { data: categorias } = useCategoriasList();
  const { data: bodegas } = useBodegasList();
  const { mutate: createProducto, isPending } = useProductoCreate();
  const { mutate: updateProducto, isPending: isPendingUpdate } =
    useProductoUpdate();
  const { getParam, clearParams } = useQueryParams();
  const idProducto = getParam("producto_id");

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
    const id = idProducto ? Number(idProducto) : 0;
    if (id) {
      updateProducto(
        { producto: data, id },
        {
          onSuccess: () => {
            toast.success("Producto actualizado con exito");
            closeModal();
            clearParams();
          },
        }
      );
    } else {
      createProducto(
        { producto: data, bodega_id: bodegaId, cantidad },
        {
          onSuccess: () => {
            toast.success("Producto creado con exito");
            closeModal();
            clearParams();
          },
        }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-2 w-full"
    >
      <div className="flex flex-col gap-2 w-full">
        <Label>Bodega *</Label>
        <Select
          value={String(bodegaId)}
          onValueChange={(value) => setBodegaId(Number(value))}
        >
          <SelectTrigger className="text-black w-1/2">
            <SelectValue placeholder="Seleccionar bodega" />
          </SelectTrigger>
          <SelectContent>
            {bodegas?.map((bodega) => (
              <SelectItem key={bodega.id} value={String(bodega.id)}>
                {bodega.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
      <div className="flex flex-col gap-2 w-full">
        <Label>Cantidad</Label>
        <Input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
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
