import { graphql, Link, navigate } from "gatsby";
import React, { useRef } from "react";
import {
    Box,
    Button,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
    useTheme,
} from "@chakra-ui/react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionButton = motion(Button);
export const ProjectPreview = (
    props: Queries.ProjectPreviewComponentFragment,
) => {
    const theme = useTheme();
    const { h2 } = theme.textStyles;
    const linkColor = useColorModeValue("gray.900", "gray.50");
    const yearColor = useColorModeValue("gray.600", "gray.300");

    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {
        once: true,
    });

    function getMotionProps(index: number) {
        return {
            initial: "hidden",
            animate: inView ? "visible" : "hidden",
            variants: {
                hidden: { opacity: 0, y: -50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.15 * index },
                },
            },
        };
    }

    return (
        <Stack ref={ref} paddingY={8}>
            <MotionHeading
                {...getMotionProps(0)}
                fontSize={h2.fontSize}
                lineHeight={h2.lineHeight}
                as={"h2"}
                marginBottom={2}
            >
                {props.title}
            </MotionHeading>
            <MotionText
                {...getMotionProps(1)}
                fontSize={{ base: 16 }}
                marginBottom={1}
                color={yearColor}
            >
                {props.yearFrom ? `${props.yearFrom} - ` : ""}
                {props.yearTo}
            </MotionText>
            <MotionImage
                {...getMotionProps(2)}
                borderRadius={"xl"}
                cursor={"pointer"}
                onClick={() => navigate("/" + props.slug ?? "")}
                src={props.image?.file?.url ?? ""}
                alt={props.image?.title ?? ""}
                _hover={{ shadow: "sm" }}
            />
            <MotionText
                {...getMotionProps(3)}
                marginY={6}
                style={{ whiteSpace: "pre-wrap" }}
                textStyle={"p"}
            >
                {props.description?.description}
            </MotionText>
            <MotionButton
                {...getMotionProps(4)}
                color={linkColor}
                textDecoration={"none"}
                _hover={{ color: "blue.500" }}
                as={Link}
                to={props.slug ?? ""}
                justifyContent={"flex-start"}
                variant={"link"}
                rightIcon={<IconArrowNarrowRight />}
            >
                Learn More
            </MotionButton>
        </Stack>
    );
};

export const query = graphql`
    fragment ProjectPreviewComponent on ContentfulProjectPage {
        contentful_id
        title
        yearFrom
        yearTo
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
    }
`;
