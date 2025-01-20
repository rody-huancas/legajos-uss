import { toast } from "sonner";

type NotificationType = "success" | "error" | "warning" | "info";

export const showNotification = (type: NotificationType, message: string) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "info":
    default:
      toast(message);
      break;
  }
};
