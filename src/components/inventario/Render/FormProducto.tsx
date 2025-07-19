import { FormInput } from "@/components/ui/app-components/FormInput";
import { FormSelect } from "@/components/ui/app-components/FormSelect";
import { Button } from "@/components/ui/button";
import { Producto } from "@/interfaces/Table";
import { useCategoriasList } from "@/services/categorias/useCategoriasList";
import { useMarcaList } from "@/services/marca/useMarcaList";
import { useModeloList } from "@/services/modelo/useModeloList";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema for Menu form validation
const formProductoSchema = z.object({
  marca_id: z.number().min(1, "La marca es requerida"),
  categoria_id: z.number().min(1, "La categoría es requerida"),
  modelo_id: z.number().min(1, "El modelo es requerido"),
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  precio: z.number().min(0, "El precio es requerido"),
  stock: z.number().min(0, "El stock es requerido"),
  descripcion: z.string().optional(),
  imagen: z.string().optional(),
  estado: z.boolean().optional(),
});

type FormProductoData = z.infer<typeof formProductoSchema>;

interface FormProductoProps {
  initialData?: Partial<Producto>;
  isLoading?: boolean;
}

export function FormProducto({
  initialData,
  isLoading = false,
}: FormProductoProps) {
  const { data: marcas } = useMarcaList();
  const { data: modelos } = useModeloList();
  const { data: categorias } = useCategoriasList();
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control,
    formState: { errors },
  } = useForm<FormProductoData>({
    resolver: zodResolver(formProductoSchema),
    defaultValues: {
      marca_id: initialData?.marca_id || 0,
      categoria_id: initialData?.categoria_id || 0,
      modelo_id: initialData?.modelo_id || 0,
      nombre: initialData?.nombre || "",
    },
  });

  const handleFormSubmit = async (data: FormProductoData) => {
    try {
      console.log("data =>", data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <FormInput<FormProductoData>
        name="nombre"
        label="Nombre *"
        type="text"
        placeholder="Ingrese el nombre"
        control={control}
        toUpperCase
        error={errors.nombre?.message}
      />

      <FormInput<FormProductoData>
        name="descripcion"
        label="Descripción"
        type="text"
        placeholder="Ingrese la descripción"
        control={control}
        toUpperCase
        error={errors.descripcion?.message}
      />

      <FormSelect<FormProductoData>
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

      <FormSelect<FormProductoData>
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

      <FormSelect<FormProductoData>
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

      {/* Form Actions */}
      <div className="w-full flex justify-end mt-auto pt-4">
        <div className="flex gap-3">
          <Button
            disabled={isSubmitting || isLoading}
            type="button"
            variant="outline"
            onClick={() => console.log("cancelar")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
