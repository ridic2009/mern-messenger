import { ReactNode } from "react";

export interface IModalProps {
    children: ReactNode;
    onClose: () => void;
    isExiting: boolean;
    isOpen: boolean;
  }