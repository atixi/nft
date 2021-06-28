import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import "/styles/nprogress.css";
import store, { persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import Router from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import Layout from "/Components/Layout/Layout";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import NProgress from "nprogress"; //nprogress module
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }body {
  padding-top: 74px;
}
* {
  font-size: 15px;
  font-weight: 900;
}
*::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: transparent;
}
*::-webkit-scrollbar-track,
body::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 4px;
}
*::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-thumb {
  background-color: #fff;
  border-radius: 4px;
}
*::-webkit-scrollbar-thumb:hover,
body::-webkit-scrollbar-thumb:hover {
  background-color: #ccc;
}
.text-gradient {
  display: inline !important;
  font-weight: 900;
  background: -webkit-linear-gradient(
    45deg,
    rgb(20, 126, 224),
    rgb(213, 87, 252)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.rec.rec-arrow {
  position: absolute;
  background-color: #fff;
  z-index: 1;
}
.rec.rec-arrow:hover,
.rec.rec-arrow:focus:enabled {
  background-color: #fff !important;
  color: #000 !important;
}

.rec.rec-arrow-right {
  right: 0px;
}
.rec.rec-arrow-left {
  left: 0px;
}
.rec.rec-arrow:disabled {
  visibility: hidden;
}
.rec.rec-carousel {
  position: relative;
}
.rec.rec-carousel-wrapper {
  margin: 5px -20px !important;
  width: auto !important;
}

`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

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
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
