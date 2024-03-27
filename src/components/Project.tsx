import { graphql, navigate, PageProps } from "gatsby";
import React from "react";
import { Layout } from "./Layout";
import {
    Button,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
    useTheme,
} from "@chakra-ui/react";
import { RichText } from "./RichText";
import { Footer } from "./Footer";

export type ProjectContext = {
    slug: string;
    previous: string | null;
    next: string | null;
};
export type ProjectProps = PageProps<
    {
        contentfulProjectPage: Queries.ProjectComponentFragment;
    },
    ProjectContext
>;

export const Project: React.FC<ProjectProps> = ({ data, pageContext }) => {
    const { contentfulProjectPage: props } = data;
    const theme = useTheme();
    const { h2 } = theme.textStyles;
    const linkColor = useColorModeValue("gray.600", "gray.300");
    const yearColor = useColorModeValue("gray.600", "gray.300");
    return (
        <Layout>
            <Stack
                maxWidth={"xl"}
                w={"full"}
                paddingX={15}
                paddingY={8}
                justifyContent={"flex-start"}
            >
                <Button
                    color={linkColor}
                    textDecoration={"none"}
                    _hover={{ color: "blue.500" }}
                    variant={"link"}
                    justifyContent={"flex-start"}
                    onClick={() => navigate("/")}
                >
                    Back
                </Button>
                <Heading textStyle={"h2"} as={"h2"} fontSize={h2.fontSize}>
                    {props.title}
                </Heading>
                <Text fontSize={{ base: 16 }} color={yearColor}>
                    {props.yearFrom ? `${props.yearFrom} - ` : ""}
                    {props.yearTo}
                </Text>
                <Image
                    borderRadius={"xl"}
                    src={props.image?.file?.url ?? ""}
                    alt={props.image?.title ?? ""}
                />
                <RichText {...props.content} />
                <Footer footer={props.footer!} context={pageContext} />
            </Stack>
        </Layout>
    );
};
export const query = graphql`
    fragment ProjectComponent on ContentfulProjectPage {
        title
        yearFrom
        yearTo
        content {
            raw
            references {
                ... on ContentfulAsset {
                    contentful_id
                    file {
                        url
                    }
                    filename
                }
                ... on ContentfulLinkWithIcon {
                    ...LinkWithIconComponent
                }
            }
        }
        description {
            description
        }
        slug
        image {
            title
            file {
                url
            }
        }
        footer {
            title
            resume {
                file {
                    url
                }
            }
        }
        seoMetadata {
            ...SeoComponent
        }
    }
`;
