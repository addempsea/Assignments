export const formatAmount = (amount: number) =>
  amount
    ? `${new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "NGN",
      }).format(amount / 100)}`
    : 0;

export const formatSymbolAmount = (amount: number) =>
  amount ? `₦${new Intl.NumberFormat("en-GB").format(amount / 100)}` : 0;
