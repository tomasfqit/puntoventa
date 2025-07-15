// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Menu } from "@/interfaces/Table";
// import React, { useState } from "react";

// interface MenuFormProps {
//     initialData?: Partial<Menu>
//     onSubmit: (data: Menu) => void
// }

// export const MenuForm: React.FC<MenuFormProps> = ({ initialData, onSubmit }) => {
//     const [formData, setFormData] = useState<Menu>({
//         id: initialData?.id || 0,
//         grupo_id: initialData?.grupo_id || 0,
//         titulo: initialData?.titulo || "",
//         icono: initialData?.icono || "",
//         path: initialData?.path || "",
//         orden: initialData?.orden || 0,
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     }

//     return (
//         <div className="flex flex-col gap-4">
//             <div className="grid grid-cols-2 gap-4 md:grid-cols-4 pt-2">
//                 <div className="space-y-2">
//                     <Label htmlFor="titulo">Título *</Label>
//                     <Input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
//                 </div>
//                 <div className="space-y-2">
//                     <Label htmlFor="icono">Icono</Label>
//                     <Input type="text" name="icono" value={formData.icono} onChange={handleChange} />
//                 </div>
//                 <div className="space-y-2">
//                     <Label htmlFor="path">Ruta *</Label>
//                     <Input type="text" name="path" value={formData.path} onChange={handleChange} />
//                 </div>
//                 <div className="space-y-2">
//                     <Label htmlFor="orden">Orden</Label>
//                     <Input type="number" name="orden" value={formData.orden} onChange={handleChange} />
//                 </div>
//                 <div className="space-y-2">
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="outline" className="flex-1">
//                                 {formData.grupo_id}
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent>
//                             <DropdownMenuItem>
//                                 <Button variant="outline" className="flex-1">
//                                     {formData.grupo_id}
//                                 </Button>
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>
//             </div>
//             <Button onClick={() => onSubmit(formData)}>Guardar</Button>
//         </div>
//     )
// }

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
        setValue,
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
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 " >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {/* Grupo ID */}
                <div className="space-y-2">
                    <Label htmlFor="grupo_id">Grupo *</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full">
                                {grupos.find((grupo) => grupo.id === initialData?.grupo_id)?.titulo || "Seleccionar grupo"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {grupos.map((grupo) => (
                                <DropdownMenuItem key={grupo.id} onClick={() => {
                                    setValue("grupo_id", grupo.id)
                                }}>
                                    {grupo.titulo}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
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
            </div>


            {/* Form Actions */}
            <div className="w-full flex justify-end">
                <div className="flex gap-3">
                    <Button
                        disabled={isSubmitting || isLoading}
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="flex-1"
                    >
                        {isSubmitting || isLoading ? "Guardando..." : "Guardar"}
                    </Button>

                </div>

            </div>
        </form>
    )
} 