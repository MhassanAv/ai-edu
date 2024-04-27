import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

const stylesTheme = {
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
  config: {
    initialColorMode: "system",
  },
  fonts: {
    heading: "var(--font-poppins)",
    body: "var(--font-open-sans)",
  },
  fontSizes: {
    title: "clamp(2rem,4.167vw,5rem)", //80px
    subTitle: "clamp(1.5rem,1.563vw,1.875rem)", //30px
    fontContact: "clamp(2rem,3.125vw,3.75rem)", //60px
    secSubTilte: "clamp(1.3rem,2.083vw,2.5rem)", //40px
    fontContactSec: "clamp(1.5rem,2.083vw,2.5rem)", //40px
    textSizeReg: "clamp(1rem,1.3vw,2rem)", //32px
    textSize: "clamp(1rem,1.302vw,1.563rem)", //25px
  },
  colors: {
    prim: "#6161A8",
    sec: "#A53594",
    headings: "#333333",
    text: "black",
    textLight: "#666666",
    bg: "#f2f2fc",
  },
  styles: {
    global: (props) => ({
      "body,html": {
        postion: "relative",
        fontSize: "16px",
        color: props.colorMode === "dark" ? "white" : "black",
        backgroundColor: props.colorMode === "dark" ? "black" : "bg",
        w: "100%",
        padding: "0",
        margin: "0",
        scrollBehavior: "smooth",
        fontFamily: "var(--font-open-sans)",
        fontWeight:'400'
      },
        input:{
        '_autofill':{
          'WebkitBoxShadow': props.colorMode !== 'dark'?"0 0 0 30px var(--chakra-colors-bg) inset !important":"0 0 0 30px black inset !important",
'WebkitTextFillColor': props.colorMode !== 'dark'?"black !important":"white !important"}
        },
      "h1,h2,h3,h4,h5,h6": {
        fontFamily: "var(--font-poppins)",
      },
      "::-webkit-scrollbar-track": {
        background: "blackAlpha.800",
      },
      "::-webkit-scrollbar": {
        width: "5px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "prim",
        borderRadius: "full",
      },
    }),
  },
};

const theme = extendTheme(stylesTheme);

export default theme;
