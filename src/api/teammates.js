import {useMutation, useQuery } from "@tanstack/react-query";


export const useGetTeams = (teamId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["teams", { teamId }],
    queryFn: () => {
      return fetch(
        `https://settlement-staging.azurewebsites.net/api/v1/app/teams`,
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


export const useInviteTeam = (token, options = {}) => {
  return useMutation({
    ...options,
    mutationFn: (data) => {
      return fetch(
        "https://settlement-staging.azurewebsites.net/api/v1/app/teams/invite",
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


export const useGetSummaryDetails = (teamId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["summary", { teamId }],
    queryFn: () => {
      return fetch(
        `https://settlement-staging.azurewebsites.net/api/v1/app/teams/account/${teamId}/permissions`,
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