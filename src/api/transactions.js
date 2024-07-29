import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = (transactionId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["transaction", { transactionId }],
    queryFn: () => {
      return fetch(
        `https://settlement-staging.azurewebsites.net/api/v1/app/transactions?limit=10&page=1&search=Jerry&sort=name-asc&businessId=2f18595a-83bd-4a07-9721-aa572bd9fd9e`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${sessionStorage.getItem("token")}`,
          },
        }
      ).then((res) => res.json());
    }
  });
};

export const useGetTransactionDetails = (transId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["transactionDetails", { transId }],
    queryFn: () => {
      return fetch(
        `https://settlement-staging.azurewebsites.net/api/v1/app/transactions/${transId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      ).then((res) => res.json());
    }
  });
};