// components/sidebar/SidebarNested.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { FlatMenuItem } from "@/constants/MenuItems";
import { transformToNestedMenu } from "@/helpers";
import { useAuthLocalStorage } from "@/store/authStore";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { menuItemsStore } = useAuthLocalStorage(); // data plana
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const nestedMenu = transformToNestedMenu(
    menuItemsStore as unknown as FlatMenuItem[]
  );

  const filteredMenu = nestedMenu.filter(
    (menu) =>
      (menu.title + "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.items.some((sub) =>
        sub.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out z-40 ${
        isOpen ? "w-64" : "w-0"
      } overflow-hidden`}
    >
      <div className="p-1">
        <Input
          placeholder="Buscar"
          className="w-full bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="p-2 h-[84.8vh] overflow-y-auto">
        <nav className="space-y-4">
          {filteredMenu.map((menu) => (
            <MenuGroup
              key={menu.title}
              title={menu.title}
              menuPath={menu.menuPath}
              items={menu.items}
              currentPath={pathname}
              router={router}
            />
          ))}
          {filteredMenu.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No se encontraron resultados para "{searchTerm}"
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

function MenuGroup({
  title,
  menuPath,
  items,
  currentPath,
  router,
}: {
  title: string;
  menuPath: string | null;
  items: { title: string; path: string }[];
  currentPath: string;
  router: ReturnType<typeof useRouter>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // 🔁 Caso: menú sin hijos
  if (items.length === 0 && menuPath) {
    const isActive = currentPath === menuPath;
    return (
      <Button
        variant="ghost"
        className="w-full justify-start h-10 px-2 text-gray-700 hover:bg-gray-100"
        onClick={() => currentPath !== menuPath && router.push(menuPath)}
        style={{
          backgroundColor: isActive ? "rgba(0, 0, 0, 0.05)" : "transparent",
          color: isActive ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.6)",
        }}
      >
        {title}
      </Button>
    );
  }

  // 🧩 Caso: menú con submenús
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start h-10 px-2 text-gray-700 hover:bg-gray-100"
        >
          {title}
          <ChevronRight
            className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1">
        <ul className="ml-4 space-y-1">
          {items.map((item) => (
            <li key={item.path}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 px-2 text-gray-600 hover:bg-gray-100"
                style={{
                  backgroundColor:
                    currentPath === item.path
                      ? "rgba(0, 0, 0, 0.05)"
                      : "transparent",
                  color:
                    currentPath === item.path
                      ? "rgba(0, 0, 0, 0.8)"
                      : "rgba(0, 0, 0, 0.6)",
                }}
                onClick={() =>
                  currentPath !== item.path && router.push(item.path)
                }
              >
                {item.title}
              </Button>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
