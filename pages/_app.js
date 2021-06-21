import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/style.css";
import store from "../store";
import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
const defaultQueryFn = async () => {
  return new Promise((resolve) => {
    resolve(loadAsset);
  });
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
