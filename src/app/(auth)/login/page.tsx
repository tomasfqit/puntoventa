"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { IBrother } from "@/interfaces/IBrother";
import {
  brotherListService,
  setLocalStorageBrother,
} from "@/services/brothers/brother.service";
import { useState } from "react";

export default function LoginForm() {
  const { login } = useAuth();
  const [selectedBrother, setSelectedBrother] = useState<IBrother | null>(null);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription>
            Selecciona tu nombre para iniciar sesión
            <div className="w-full p-2">
              <Select
                value={selectedBrother?.id}
                onValueChange={(value) =>
                  setSelectedBrother(
                    brotherListService.find(
                      (brother) => brother.id === value
                    ) || null
                  )
                }
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Hermano" />
                </SelectTrigger>
                <SelectContent className="max-h-[250px] overflow-y-auto">
                  {brotherListService.map((brother) => (
                    <SelectItem key={brother.id} value={brother.id}>
                      {brother.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2"></CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full"
            disabled={!selectedBrother}
            onClick={() => {
              if (selectedBrother) {
                login(selectedBrother);
                setLocalStorageBrother(selectedBrother);
              }
            }}
          >
            Iniciar Sesión
          </Button>
          <div className="h-2" />
        </CardFooter>
      </Card>
    </div>
  );
}
