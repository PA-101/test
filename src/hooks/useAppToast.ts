import { toast } from "sonner";

export const useAppToast = () => ({
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast.info(msg),
});
