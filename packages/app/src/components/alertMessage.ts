import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message: string, type: string) => {
  switch (type) {
    case "error":
      toast.error(message, { hideProgressBar: true });
      break;
    case "success":
      toast.success(message, { hideProgressBar: true });
      break;
    default:
      toast.info(message, { hideProgressBar: true });
  }
};
