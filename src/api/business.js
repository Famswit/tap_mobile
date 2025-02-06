import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = process.env.base_url;

export const useGETBusinesses = (businessId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["business", { businessId }],
    queryFn: () => {
      return fetch(
        `${API_BASE_URL}/businesses`,
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


export const useCreateBusiness = (token, options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(
        `${API_BASE_URL}/businesses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      ).then((res) => res.json());
    },
  });
};

export const useCopyAPIKey = (businessId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["APIKey", { businessId }],
    queryFn: () => {
      return fetch(
        `${API_BASE_URL}/businesses/${businessId}/api-key`,
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

export const useResetAPI = (token, options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(
       ` ${API_BASE_URL}/businesses/f61b0c3d-3455-43eb-ba7f-a67cf1de11a6/api-key/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      ).then((res) => res.json());
    },
  });
};


export const useGetBusinessTransaction = (businessTransactionId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["businessTransaction", { businessTransactionId }],
    queryFn: () => {
      return fetch(
        `${API_BASE_URL}/businesses/${businessTransactionId}/transactions`,
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

