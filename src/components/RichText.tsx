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
    CommonNode,
} from "@contentful/rich-text-react-renderer";
import React, { Key } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { LinkWithIcon } from "./LinkWithIcon";

function createUniqueId(): Key {
    return `rich-text-id-${uuidv4()}`;
}

const defaultNodeRenderers: RenderNode = {
    [BLOCKS.PARAGRAPH]: (node, children) => {
        const processedChildren = (children as React.ReactNode[])?.flatMap(
            (child) => {
                if (typeof child === "string") {
                    // Split the string by newline characters to get an array of strings
                    const parts = child.split("\n");
                    // Convert array of strings to array of strings and <br />, removing the last <br />
                    return parts.flatMap((part, index) =>
                        index < parts.length - 1
                            ? [part, <br key={createUniqueId()} />]
                            : part,
                    );
                }
                // Return non-string children as is
                return child;
            },
        );
        return (
            <Text mb={4} textStyle={"p"} key={createUniqueId()}>
                {processedChildren}
            </Text>
        );
    },
    [BLOCKS.HEADING_1]: (node, children) => (
        <Heading as="h1" size="xl" mb={4} key={createUniqueId()}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
        <Heading as="h2" size="lg" mb={4} key={createUniqueId()}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
        <Heading as="h3" size="md" mb={4} key={createUniqueId()}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
        <Heading as="h4" size="sm" mb={4} key={createUniqueId()}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
        <Heading as="h5" size="xs" mb={4} key={createUniqueId()}>
            {children}
        </Heading>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
        <Heading as="h6" mb={4} key={createUniqueId()}>
            {children}
        </Heading>
    ),
    [BLOCKS.UL_LIST]: (node, children) => {
        return (
            <UnorderedList
                key={createUniqueId()}
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
        <OrderedList mb={4} key={createUniqueId()}>
            {children}
        </OrderedList>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.QUOTE]: (node, children) => (
        <Box
            key={createUniqueId()}
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
                key={createUniqueId()}
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

// Add more types here with | for unions if we ever reference new entries in Rich Text.
type References =
    | Queries.LinkWithIconComponentFragment
    | Queries.ContentfulAsset;

const EmbeddedEntryComponents: { [key: string]: any } = {
    ContentfulLinkWithIcon: LinkWithIcon,
};

function renderEntry<T extends CommonNode>(
    node: T,
    referenceMap: Map<string, References>,
) {
    const entry = referenceMap.get(node.data.target.sys.id);
    try {
        if (entry != null) {
            const { type: componentType } = entry.internal;
            const Component =
                EmbeddedEntryComponents[
                    componentType as keyof typeof EmbeddedEntryComponents
                ];
            if (Component) {
                return <Component key={createUniqueId()} {...entry} />;
            }
        }
    } catch (err) {
        console.error(
            "Could not render custom component: ",
            node.data.target.sys.id,
            err,
        );
    }
    return <></>;
}

export function RichText(text: { raw?: any; references?: any }) {
    const { raw, references } = text;

    const referenceMap: Map<string, References> = new Map();
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
            [INLINES.EMBEDDED_ENTRY]: (node) => {
                return renderEntry<typeof node>(node, referenceMap);
            },
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                return renderEntry<typeof node>(node, referenceMap);
            },
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                console.log("Embedded Asset: ", node);
                const asset = referenceMap.get(
                    node.data.target.sys.id,
                ) as Queries.ContentfulAsset;
                if (asset) {
                    if (asset?.file?.url == null) return <></>;
                    return (
                        <Image
                            key={createUniqueId()}
                            src={asset.file.url}
                            alt={asset?.title ?? ""}
                            style={{ maxWidth: "100%" }}
                        />
                    );
                }
                console.error(
                    "Could not find asset with id: ",
                    node.data.target.sys.id,
                );
                return <></>;
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
