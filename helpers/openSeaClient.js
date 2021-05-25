import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://api.opensea.io/api/v1/collections?offset=0&limit=15",
});

// apiClient.addAsyncRequestTransform(async (request) => {
//   const authToken = await authStorage.getToken();
//   if (!authToken) return;
//   // request.headers["x-auth-token"] = authToken;
//   request.headers["Authorization"] = "Bearer " + authToken;
//   request.headers["Content-Type"] = "application/json";
//   request.headers["Cache-Control"] = "no-cache";
//   request.headers["Accept"] = "application/json";
// });

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  return response;
};

export default apiClient;
