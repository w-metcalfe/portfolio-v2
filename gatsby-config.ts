import type { GatsbyConfig } from "gatsby";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const config: GatsbyConfig = {
    siteMetadata: {
        title: `wm-portfolio`,
        siteUrl: `https://williammetcalfe.ca`,
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        "gatsby-plugin-typescript",
        {
            resolve: "@chakra-ui/gatsby-plugin",
            options: {
                /**
                 * @property {boolean} [resetCSS=true]
                 * if false, this plugin will not use `<CSSReset />
                 */
                resetCSS: true,
                /**
                 * @property {number} [portalZIndex=undefined]
                 * The z-index to apply to all portal nodes. This is useful
                 * if your app uses a lot z-index to position elements.
                 */
                portalZIndex: undefined,
            },
        },
        {
            resolve: "gatsby-source-contentful",
            options: {
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                spaceId: process.env.CONTENTFUL_SPACE_ID,
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/portfolio-favicon.svg",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
    ],
};

export default config;
