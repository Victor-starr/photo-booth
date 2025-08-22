import { useState } from "react";

export default function useConfirmPopUp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const showPopUp = (msg: string, confirmCallback: () => void) => {
    setMessage(msg);
    setOnConfirm(() => confirmCallback);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return {
    open,
    message,
    showPopUp,
    handleConfirm,
    handleCancel,
  };
}
