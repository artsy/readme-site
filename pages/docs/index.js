import Link from 'next/link';
import Head from 'next/head'
import styles from '../../styles/docs.module.css';
import fs from 'fs';
import { Converter } from 'showdown';

export default function Docs({ docs }) {
    return (
        <div className="container">
            <Head>
                <title>Docs</title>
            </Head>
            <h1>Docs</h1>
            <p>View our docs:</p>
            <ul className={styles.docs}>
                {docs.map((doc) => (
                    <li key={doc.slug}>
                        <Link href={`/docs/${doc.slug}`}>
                            {doc.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function getStaticProps() {
  const files = fs.readdirSync('docs');
  const docs = files.map((file) => {
      const doc = file.slice(0, file.indexOf('.md'));
      const content = fs.readFileSync(`docs/${doc}.md`, 'utf8');
      const converter = new Converter({ metadata: true });
      converter.makeHtml(content);
      const meta = converter.getMetadata();
      const { title } = meta;
      return {
          slug: doc,
          title,
      };
  });
  return {
      props: {
          docs,
      },
  };
}
