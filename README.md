# Portfolio Overview

This document provides an overview of a Gatsby project designed to create a performance-optimized website with dynamic content sourced from Contentful. Gatsby is a modern web framework that enables developers to build fast, scalable sites with React.

## Introduction to Gatsby

Gatsby is a static site generator that allows for building websites that are fast, secure, and can pull data from various sources like Markdown files, APIs, databases, and more. It leverages React for UI, GraphQL for data management, and webpack for bundling. Gatsby's key feature is its ability to pre-render pages at build time, improving load times, SEO, and user experience.

## Key Files Explained

### `gatsby-config.ts`

This configuration file defines the site's metadata, plugins, and other global settings. It specifies essential details like the site's title and URL and integrates various plugins for TypeScript support, UI components (Chakra UI), content sourcing (Contentful), image optimization, and SEO enhancements.

### `gatsby-node.ts`

Contains Node.js code for customizing the build process, particularly for dynamically creating pages. It uses the `createPages` API to query Contentful for project sections and generate a page for each, using a specific template and providing context for navigation.

### `gatsby-browser.tsx` & `gatsby-ssr.tsx`

Both deal with wrapping the application or pages with additional components. They use `ChakraProvider` from Chakra UI to ensure consistent styling. `gatsby-browser.tsx` is for browser-side rendering, and `gatsby-ssr.tsx` is for server-side rendering.

### `src/pages/index.tsx`

The main page, showcasing a hero section, project previews, and a footer. It is structured and styled using Chakra UI components and fetches data from Contentful.

### `src/templates/Project.tsx`

A template for detailed project pages, including SEO setup and project information. It is dynamically rendered for each project section based on configurations in `gatsby-node.ts`.

### `src/components/`

Contains reusable React components like `Hero.tsx`, `ProjectPreview.tsx`, and `Footer.tsx`, which are used across the site for consistent layouts and styling. These components fetch their data from Contentful using GraphQL fragments.

## Enhancing SEO with the SEO Component and Head Export

One of the standout features of this Gatsby project is the custom SEO component designed to enhance the search engine optimization of your pages. This component is crucial for defining meta tags that improve the visibility and ranking of your pages on search engines.

### SEO Component Overview

The SEO component (`src/components/SEO.tsx`) is a React component that generates meta tags based on the props it receives, such as title, description, and image. These meta tags are essential for SEO, as they provide search engines with key information about the content of your pages, enabling better indexing and ranking.

### Usage with Gatsby's Head Component

Gatsby provides a special `Head` component allowing you to modify the `<head>` section of your HTML document on a per-page basis. The SEO component is utilized within this `Head` component to inject the relevant SEO meta tags into the `<head>` of each page.

#### Example Integration in a Page Template

In `src/templates/Project.tsx`, the `Head` component is exported as follows:

```tsx
export const Head: HeadFC<{
    contentfulProjectPage: { seoMetadata: Queries.SeoComponentFragment };
}> = ({ data }) => {
    return <SEOHead data={data.contentfulProjectPage.seoMetadata} />;
};
```

## Development Workflow

1. **Setup**: Create a .env file with your Contentful API keys and space ID.
   The env should look like this, and be in your root directory:
   ```env
    CONTENTFUL_SPACE_ID=your_space_id
    CONTENTFUL_ACCESS_TOKEN=your_access_token

2. **Development:** Start the development server with `gatsby develop` to view changes in real-time.
3. **Building:** Compile the site into static files for deployment with `gatsby build`.
4. **Deployment:** Push your branch to GitHub and Netlify will automatically deploy the site.

## Setting Up Node Environment with NVM

Node Version Manager (NVM) allows you to manage multiple installations of Node.js. It's especially useful for ensuring compatibility across different projects.

1. **Install NVM:**
    - **Mac:** Using Homebrew: `brew install nvm`.
      - If you get `nvm: command not found`, add the following to your `~/.zshrc` or `~/.bashrc` file:
        ```bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
        ```
        or
      - `source $(brew --prefix nvm)/nvm.sh`
    - **Linux/Unix/Mac:** Run the install script from the [NVM GitHub page](https://github.com/nvm-sh/nvm#installing-and-updating).
    - **Windows:** Use the [nvm-windows](https://github.com/coreybutler/nvm-windows) variant.
    
2. **Install Node.js:**
   After installing NVM, close and reopen your terminal. Then, install Node.js by running:
   ```bash
   nvm install node
   nvm use lts/hydrogen
    ```
   We're using the latest LTS version (lts/hydrogen) for this project.

## 🚀 Quick start

1 **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd wm-portfolio/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
