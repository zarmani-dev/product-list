import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import confirmGif from "../assets/images/confirm.gif";

const ModalConfirm = ({ openModal, closeModal, children }) => {
  const ref = useRef();

  const [pending, setIsPending] = useState(true);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
      const timeout = setTimeout(() => setIsPending(false), 4000);

      return () => clearTimeout(timeout);
    } else {
      ref.current?.close();
      setIsPending(true);
    }
  }, [openModal]);

  return createPortal(
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="backdrop:bg-black/60 w-[550px]   rounded-xl p-5 overflow-hidden"
    >
      {pending && (
        <img src={confirmGif} className="w-[200px] mx-auto" alt="Gif" />
      )}
      {pending || children}
    </dialog>,
    document.getElementById("modal")
  );
};
export default ModalConfirm;
