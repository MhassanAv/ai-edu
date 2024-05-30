import { ChakraProvider } from "@chakra-ui/react";
import { fonts } from "@/lib/fonts";
import theme from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import useStore from "@/lib/store";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const { user, setUser } = useStore();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      return;
    }
  }, [setUser, user]);
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-poppins: ${fonts.poppins.style.fontFamily};
            --font-open-sans: ${fonts.openSans.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
