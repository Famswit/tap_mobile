import { useMutation } from "@tanstack/react-query";

export const useLoginUser = (options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(
        "https://settlement-staging.azurewebsites.net/api/v1/app/account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        }
      ).then((res) => res.json());
    },
  });
};


