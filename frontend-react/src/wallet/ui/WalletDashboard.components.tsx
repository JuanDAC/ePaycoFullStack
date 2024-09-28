import React, { useRef } from 'react';
import { useWalletActions, useHandleModals } from '../application/useWallet.hooks';
import TransferList from './TransferList.components';
import TransactionHistory from './TransactionHistory.components';
import styles from './WalletDashboard.module.css';
import Modal from '../../common/ui/Modal.components';
import { Modals } from '../domain/wallet.domain';

interface WalletDashboardProps {
  userId: string;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ userId }) => {
  const modal = useRef<HTMLDialogElement | null>(null);

  const { modalSelected, openModal, closeModal } = useHandleModals(modal);
  const { balance, growth, transfers, transactions, onDepositSubmit, onTransferSubmit, onConfirmSubmit, loading } = useWalletActions(userId, closeModal);

  return (
    <div className={styles.walletApp}>
      {/* Wallet Header with Balance */}
      <header className={styles.walletApp__header}>
        <div className={styles.walletCard}>
          <h1 className={styles.walletCard__balance}>${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h1>
          <p className={styles.walletCard__growth}>+{growth}% (+${(balance * (growth / 100)).toFixed(2)})</p>
        </div>
      </header>

      {/* Action Buttons */}
      <section className={styles.walletApp__actions}>
        <button className={`${styles.actionButton} ${styles.deposit}`} onClick={openModal.bind(null, Modals.Deposit)}>
          Deposit
        </button>
        <button className={`${styles.actionButton} ${styles.transfer}`} onClick={openModal.bind(null, Modals.Transfer)}>
          Transfer
        </button>
        <button className={`${styles.actionButton} ${styles.confirm}`} onClick={openModal.bind(null, Modals.Confirm)}>
          Confirm
        </button>
      </section>

      {/* Transfer List */}
      <TransferList transfers={transfers} onAdd={openModal.bind(null, Modals.Transfer)} />

      {/* Transaction History */}
      <TransactionHistory transactions={transactions} />

      {/* Modal for Deposit, Transfer, Confirm */}
      <Modal ref={modal} select={modalSelected} onClose={closeModal} title={modalSelected}>
          <form key="Deposit" onSubmit={onDepositSubmit}>
            <label className={styles.modal__label} htmlFor="depositAmount">Amount</label>
            <input className={styles.modal__input} type="number" id="depositAmount" name="depositAmount" placeholder="Enter amount" required />
            <button className={`${styles.modal__submit} ${styles.deposit}`} type="submit" disabled={loading}>Deposit</button>
          </form>
          <form key="Transfer" onSubmit={onTransferSubmit}>
            <label className={styles.modal__label} htmlFor="transferTo">Transfer To</label>
            <input className={styles.modal__input} type="text" id="transferTo" name="transferTo" placeholder="Recipient's name" required />
            <label className={styles.modal__label} htmlFor="transferAmount">Amount</label>
            <input className={styles.modal__input} type="number" id="transferAmount" name="transferAmount" placeholder="Enter amount" required />
            <button className={`${styles.modal__submit} ${styles.transfer}`} type="submit" disabled={loading}>Transfer</button>
          </form>
          <form key="Confirm" onSubmit={onConfirmSubmit}>
            <label className={styles.modal__label} htmlFor="sessionID">Session ID</label>
            <input className={styles.modal__input} type="text" id="sessionID" name="sessionID" placeholder="Enter session ID" required />
            <label className={styles.modal__label} htmlFor="confirmToken">Token</label>
            <input className={styles.modal__input} type="number" id="confirmToken" name="confirmToken" placeholder="Enter 6-digit token" required />
            <button className={`${styles.modal__submit} ${styles.confirm}`} type="submit" disabled={loading}>Confirm</button>
          </form>
      </Modal>
    </div>
  );
};

export default WalletDashboard;
