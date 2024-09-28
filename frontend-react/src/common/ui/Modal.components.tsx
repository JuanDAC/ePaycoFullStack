import React, { cloneElement, forwardRef, Fragment, useEffect, useMemo } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  select: string;
  onClose: () => void;
  title: string;
  children: React.ReactNode ;
}

const Modal = forwardRef<HTMLDialogElement,ModalProps>(({select, onClose, title, children }, ref) => {
  const models = Array.isArray(children) ?  Array.from(children ) : [children];

  const ids = useMemo(() => {
    if (models.length === 0) return {
      err: new Error('Modal must have at least one child')
    };

    if (models.some((child) =>typeof child !== "object")) return {
      err: new Error('Modal must have element children')
    };

    if (models.some((child) => typeof child.key !== "string")) return {
      err: new Error('Modal must have key in each element children')
    };

    return {
      err: undefined,
      values: models.map((child) => child.key)
    }
  }, [children])


  useEffect(() => {
    if (ids.err instanceof Error) 
      throw ids.err;
  }, [ids])



  return (
    <dialog id="modal" ref={ref} className={styles.modal} onClose={onClose}>
      <div className={styles.modal__content}>
        <span className={styles.modal__close} onClick={onClose}>&times;</span>
        <h2 className={styles.modal__title}>{title}</h2>
        {
          models.map((child, index) => (
            <Fragment key={index}>
              {child.key === select && 
              cloneElement(child, {
                className: styles.modal__form
              })
              } 
            </Fragment>
          ))

        }
      </div>
    </dialog>
  );
});

export default Modal;
