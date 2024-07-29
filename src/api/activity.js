import { useQuery } from "@tanstack/react-query";



export const useGetActivityLog = (activityLogId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["activityLog", { activityLogId }],
    queryFn: () => {
      return fetch(
        `https://settlement-staging.azurewebsites.net/api/v1/app/activity/logs`,
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