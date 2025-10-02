import { IBrother } from "@/interfaces/IBrother";
import { getLocalStorageBrother } from "@/services/brothers/brother.service";
import { groupsPalabra } from "@/services/brothers/grupoPalabra.service";
import { useEffect, useState } from "react";

export const MiGrupoPalabra = () => {
  const [currentUser, setCurrentUser] = useState<IBrother | null>(null);

  useEffect(() => {
    setCurrentUser(getLocalStorageBrother());
  }, []);

  if (!currentUser) return <div>Cargando...</div>;

  const group = groupsPalabra.find((g) =>
    g.members.some((m) => m.id === currentUser.id)
  );

  if (!group) return <div>No se encontró tu grupo.</div>;

  return (
    <div>
      <p>{group.name}</p>
      <ul className="list-disc pl-5 space-y-1">
        {group.members.map((member) => {
          const isMe = member.id === currentUser.id;
          const isHead = !!member.isHead;
          return (
            <li
              key={member.id}
              className={
                (isHead ? "font-semibold " : "") + (isMe ? "text-blue-600" : "")
              }
            >
              {member.name}
              {isMe ? " (tú)" : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
