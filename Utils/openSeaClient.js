import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://api.opensea.io/api/v1",
});
apiClient.headers["Authorization"] = "";
apiClient.addAsyncRequestTransform(async (request) => {
  // const authToken = await authStorage.getToken();
  // if (!authToken) return;
  // request.headers["x-auth-token"] = authToken;
  // request.headers["X-API-KEY"] = "Bearer " + authToken;
  request.headers["X-API-KEY"] = "2e7ef0ac679f4860bbe49a34a98cf5ac";
  // request.headers["Content-Type"] = "application/json";
  // request.headers["Cache-Control"] = "no-cache";
  // request.headers["Accept"] = "application/json";
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  return response;
};

export default apiClient;
