import { toast } from "react-toastify";

export const showToast = (
  id: string,
  messages: string | string[],
  type = "success",
  autoClose = 5000
) => {
  const showMessage = (message: string, isArray: boolean) => {
    const options = {
      autoClose,
      toastId: isArray ? `${message.split(" ").join("")}-${id}` : id,
    };
    type === "success"
      ? toast.success(message, options)
      : toast.error(message, options);
  };
  if (Array.isArray(messages)) {
    for (const message of messages) {
      showMessage(message, true);
    }
  } else {
    showMessage(messages, false);
  }
};
