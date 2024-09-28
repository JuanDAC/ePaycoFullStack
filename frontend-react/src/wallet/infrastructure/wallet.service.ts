
export const fetchBalance = async (userId: string) => {
  return new Promise<{ balance: number; growth: number }>((resolve) => {
    setTimeout(() => {
      resolve({ balance: 62588.05, growth: 8.82 });
    }, 1000);
  });
};

export const fetchTransfers = async (userId: string) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(['Philip', 'Lily', 'Daniel', 'Cody']);
    }, 4000);
  });
};

export const fetchTransactions = async (userId: string) => {
  return new Promise<Array<{ date: string; desc: string; amount: number }>>((resolve) => {
    setTimeout(() => {
      resolve([
        { date: '23 Jan 2024', desc: 'Stripe Payment', amount: 2349.0 },
        { date: '21 Jan 2024', desc: 'Pay Transfer', amount: -567.0 },
        { date: '19 Jan 2024', desc: 'Groceries', amount: -73.3 },
      ]);
    }, 1000);
  });
};

export const deposit = async (userId: string, amount: number) => {
  return new Promise<{ newBalance: number }>((resolve) => {
    setTimeout(() => {
      resolve({ newBalance: 62588.05 + amount });
    }, 1000);
  });
};

export const transfer = async (userId: string, recipient: string, amount: number) => {
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};

export const confirmPayment = async (sessionId: string, token: string) => {
  return new Promise<{ success: boolean }>((resolve, reject) => {
    setTimeout(() => {
      if (token === 123456) { 
        resolve({ success: true });
      } else {
        reject(new Error('Invalid token'));
      }
    }, 1000);
  });
};
