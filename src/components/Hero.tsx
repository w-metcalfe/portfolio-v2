import React from "react";
import { graphql } from "gatsby";
import {
    Box,
    Button,
    Heading,
    HStack,
    Stack,
    useTheme,
    Link,
    useColorModeValue,
} from "@chakra-ui/react";
import { RichText } from "./RichText";
import { IconBrandLinkedin, IconMail } from "@tabler/icons-react";

export const Hero = (props: Queries.HeroComponentFragment) => {
    const theme = useTheme();
    const { h2 } = theme.textStyles;
    const emailBackground = useColorModeValue("black", "gray.50");
    const emailColor = useColorModeValue("white", "gray.900");
    const emailHover = useColorModeValue("gray.700", "gray.200");
    return (
        <Stack>
            <Heading
                marginBottom={8}
                as={"h1"}
                textStyle={"h1"}
                fontWeight={"bold"}
            >
                {props.title}
            </Heading>
            <Box fontSize={h2.fontSize} lineHeight={h2.lineHeight}>
                <RichText {...props.content} />
            </Box>
            <HStack gap={4} paddingTop={8}>
                <Button
                    variant={"solid"}
                    as={Link}
                    href={`mailto:${props.email}`}
                    isExternal={true}
                    _hover={{
                        backgroundColor: emailHover,
                        textDecoration: "none",
                    }}
                    backgroundColor={emailBackground}
                    leftIcon={<IconMail />}
                    color={emailColor}
                >
                    Email Me
                </Button>
                <Button
                    variant={"solid"}
                    backgroundColor={"#0072b1"}
                    color={"white"}
                    _hover={{
                        backgroundColor: "blue.500",
                        textDecoration: "none",
                    }}
                    as={Link}
                    href={props.linkedin ?? ""}
                    isExternal={true}
                    leftIcon={<IconBrandLinkedin />}
                >
                    LinkedIn
                </Button>
            </HStack>
        </Stack>
    );
};

export const query = graphql`
    fragment HeroComponent on ContentfulHero {
        title
        content {
            raw
            references {
                ... on ContentfulLinkWithIcon {
                    ...LinkWithIconComponent
                }
            }
        }
        linkedin
        email
    }
`;
