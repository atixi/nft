import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Home from "/Components/home/index";
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
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
