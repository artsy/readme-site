import Link from 'next/link';
import Head from 'next/head'
import styles from '../../styles/docs.module.css';
import { Fragment } from 'react';

export default function Docs({ sections, sectionDocs }) {
    return (
        <div className="container">
            <Head>
                <title>Docs</title>
            </Head>
            <h1>Docs</h1>
                {sections.map(section => (
                  <Fragment key={section.sha}>
                    <h3 key={section.title}>{section.title}</h3>
                    {<ul className={styles.docs}>
                      {sectionDocs[section.title].map(doc => doc.slug).map(slug => {
                        return (
                          <li key={section.title+"+"+slug}>
                            <Link href={`/docs/${section.title}/${slug}`}>
                              {slug}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>}
                  </Fragment>
                ))}

        </div>
    );
}

export async function getStaticProps() {
  let res = await fetch('https://api.github.com/repos/artsy/README/contents',
    {
      headers: {'Authorization': `token ${process.env.GITHUB_TOKEN}`}
    });
  let data = await res.json();
  const sections = data.reduce((result, artifact) => {
        if (artifact.type === 'dir' && artifact.name.charAt(0) !== '.') {
            if (artifact.name !== 'scripts') {
              result.push({
                  title: artifact.name,
                  sha: artifact.sha.slice(0, 5),
              });
            }
        }
        return result;
    }, []);

    const sectionContents = await Promise.all(sections.map(async section => {
    let d = {};
      const res = await fetch(`https://api.github.com/repos/artsy/README/contents/${section.title}`,
        {
          headers: {'Authorization': `token ${process.env.GITHUB_TOKEN}`}
        });
      const data = await res.json();
      let docs = data.reduce((result, artifact) => {
          if (artifact.type === 'file' && artifact.name.includes('.md')) {
              result.push({
                slug: artifact.name.slice(0, artifact.name.indexOf('.md')),
                sha: artifact.sha,
              });
          }
          return result;
      }, []);
      if (docs.length > 0) {
        d[section.title] = docs;
      }
      docs = [];
    return d;
  }));
  let sectionDocs = Object.assign({}, ...sectionContents);

  return {
      props: {
        sections,
        sectionDocs,
      },
  };
}
