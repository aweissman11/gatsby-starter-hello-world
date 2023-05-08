import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../../components/Layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import * as styles from '../../styles/projects.module.css';

export default function Projects({ data }) {
  console.log('data', data);
  const projects = data.projects.nodes;
  const { contact } = data.contact.siteMetadata;

  return (
    <Layout>
      <div className={styles.portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & Websites I've Created</h3>
        <div className={styles.projects}>
          {projects.map((project) => (
            <Link
              to={`/projects/${project.frontmatter.slug}`}
              key={project.id}
              className={styles.project}
            >
              <div>
                <GatsbyImage
                  image={getImage(project.frontmatter.thumb)}
                  alt="project thumb"
                />
                <h3>{project.frontmatter.title}</h3>
                <p>{project.frontmatter.stack}</p>
              </div>
            </Link>
          ))}
        </div>
        <p>Like what you see? Email me at {contact} for a quote!</p>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          stack
          slug
          thumb {
            childImageSharp {
              gatsbyImageData(width: 1000)
            }
          }
        }
        id
      }
    }
    contact: site {
      siteMetadata {
        contact
      }
    }
  }
`;
