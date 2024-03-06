import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    // Recommended to store the ref in a temporary constant:
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    // Cleanup function
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
