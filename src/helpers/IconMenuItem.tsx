import { Folder, Home, Package, ShieldBan, Users } from "lucide-react";

interface GetIconLucideMenuItemProps {
    icon: string;
    size: number;
    color: string;
}

export const GetIconLucideMenuItem = ({ icon, size, color }: GetIconLucideMenuItemProps) => {
    switch (icon) {
        case "Home":
            return <Home size={size} color={color} />
        case "Package":
            return <Package size={size} color={color} />
        case "Warehouse":
            return <Users size={size} color={color} />
        case 'ShieldBan':
            return <ShieldBan size={size} color={color} />
        default:
            return <Folder size={size} color={color} />
    }

}