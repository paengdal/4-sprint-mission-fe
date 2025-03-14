'use client';

import { createContext, ReactElement, useContext, useState } from 'react';

interface ModalContextValue {
  open?: (element: ReactElement) => void;
  close?: () => void;
}
const ModalContext = createContext<ModalContextValue>({});

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [modalElement, setModalElement] = useState<ReactElement>();

  const open = (element: ReactElement) => setModalElement(element);
  const close = () => setModalElement(null);

  const value = { open, close };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalElement}
    </ModalContext.Provider>
  );
}
