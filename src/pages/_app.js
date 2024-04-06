import { ChakraProvider } from '@chakra-ui/react'
import { fonts } from '@/lib/fonts'
import theme from '@/styles/theme'

function MyApp({ Component, pageProps }) {
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
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
  )
}

export default MyApp