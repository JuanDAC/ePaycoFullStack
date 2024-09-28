import React from 'react';
import styles from './TransactionHistory.module.css';
import { Transaction } from '../domain/wallet.domain';

export interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <>
    <section className={styles.history} style={{maxHeight: transactions.length ? `${60 * (transactions.length + 2)}px` : "0px"   }}>
      <h2 className={styles.transaction__title}>Transaction History</h2>
      <div className={styles.transactionList}>
        {transactions.map((txn, index) => (
          <div key={index}
              className={`${styles.transactionItem} ${
                txn.amount >= 0 ? styles.credit : styles.debit
              }`}
          >
            <span className={styles.transactionItem__date}>{txn.date}</span>
            <span className={styles.transactionItem__desc}>{txn.desc}</span>
            <span
              className={`${styles.transactionItem__amount} ${
                txn.amount >= 0 ? styles.credit : styles.debit
              }`}
            >
              {txn.amount >= 0 ? `+$${txn.amount.toFixed(2)}` : `-$${Math.abs(txn.amount).toFixed(2)}`}
            </span>
          </div>
        ))}
      </div>
    </section>
    {transactions.length === 0 && <div className={styles.loading__bar}></div> }
    </>
  );
};

export default TransactionHistory;
