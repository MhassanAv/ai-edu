import { ChakraProvider } from "@chakra-ui/react";
import { fonts } from "@/lib/fonts";
import theme from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
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
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
