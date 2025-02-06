import {useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = process.env.base_url;

export const useGetTeams = (teamId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["teams", { teamId }],
    queryFn: () => {
      return fetch(
        `${API_BASE_URL}/teams`,
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
        `${API_BASE_URL}/teams/invite-api`,
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
        `${API_BASE_URL}/teams/account/${teamId}/permissions`,
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