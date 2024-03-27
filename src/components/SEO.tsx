import React from "react";
import { graphql } from "gatsby";

export const SEOHead = ({ data }: { data: Queries.SeoComponentFragment }) => {
    const {
        title,
        description,
        // keywords,
        image,
        noIndex,
        noFollow,
    } = data ?? {
        title: "William Metcalfe",
        description:
            "I'm a UX & Product Designer creating seamless digital experiences through human-centred research and design.",
        // keywords: ["Keywords"],
        image: { url: "src/images/portfolio-favicon.svg" },
        noIndex: false,
        noFollow: false,
    };

    return (
        <>
            <meta charSet="utf-8" />
            <title>{title}</title>
            {description && (
                <meta
                    name="description"
                    property="og:description"
                    content={description.description ?? ""}
                />
            )}
            {/* {keywords && <meta name="keywords" content={keywords.join(",")} />} */}
            {/* Use the following meta tag if you want to prevent this page from being indexed */}
            {noIndex && <meta name="robots" content="noindex" />}
            {noFollow && <meta name="robots" content="nofollow" />}
            <meta property="og:title" content={title ?? ""} />
            {image && <meta property="og:image" content={image.url ?? ""} />}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title ?? ""} />
            {description && (
                <meta
                    name="twitter:description"
                    content={description.description ?? ""}
                />
            )}
            {image && <meta name="twitter:image" content={image.url ?? ""} />}
        </>
    );
};

export const query = graphql`
    fragment SeoComponent on ContentfulSeoMetadata {
        title
        description {
            description
        }
        noFollow
        noIndex
        image {
            url
        }
    }
`;
