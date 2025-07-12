"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setToken } from "@/helpers"
import { useLogin } from "@/services/usuario/useUsuarioLogin"
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)
    const { mutate: login, isPending } = useLogin();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.username === "" || formData.password === "") {
            alert("Por favor, ingresa un usuario y contraseña");
            return;
        }

        // Simular llamada a API
        login({ username: formData.username, password: formData.password }, {
            onSuccess: () => {
                setToken(formData.username);
                router.push("/home");
            },
            onError: (error) => {
                alert("Usuario o contraseña incorrectos");
                console.log(error);
            }
        });
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
                    <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Usuario</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="username"
                                type="username"
                                placeholder="usuario"
                                className="pl-10"
                                value={formData.username}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    </div>


                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" disabled={isPending} onClick={handleSubmit}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Iniciando sesión...
                            </>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Button>
                    <div className="h-2" />

                </CardFooter>
            </Card>
        </div>
    )
}
