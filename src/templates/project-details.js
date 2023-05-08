import React from 'react';
import Layout from '../components/Layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from '../styles/project-details.module.css';
import { graphql } from 'gatsby';

export default function ProjectDetails({ data }) {
  console.log('data', data);
  const { html } = data.markdownRemark;
  const { title, stack } = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <div className={styles.details}>
        <h2>{title}</h2>
        <h3>{stack}</h3>
        <div className={styles.featured}>
          <GatsbyImage
            image={getImage(data.markdownRemark.frontmatter.featuredImg)}
            alt="project"
          />
        </div>
        <div
          className={styles.html}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ProjectDetails($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        featuredImg {
          childImageSharp {
            gatsbyImageData(width: 1000)
          }
        }
        title
        stack
      }
      html
    }
  }
`;
