import { useMutation } from "@tanstack/react-query";

export const useForgetPassword = (options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch("https://settlement-staging.azurewebsites.net/api/v1/app/account/forget-password", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });
};


export const useResetPassword = (options = {}) => {
    return useMutation({
      ...options,
      mutationFn: (data) => {
        return fetch("https://settlement-staging.azurewebsites.net/api/v1/app/account/reset-password", {
          method: "POST",
          body: JSON.stringify(data),
        });
      },
    });
  };

  
