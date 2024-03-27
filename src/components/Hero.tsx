import React from "react";
import { graphql } from "gatsby";
import { Box, Heading, Stack, useTheme } from "@chakra-ui/react";
import { RichText } from "./RichText";

export const Hero = (props: Queries.HeroComponentFragment) => {
    const theme = useTheme();
    const { h2 } = theme.textStyles;
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
        </Stack>
    );
};

export const query = graphql`
    fragment HeroComponent on ContentfulHero {
        title
        content {
            raw
        }
    }
`;
