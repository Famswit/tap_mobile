import { useMutation } from "@tanstack/react-query";

export const useCreateRole = (token, options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(
        "https://settlement-staging.azurewebsites.net/api/v1/app/roles",
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
        "https://settlement-staging.azurewebsites.net/api/v1/app/teams/account/role",
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