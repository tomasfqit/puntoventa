import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { brotherListService } from "@/services/brothers/brother.service";
import { Phone } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export const BrothersList = () => {
  const [search, setSearch] = useState("");
  const filteredBrothers = brotherListService.filter((brother) =>
    brother.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="h-[calc(100vh-180px)] flex flex-col w-full">
      <h1 className="flex-shrink-0 mb-4">Listado de hermanos</h1>
      <Input
        placeholder="Buscar hermano"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-1 overflow-y-auto w-full">
        {filteredBrothers.map((brother) => (
          <div
            key={brother.id}
            className="p-1 border-b flex flex-row justify-between items-center"
          >
            {brother.name}
            <div className="flex flex-row gap-2">
              <Button variant="outline" size="icon" className="bg-blue-100">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-green-100">
                <FaWhatsapp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
