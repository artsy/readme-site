import Link from 'next/link';
import Head from 'next/head'
import styles from '../../styles/docs.module.css';
import { Fragment } from 'react';
import { getContents } from '../../lib/github';

export default function Docs({ data }) {
  let sections = [];

  function renderFiles(files, path) {
    return (
      <>
        {files.map(file => {
          return (
            <li key={file.sha}>
              <Link href={`/docs/${path}/${file.slug}`}>
                <a>{file.slug}</a>
              </Link>
            </li>
          )
        })}
      </>
    )
  }

  function renderSection(section, path) {
    if (section.files.length === 0) {
      return null;
    }
    return(
      <Fragment key={path}>
        <h2>{path}</h2>
        <ul className={styles.docs}>
          {renderFiles(section.files, path)}
        </ul>
      </Fragment>
    )
  }

  function renderSections(data, path = 'root') {
    if (path === 'root') {
      sections.push(renderSection(data, path));
    }
    Object.keys(data.dirs).sort().map(section => {
      const subPath = path === 'root' ? `${section}` : `${path}/${section}`;
      sections.push(renderSection(data.dirs[section], subPath));

      if (Object.keys(data.dirs[section].dirs).length > 0) {
        renderSections(data.dirs[section], subPath);
      }
    })
    return sections;
  }

  return (
    <div className="container">
        <Head>
            <title>Docs</title>
        </Head>
        <h1>Docs</h1>
        {renderSections(data)}
    </div>
  );
}

export async function getStaticProps() {
  const data = await getContents('/');

  return {
      props: {
        data,
      },
  };
}
