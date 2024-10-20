export interface currentTransaction {
  transactionId: number;
  walletId: number;
  transDesription: string;
  point: number;
  amount: number;
  transStatus: string;
  createdAt: Date;
}

export interface inputTransaction {
  walletId: number;
  point: number;
}
