export type ExecutionProviderKind = "api" | "saas" | "payment" | "wallet";

export type ApprovalPolicy = {
  approvalRequired: boolean;
  reason?: string;
  spendingLimitUsd?: number;
};

export type PaymentRequest = {
  asset: string;
  amount: number;
  network?: string;
  destination?: string;
  purpose: string;
};

export type ExecutionReceipt = {
  id: string;
  provider: ExecutionProviderKind;
  status: "planned" | "awaiting_approval" | "approved" | "executed" | "failed";
  createdAt: string;
  action: string;
  network?: string;
  asset?: string;
  amount?: number;
  txHash?: string;
  note?: string;
};

export interface ExecutionProvider<TInput = unknown> {
  kind: ExecutionProviderKind;
  execute(input: TInput, policy: ApprovalPolicy): Promise<ExecutionReceipt>;
}

export interface PaymentProvider extends ExecutionProvider<PaymentRequest> {
  kind: "payment";
}

export interface WalletProvider extends ExecutionProvider<PaymentRequest> {
  kind: "wallet";
}

/**
 * Sprint013 intentionally ships interfaces only.
 * No private keys, mainnet transactions, custody, or autonomous spending.
 * Future flow:
 * Agent -> Policy -> Human Approval -> Provider -> Receipt -> Workspace
 */
