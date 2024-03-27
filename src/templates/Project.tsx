import { graphql, HeadFC } from "gatsby";
import React from "react";
import { Project, ProjectProps } from "../components/Project";
import { SEOHead } from "../components/SEO";

export const ProjectTemplate: React.FC<ProjectProps> = (props) => {
    return <Project {...props} />;
};

export const Head: HeadFC<{
    contentfulProjectPage: { seoMetadata: Queries.SeoComponentFragment };
}> = ({ data }) => {
    return <SEOHead data={data.contentfulProjectPage.seoMetadata} />;
};

export const query = graphql`
    query ($slug: String!) {
        contentfulProjectPage(slug: { eq: $slug }) {
            ...ProjectComponent
        }
    }
`;

export default ProjectTemplate;
