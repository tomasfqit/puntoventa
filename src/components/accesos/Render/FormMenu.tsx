"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Menu } from "@/interfaces/Table"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Zod schema for Menu form validation
const menuFormSchema = z.object({
    grupo_id: z.number().min(1, "El grupo es requerido"),
    titulo: z.string().min(1, "El título es requerido").max(100, "El título no puede exceder 100 caracteres"),
    icono: z.string().optional(),
    path: z.string().min(1, "La ruta es requerida").max(200, "La ruta no puede exceder 200 caracteres"),
    orden: z.number().min(0, "El orden debe ser mayor o igual a 0").optional(),
})

type MenuFormData = z.infer<typeof menuFormSchema>

interface MenuFormProps {
    initialData?: Partial<Menu>
    onSubmit: (data: MenuFormData) => void
    onCancel?: () => void
    isLoading?: boolean
    grupos?: Array<{ id: number; titulo: string }>
}

export function MenuForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
    grupos = [],
}: MenuFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<MenuFormData>({
        resolver: zodResolver(menuFormSchema),
        defaultValues: {
            grupo_id: initialData?.grupo_id || 0,
            titulo: initialData?.titulo || "",
            icono: initialData?.icono || "",
            path: initialData?.path || "",
            orden: initialData?.orden || 0,
        },
    })

    const handleFormSubmit = async (data: MenuFormData) => {
        try {
            await onSubmit(data)
            reset()
        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Grupo ID */}
            <div className="space-y-2">
                <Label htmlFor="grupo_id">Grupo *</Label>
                <select
                    id="grupo_id"
                    {...register("grupo_id", { valueAsNumber: true })}
                    className="flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                >
                    <option value={0}>Seleccionar grupo</option>
                    {grupos.map((grupo) => (
                        <option key={grupo.id} value={grupo.id}>
                            {grupo.titulo}
                        </option>
                    ))}
                </select>
                {errors.grupo_id && (
                    <p className="text-sm text-destructive">{errors.grupo_id.message}</p>
                )}
            </div>

            {/* Título */}
            <div className="space-y-2">
                <Label htmlFor="titulo">Título *</Label>
                <Input
                    id="titulo"
                    type="text"
                    placeholder="Ingrese el título del menú"
                    {...register("titulo")}
                    aria-invalid={errors.titulo ? "true" : "false"}
                />
                {errors.titulo && (
                    <p className="text-sm text-destructive">{errors.titulo.message}</p>
                )}
            </div>

            {/* Icono */}
            <div className="space-y-2">
                <Label htmlFor="icono">Icono</Label>
                <Input
                    id="icono"
                    type="text"
                    placeholder="Nombre del icono (ej: home, user, settings)"
                    {...register("icono")}
                />
                {errors.icono && (
                    <p className="text-sm text-destructive">{errors.icono.message}</p>
                )}
            </div>

            {/* Path */}
            <div className="space-y-2">
                <Label htmlFor="path">Ruta *</Label>
                <Input
                    id="path"
                    type="text"
                    placeholder="Ingrese la ruta del menú (ej: /dashboard, /users)"
                    {...register("path")}
                    aria-invalid={errors.path ? "true" : "false"}
                />
                {errors.path && (
                    <p className="text-sm text-destructive">{errors.path.message}</p>
                )}
            </div>

            {/* Orden */}
            <div className="space-y-2">
                <Label htmlFor="orden">Orden</Label>
                <Input
                    id="orden"
                    type="number"
                    min="0"
                    placeholder="0"
                    {...register("orden", { valueAsNumber: true })}
                />
                {errors.orden && (
                    <p className="text-sm text-destructive">{errors.orden.message}</p>
                )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
                <Button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="flex-1"
                >
                    {isSubmitting || isLoading ? "Guardando..." : "Guardar"}
                </Button>
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isSubmitting || isLoading}
                    >
                        Cancelar
                    </Button>
                )}
            </div>
        </form>
    )
} 