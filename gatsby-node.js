exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql(`
    query Projects {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.nodes.forEach(({ frontmatter: { slug } }) => {
    createPage({
      path: `/projects/${slug}`,
      component: require.resolve('./src/templates/project-details.js'),
      context: {
        slug,
      },
    });
  });
};
