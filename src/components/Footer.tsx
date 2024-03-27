import { graphql, Link } from "gatsby";
import React from "react";
import { ProjectContext } from "./Project";
import {
    Box,
    Button,
    HStack,
    Stack,
    Text,
    Link as ChakraLink,
    useColorMode,
} from "@chakra-ui/react";
import {
    IconArrowNarrowLeft,
    IconArrowNarrowRight,
    IconCopyright,
    IconMoon,
    IconSun,
} from "@tabler/icons-react";

export const Footer = ({
    footer,
    context,
}: {
    footer: Queries.FooterComponentFragment;
    context?: ProjectContext;
}) => {
    function getJustifyContent() {
        if (context) {
            if (context.next != null && context.previous != null) {
                return "space-between";
            }
            if (context.next == null) {
                return "flex-start";
            }
            if (context.previous == null) {
                return "flex-end";
            }
        }
        return "space-between";
    }

    console.log(context);

    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box as={"footer"} paddingY={8}>
            <Stack gap={10}>
                {context && (
                    <HStack justifyContent={getJustifyContent()}>
                        {context.previous && (
                            <Button
                                as={Link}
                                to={"/" + context.previous}
                                textDecoration={"none"}
                                _hover={{ color: "blue.500" }}
                                leftIcon={<IconArrowNarrowLeft />}
                                variant={"link"}
                            >
                                Back
                            </Button>
                        )}
                        {context.next && (
                            <Button
                                as={Link}
                                to={"/" + context.next}
                                textDecoration={"none"}
                                _hover={{ color: "blue.500" }}
                                rightIcon={<IconArrowNarrowRight />}
                                variant={"link"}
                            >
                                Next
                            </Button>
                        )}
                    </HStack>
                )}
                <HStack justifyContent={"space-between"}>
                    <Text
                        color={"gray.500"}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                    >
                        <IconCopyright size={18} /> {new Date().getFullYear()}{" "}
                        {footer.title}
                    </Text>
                    <Button
                        size={"sm"}
                        rightIcon={
                            colorMode === "light" ? <IconSun /> : <IconMoon />
                        }
                        onClick={toggleColorMode}
                    >
                        Color Mode
                    </Button>
                    <Button
                        as={ChakraLink}
                        href={footer.resume?.file?.url ?? ""}
                        isExternal={true}
                        color={"gray.500"}
                        variant={"link"}
                        textDecoration={"none"}
                        _hover={{ color: "blue.500", textDecoration: "none" }}
                    >
                        Resume
                    </Button>
                </HStack>
            </Stack>
        </Box>
    );
};

export const query = graphql`
    fragment FooterComponent on ContentfulFooter {
        title
        resume {
            file {
                url
            }
        }
    }
`;
