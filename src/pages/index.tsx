import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { Layout } from "../components/Layout";
import { Stack } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { ProjectPreview } from "../components/ProjectPreview";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEO";

type Props = PageProps<{
    contentfulLandingPage: {
        hero: Queries.HeroComponentFragment;
        sections: Queries.ProjectPreviewComponentFragment[];
        footer: Queries.FooterComponentFragment;
    };
}>;
const IndexPage: React.FC<Props> = ({ data }) => {
    const { hero, sections, footer } = data.contentfulLandingPage;
    return (
        <main>
            <Layout>
                <Stack maxWidth={"xl"} w={"full"} paddingX={15}>
                    <Hero {...hero} />
                    <Stack marginTop={100} gap={8}>
                        {sections.map((section) => (
                            <ProjectPreview key={section.title} {...section} />
                        ))}
                    </Stack>
                    <Footer footer={footer} />
                </Stack>
            </Layout>
        </main>
    );
};

export default IndexPage;

export const Head: HeadFC<{
    contentfulLandingPage: { seoMetadata: Queries.SeoComponentFragment };
}> = ({ data }) => {
    return <SEOHead data={data.contentfulLandingPage.seoMetadata} />;
};

export const query = graphql`
    fragment ProjectSlugQuery on ContentfulLandingPage {
        sections {
            slug
        }
    }

    query {
        contentfulLandingPage(title: { eq: "Home" }) {
            hero {
                ...HeroComponent
            }
            sections {
                ...ProjectPreviewComponent
            }
            footer {
                ...FooterComponent
            }
            seoMetadata {
                ...SeoComponent
            }
        }
    }
`;
