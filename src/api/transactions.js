import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = process.env.base_url;

export const useGetTransactions = (options = {}) => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/transactions`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onError: (error) => {
      console.error('Error fetching transactions:', error);
    },
    ...options,
  });
};

export const useGetTransactionDetails = (transId, options = {}) => {
  return useQuery({
    queryKey: ["transactionDetails", { transId }],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/transactions?limit=10&page=1&search=Jerry&sort=name-asc&businessId=2f18595a-83bd-4a07-9721-aa572bd9fd9e`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onError: (error) => {
      console.error('Error fetching transactions:', error);
    },
    ...options,
  });
};