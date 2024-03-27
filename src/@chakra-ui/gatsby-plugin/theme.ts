import { extendTheme } from "@chakra-ui/react";

// const background = {
//     background: "#FBFBFB",
// };

// 2. Add your color mode config
const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
};

const textStyles = {
    h1: {
        fontSize: ["30px", "40px", "40px", "40px"],
        lineHeight: ["48px", "64px", "64px", "64px"],
    },
    h2: {
        fontSize: ["24px", "30px", "30px", "30px"],
        lineHeight: ["38px", "48px", "48px", "48px"],
    },
    p: {
        fontSize: ["20px", "24px", "24px", "24px"],
        lineHeight: ["32px", "38px", "38px", "38px"],
    },
};

// 3. extend the theme
const theme = extendTheme({
    config,
    fonts: {
        heading: `"Inter Variable", sans-serif`,
        body: `"Inter Variable", sans-serif`,
    },
    textStyles,
});

export default theme;
