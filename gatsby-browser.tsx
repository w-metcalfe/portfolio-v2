import "@fontsource-variable/inter";
import "./src/styles/global.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./src/@chakra-ui/gatsby-plugin/theme";
import { GatsbyBrowser } from "gatsby";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
    element,
}) => {
    return <ChakraProvider theme={theme}>{element}</ChakraProvider>;
};
