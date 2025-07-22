import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { IViewPersonaClienteList } from "@/models/IPersonaCliente";
import { useClientesById } from "@/services/clientes/useClientesById";
import { useRef, useState } from "react";

export const BuscarClienteByIdentificacion = () => {
  const [identificacion, setIdentificacion] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onBlurWrapper = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };
  const debouncedSearch = useDebounce((val: string) => {
    setIdentificacion(val);
    setShowSuggestions(!!val);
  }, 200);

  const { data: clientesEncontrados = [] } = useClientesById(identificacion, {
    enabled: !!identificacion,
    queryKey: ["clientes", "byId", identificacion],
  });

  const handleSelect = (cliente: IViewPersonaClienteList) => {
    console.log("variables =>", cliente);
  };

  return (
    <div
      className="relative w-full bg-gray-50"
      ref={wrapperRef}
      onBlur={onBlurWrapper}
    >
      <Input
        type="text"
        placeholder="Ingrese la identificación"
        defaultValue={identificacion}
        onChange={(e) => debouncedSearch(e.target.value)}
        className="w-full bg-white"
      />
      {showSuggestions && clientesEncontrados.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-full overflow-y-auto shadow-sm">
          {clientesEncontrados.map((c) => (
            <li
              key={c.persona_id}
              onClick={() => handleSelect(c)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-200"
            >
              {c.identificacion} – {c.nombres} {c.apellidos}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
