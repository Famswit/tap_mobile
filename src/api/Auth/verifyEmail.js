import { useMutation } from "@tanstack/react-query";


const API_BASE_URL = process.env.base_url;

export const useVerifyEmail = (options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(
        `${API_BASE_URL}/account/verify-otp`,
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


