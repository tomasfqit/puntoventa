"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: (config?: ModalConfig) => void;
  closeModal: () => void;
  modalConfig: ModalConfig;
}

interface ModalConfig {
  title?: string;
  subTitle?: string;
  size?: "sm" | "md" | "lg";
  viewFooter?: boolean;
  children?: ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    title: "",
    subTitle: "",
    size: "md",
    viewFooter: true,
    children: null,
  });

  const openModal = (config: ModalConfig = {}) => {
    setModalConfig({
      title: "",
      subTitle: "",
      size: "md",
      viewFooter: true,
      children: null,
      ...config,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalConfig({
      title: "",
      subTitle: "",
      size: "md",
      viewFooter: true,
      children: null,
    });
  };

  const value: ModalContextType = {
    isOpen,
    openModal,
    closeModal,
    modalConfig,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
