import { useQuery } from "@tanstack/react-query";


const API_BASE_URL = process.env.base_url;

export const useGetActivityLog = (options = {}) => {
  return useQuery({
    queryKey: ["activityLog"],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/activity/logs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      ); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onError: (error) => {
      console.error('Error fetching transactions:', error);
    },
    ...options,
  });
};
