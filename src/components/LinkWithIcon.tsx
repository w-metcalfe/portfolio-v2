import React, { useMemo } from "react";
import { graphql } from "gatsby";
import { Link, useColorModeValue } from "@chakra-ui/react";
import { LazyIcon } from "./LazyIcon";

const LinkWithIcon = (props: Queries.LinkWithIconComponentFragment) => {
    const linkColor = useColorModeValue("gray.900", "gray.50");
    const Icon = useMemo(() => {
        return <LazyIcon iconName={props.icon ?? ""} />;
    }, [props.icon]);

    return (
        <Link
            display={"flex"}
            alignContent={"center"}
            href={props.link ?? ""}
            fontWeight={700}
            color={linkColor}
            _hover={{ color: "blue.500", textDecoration: "underline" }}
            isExternal
        >
            <span>{props.title}</span>
            {Icon}
        </Link>
    );
};

export { LinkWithIcon };

export const query = graphql`
    fragment LinkWithIconComponent on ContentfulLinkWithIcon {
        contentful_id
        link
        title
        icon
        internal {
            type
        }
    }
`;
