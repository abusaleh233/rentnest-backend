export type IPaymentIntentData = {
  rentalRequestId: string;
};

export type IConfirmPaymentData = {
  transactionId: string;
  rentalRequestId: string;
};