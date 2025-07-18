import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IDBTableRol } from "@/interfaces/Table";
import { useRolCreate } from "@/services/rol/useRolCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import z from "zod";

const rolFormSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  descripcion: z.string().min(1, { message: "La descripción es requerida" }),
});

interface PropsFormRol {
  closeModal: () => void;
}

export const FormRol = ({ closeModal }: PropsFormRol) => {
  const { mutate: createRol, isPending } = useRolCreate();
  const form = useForm<IDBTableRol>({
    resolver: zodResolver(rolFormSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  const onSubmit = (data: IDBTableRol) => {
    createRol(data, {
      onSuccess: () => {
        closeModal();
      },
    });
    closeModal();
  };

  const onError = (errors: FieldErrors<IDBTableRol>) => {
    console.log(errors);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
      <Input {...form.register("nombre")} />
      <Input {...form.register("descripcion")} />

      <div className="flex flex-row gap-2 justify-end">
        <Button
          variant="outline"
          onClick={() => closeModal()}
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button variant="default" type="submit" disabled={isPending}>
          Guardar
        </Button>
      </div>
    </form>
  );
};
