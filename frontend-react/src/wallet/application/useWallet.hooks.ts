
import { useState, useEffect, useCallback  } from 'react';
import {
  fetchBalance,
  fetchTransfers,
  fetchTransactions,
  deposit as depositService,
  transfer as transferService,
  confirmPayment as confirmPaymentService,
} from '../infrastructure/wallet.service';
import { Modals } from '../domain/wallet.domain';

export const useWallet = (userId: string) => {
  const [balance, setBalance] = useState<number>(0);
  const [growth, setGrowth] = useState<number>(0);
  const [transfers, setTransfers] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<Array<{ date: string; desc: string; amount: number }>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadWalletData = async () => {
      setLoading(true);
      try {
        const balanceData = await fetchBalance(userId);
        setBalance(balanceData.balance);
        setGrowth(balanceData.growth);

        const transferData = await fetchTransfers(userId);
        setTransfers(transferData);

        const transactionData = await fetchTransactions(userId);
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWalletData();
  }, [userId]);

  const deposit = async (amount: number) => {
    setLoading(true);
    try {
      const response = await depositService(userId, amount);
      setBalance(response.newBalance);
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const transfer = async (recipient: string, amount: number) => {
    setLoading(true);
    try {
      const response = await transferService(userId, recipient, amount);
      if (response.success) {
        // Update balance and transactions accordingly
        setBalance(prev => prev - amount);
        setTransactions(prev => [
          { date: new Date().toLocaleDateString(), desc: `Transfer to ${recipient}`, amount: -amount },
          ...prev,
        ]);
      }
    } catch (error) {
      console.error('Transfer failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (sessionId: string, token: string) => {
    setLoading(true);
    try {
      const response = await confirmPaymentService(sessionId, token);
      if (response.success) {
        // Update transactions or balance as needed
        console.log('Payment confirmed');
      }
    } catch (error) {
      console.error('Payment confirmation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    balance,
    growth,
    transfers,
    transactions,
    loading,
    deposit,
    transfer,
    confirmPayment,
  };
};



export const useHandleModals = (modal: React.RefObject<HTMLDialogElement>) => {
  const [modalSelected, setModalSelected] = useState<Modals>(Modals.None);

  const openModal = useCallback((modalType: Modals) => {
    setModalSelected(modalType);
    if (modal.current) modal.current.showModal();
  }, [modal]);

  const closeModal = useCallback(() => {
    setModalSelected(Modals.None);
    if (modal.current) modal.current.close();
  }, [modal]);

  return {
    modalSelected,
    openModal,
    closeModal
  };
};

export const useWalletActions = (userId: string, closeModal: () => void) => {
  const { balance, growth, transfers, transactions, deposit, transfer, confirmPayment, loading } = useWallet(userId);

  const onDepositSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat((e.target).depositAmount.value);
    await deposit(amount);
    closeModal();
  }, [deposit, closeModal]);

  const onTransferSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipient = (e.target ).transferTo.value;
    const amount = parseFloat((e.target as any).transferAmount.value);
    await transfer(recipient, amount);
    closeModal();
  }, [transfer, closeModal]);

  const onConfirmSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sessionId = (e.target ).sessionID.value;
    const token = parseInt((e.target as any).confirmToken.value, 10);
    await confirmPayment(sessionId, token);
    closeModal();
  }, [confirmPayment, closeModal]);

  return {
    balance,
    growth,
    transfers,
    transactions,
    onDepositSubmit,
    onTransferSubmit,
    onConfirmSubmit,
    loading
  };
};
