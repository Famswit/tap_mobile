import {useMutation, useQuery } from "@tanstack/react-query";



export const useGetSettingsProfile = (settingsProfileId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["settingsProfile", { settingsProfileId }],
    queryFn: () => {
      return fetch(
        `https://settlement-staging.azurewebsites.net/api/v1/app/settings/profile`,
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
        "https://settlement-staging.azurewebsites.net/api/v1/app/settings/profile/password",
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