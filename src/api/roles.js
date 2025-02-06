import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = process.env.base_url;

export const useCreateRole = (token, options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(
        `${API_BASE_URL}/roles`,
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

export const useUpdateRole = (token, options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(
        `${API_BASE_URL}/teams/account/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      ).then((res) => res.json());
    },
  });
};