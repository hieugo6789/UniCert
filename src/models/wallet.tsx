export interface WalletDetail {
  walletId: string;
  point: number;
  userId: string;
  depositDate: Date;
  history: string;
  walletStatus: string;
}

export interface currentWallet {
  walletId: number;
  point: number;
  userId: string;
  depositDate: Date;
  history: string;
  walletStatus: string;
}

export interface inputRefund {
  walletId: number;
  point: number;
  bankAccount: {
    accountNumber: string;
    bankName: string;
  };
}
