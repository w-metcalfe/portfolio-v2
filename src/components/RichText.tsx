import {
    BLOCKS,
    MARKS,
    INLINES,
    Text as ContentfulText,
} from "@contentful/rich-text-types";
import {
    RenderNode,
    documentToReactComponents,
    Options,
} from "@contentful/rich-text-react-renderer";
import React from "react";
import {
    Box,
    Heading,
    ListItem,
    OrderedList,
    UnorderedList,
    Text,
    Link,
    Image,
    useColorModeValue,
} from "@chakra-ui/react";

const defaultNodeRenderers: RenderNode = {
    [BLOCKS.PARAGRAPH]: (node, children) => {
        // console.log("Children: ", children);
        const processedChildren = (children as React.ReactNode[])?.flatMap(
            (child) => {
                if (typeof child === "string") {
                    // Split the string by newline characters to get an array of strings
                    const parts = child.split("\n");
                    // Convert array of strings to array of strings and <br />, removing the last <br />
                    return parts.flatMap((part, index) =>
                        index < parts.length - 1
                            ? [part, <br key={index} />]
                            : part,
                    );
                }
                // Return non-string children as is
                return child;
            },
        );

        // if (
        //     typeof children === "string" ||
        //     ((children as React.ReactNode[]).length === 1 &&
        //         (children as React.ReactNode[])[0] === "")
        // ) {
        //     return <></>;
        //     // return <Text mb={4}>&nbsp;</Text>;
        // }
        // if (children == null) return <></>;
        // // @ts-ignore
        // if (typeof children[0] === "object") {
        //     if (
        //         // @ts-ignore
        //         children[0].props.children === "\n" ||
        //         // @ts-ignore
        //         children[0].props.children.trim() === ""
        //     ) {
        //         return <br />;
        //     }
        // }
        // console.log("Returning Default");
        return (
            <Text mb={4} textStyle={"p"}>
                {processedChildren}
            </Text>
        );
    },
    [BLOCKS.HEADING_1]: (node, children) => (
        <Heading as="h1" size="xl" mb={4}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
        <Heading as="h2" size="lg" mb={4}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
        <Heading as="h3" size="md" mb={4}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
        <Heading as="h4" size="sm" mb={4}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
        <Heading as="h5" size="xs" mb={4}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
        <Heading as="h6" mb={4}>
            {children}
        </Heading>
    ),
    [BLOCKS.UL_LIST]: (node, children) => {
        return (
            <UnorderedList
                display={"flex"}
                flexWrap={"wrap"}
                columnGap={"40px"}
                lineHeight={"12px"}
                mb={4}
            >
                {children}
            </UnorderedList>
        );
    },
    [BLOCKS.OL_LIST]: (node, children) => (
        <OrderedList mb={4}>{children}</OrderedList>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.QUOTE]: (node, children) => (
        <Box
            as="blockquote"
            borderLeft="4px solid"
            borderColor="gray.200"
            pl={4}
            mb={4}
        >
            {children}
        </Box>
    ),

    [INLINES.HYPERLINK]: (node) => {
        const { uri } = node.data;
        const linkColor = useColorModeValue("gray.900", "gray.50");
        return (
            <Link
                fontWeight={700}
                href={uri as string}
                color={linkColor}
                _hover={{ color: "blue.500", textDecoration: "underline" }}
                isExternal
            >
                {(node.content[0] as ContentfulText).value}
            </Link>
        );
    },
};

export function RichText(text: { raw?: any; references?: any }) {
    const { raw, references } = text;
    const referenceMap = new Map();
    references?.forEach((elem: any) => {
        referenceMap.set(elem.contentful_id, elem);
    });

    if (Object.keys(text).length === 0) {
        return <>Empty Text.</>;
    }
    const options: Options = {
        renderMark: {
            [MARKS.BOLD]: (text) => <Text as="b">{text}</Text>,
            [MARKS.ITALIC]: (text) => <Text as="i">{text}</Text>,
            [MARKS.UNDERLINE]: (text) => <Text as="u">{text}</Text>,
        },
        renderNode: {
            ...defaultNodeRenderers,
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const asset = referenceMap.get(node.data.target.sys.id);
                return (
                    <Image
                        src={asset?.file.url}
                        alt={asset?.title}
                        style={{ maxWidth: "100%" }}
                    />
                );
            },
        },
    };

    try {
        return documentToReactComponents(JSON.parse(raw as string), options);
    } catch (err) {
        console.error("Error Rendering Rich Text: ", err);
        return <></>;
    }
}
