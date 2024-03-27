import { GatsbyNode } from "gatsby";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
    actions,
    graphql,
}) => {
    const { createPage } = actions;
    const result = await graphql<{
        contentfulLandingPage: { sections: { slug: string }[] };
    }>(`
        query {
            contentfulLandingPage(title: { eq: "Home" }) {
                sections {
                    slug
                }
            }
        }
    `);

    // Check for errors
    if (result.errors) {
        throw result.errors;
    }

    const projects = result?.data?.contentfulLandingPage.sections as {
        slug: string;
    }[];
    projects.forEach((elem, index) => {
        const previous = index === 0 ? null : projects[index - 1].slug;
        const next =
            index === projects.length - 1 ? null : projects[index + 1].slug;
        createPage({
            path: elem.slug,
            component: path.resolve(__dirname, "./src/templates/Project.tsx"),
            context: {
                slug: elem.slug,
                previous,
                next,
            },
        });
    });
};
