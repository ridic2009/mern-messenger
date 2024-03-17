import styles from "./index.module.scss";
import { IModalProps } from "./types";

export default function Modal({
  children,
  onClose,
  isExiting,
  isOpen,
}: IModalProps) {
  return (
    <div
      onClick={onClose}
      className={
        isExiting
          ? `${styles.backdrop} ${styles.backdropExiting}`
          : styles.backdrop
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          isOpen
            ? isExiting
              ? `${styles.modal} ${styles.modalExiting}`
              : `${styles.modal} ${styles.modalOpen}`
            : styles.modal
        }
      >
        {children}
      </div>
    </div>
  );
}
