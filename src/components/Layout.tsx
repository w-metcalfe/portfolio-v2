import { Flex } from "@chakra-ui/react";
import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex justifyContent={"center"} marginTop={120}>
            {children}
        </Flex>
    );
};
