import {useMutation, useQuery } from "@tanstack/react-query";


const API_BASE_URL = process.env.base_url;

export const useGetSettingsProfile = (settingsProfileId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["settingsProfile", { settingsProfileId }],
    queryFn: () => {
      return fetch(
        `${API_BASE_URL}/settings/profile`,
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

export const useChangePasswordProfile = (token, options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(
        `${API_BASE_URL}/settings/profile/password`,
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