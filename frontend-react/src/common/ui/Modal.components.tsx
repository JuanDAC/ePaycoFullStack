import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
  <dialog id="modal" className={styles.modal}>
    <div className={styles.modal__content}>
      <span className={styles.modal__close} onClick={onClose}>&times;</span>
        <h2 className={styles.modal__title}>{title}</h2>
        <form className={styles.modal__form}>{children}</form>
    </div>
  </dialog>
  );
};

export default Modal;
