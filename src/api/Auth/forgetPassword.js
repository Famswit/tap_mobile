import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export const useForgetPassword = (options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(`${API_BASE_URL}/account/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
  });
};


export const useResetPassword = (options = {}) => {
    return useMutation({
      ...options,
      mutationFn: (data) => {
        return fetch(`${API_BASE_URL}/account/reset-password`, {
          method: "POST",
          body: JSON.stringify(data),
        });
      },
    });
  };

  
