import Link from 'next/link';
import Head from 'next/head'
import styles from '../../styles/docs.module.css';
// import fs from 'fs';
// import { Converter } from 'showdown';

export default function Sections({ sections }) {
    return (
        <div className="container">
            <Head>
                <title>Sections</title>
            </Head>
            <h1>Sections</h1>
            <ul className={styles.docs}>
                {sections.map(section => (
                    <li key={section.title}>
                        <Link href={`/docs/${section.title}`}>
                            {section.title}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* <ul className={styles.docs}>
                {docs.map((doc) => (
                    <li key={doc.slug}>
                        <Link href={`/docs/${doc.slug}`}>
                            {doc.title}
                        </Link>
                    </li>
                ))}
            </ul> */}

        </div>
    );
}

export async function getStaticProps() {
//   const files = fs.readdirSync('docs');
//   const docs = files.map((file) => {
//       const doc = file.slice(0, file.indexOf('.md'));
//       const content = fs.readFileSync(`docs/${doc}.md`, 'utf8');
//       const converter = new Converter({ metadata: true });
//       converter.makeHtml(content);
//       const meta = converter.getMetadata();
//       const { title } = meta;
//       return {
//           slug: doc,
//           title,
//       };
//   });
  const res = await fetch('https://api.github.com/repos/artsy/README/contents');
  const data = await res.json();
  const sections = data.reduce((result, artifact) => {
        if (artifact.type === 'dir' && artifact.name.charAt(0) !== '.') {
            result.push({
                title: artifact.name,
            });
        }
        return result;
    }, []);
  console.log(sections);
  return {
      props: {
        sections,
      },
  };
}
