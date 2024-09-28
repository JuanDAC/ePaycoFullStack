import React from 'react';
import styles from './TransferList.module.css';

interface TransferListProps {
  transfers: string[];
  onAdd: () => void;
}

const TransferList: React.FC<TransferListProps> = ({ transfers, onAdd }) => {
  return (
    <>
    <section className={styles.transferList} style={{maxHeight: transfers.length ? '140px' : "0px"   }}>
      <h2 className={styles.transferList__title}>Transfer List</h2>
      <div className={styles.transferList__items}>
        <div className={`${styles.transferList__item} ${styles['transferList__item--add']}`} onClick={onAdd}>
          Add
        </div>
        {transfers.map((name, index) => (
          <div key={index} className={styles.transferList__item}>
            {name}
          </div>
        ))}
      </div>
    </section>
    {transfers.length === 0 && <div className={styles.loading__bar}></div> }
    </>
  );
};

export default TransferList;
