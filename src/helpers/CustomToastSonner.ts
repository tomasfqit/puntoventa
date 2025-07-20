import { toast } from "sonner";

export const CustomToastSonner = {
  error: (message: string, descripcion?: string) => {
    toast.error(message, {
      description: descripcion,
      duration: 3000,
      position: "top-right",
      style: {
        backgroundColor: "#ef4444",
        color: "white",
      },
    });
  },
  success: (message: string, descripcion?: string) => {
    toast.success(message, {
      description: descripcion,
      duration: 3000,
      position: "top-right",
      style: {
        backgroundColor: "#10b981",
        color: "white",
      },
    });
  },
  warning: (message: string, descripcion?: string) => {
    toast.warning(message, {
      description: descripcion,
      duration: 3000,
      position: "top-right",
    });
  },
  info: (message: string, descripcion?: string) => {
    toast.info(message, {
      description: descripcion,
      duration: 3000,
      position: "top-right",
    });
  },
};
