import { useQuery } from "@tanstack/react-query";


export const useGetPermission = (permissionId, options = {}) => {
  return useQuery({
    ...options,
    queryKey: ["permission", { permissionId }],
    queryFn: () => {
      return fetch(
        `https://settlement-staging.azurewebsites.net/api/v1/app/permissions`,
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

