import {
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import { ReactNode } from "react";
import styles from "./Modal.module.scss";
import { classNames } from "@/lib/classNames/classNames";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  className?: string;
}

export const Modal = (props: ModalProps) => {
  const { isOpen, setIsOpen, children, className } = props;

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={styles.modal}
        transition
      >
        <div className={styles.modalOverlay}>
          <DialogPanel
            className={classNames(styles.modalPanel, {}, [className])}
          >
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
