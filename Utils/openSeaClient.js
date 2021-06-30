import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://api.opensea.io/api/v1",
  // baseURL: "https://rinkeby-api.opensea.io/api/v1/",
  headers: {
    "X-API-KEY": "2e7ef0ac679f4860bbe49a34a98cf5ac",
    Accept: "application/json",
  },
});
apiClient.addAsyncRequestTransform(async (request) => {
  // const authToken = await authStorage.getToken();
  // if (!authToken) return;
  // request.headers["x-auth-token"] = authToken;
  // request.headers["X-API-KEY"] = "Bearer " + authToken;
  request.headers["X-API-KEY"] = "2e7ef0ac679f4860bbe49a34a98cf5ac";
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  return response;
};

export default apiClient;
