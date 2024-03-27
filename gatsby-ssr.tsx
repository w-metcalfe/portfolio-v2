import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./src/@chakra-ui/gatsby-plugin/theme";
import { GatsbySSR } from "gatsby"; // Adjust the path to where your theme is defined

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
    return (
        <ChakraProvider theme={theme}>
            {element}
        </ChakraProvider>
    );
};

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHtmlAttributes }) => {
    setHtmlAttributes({ lang: "en-CA" });
};
