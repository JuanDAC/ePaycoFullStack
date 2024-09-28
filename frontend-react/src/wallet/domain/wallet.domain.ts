
export interface Transaction {
  date: string;
  desc: string;
  amount: number;
}

export const enum Modals {
  Deposit = "Deposit",
  Transfer = "Transfer",
  Confirm = "Confirm",
  None = ""
}