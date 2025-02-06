import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = process.env.base_url;

export const useGetPermission = (permissionId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["permission", { permissionId }],
    queryFn: () => {
      return fetch(
        `${API_BASE_URL}/permissions`,
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

