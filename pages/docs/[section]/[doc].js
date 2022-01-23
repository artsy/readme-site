import { Converter } from 'showdown';
import Head from 'next/head';
import { getSections } from '../../../lib/github';

export default function Docs(props) {
    const {
        content,
        meta: { title, description },
    } = props;
    return (
        <div className="container docs">
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title}</h1>
            <h3>{description}</h3>
            <div className="docs" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export async function getStaticProps(context) {
    const { section, doc } = context.params;
    const res = await fetch(`https://raw.githubusercontent.com/artsy/README/main/${section}/${doc}.md`,
    {
      headers: {'Authorization': `token ${process.env.GITHUB_TOKEN}`}
    });
    let content = await res.text();
    const converter = new Converter({ metadata: true, tables: true });
    content = converter.makeHtml(content);
    const meta = converter.getMetadata();
    return { props: { content, meta } };
}

export async function getStaticPaths() {
  const sections = await getSections();

  let paths = [];
  const sectionContents = await Promise.all(sections.map(async section => {
      const res = await fetch(`https://api.github.com/repos/artsy/README/contents/${section.title}`,
        {
          headers: {'Authorization': `token ${process.env.GITHUB_TOKEN}`}
        });
      const data = await res.json();
      let docs = data.reduce((result, artifact) => {
          if (artifact.type === 'file' && artifact.name.includes('.md')) {
              result.push({
                doc: artifact.name.slice(0, artifact.name.indexOf('.md')),
                section: section.title,
              });
          }
          return result;
      }, []);
      docs.forEach(doc => {
        paths.push({'params': doc})
      })
      docs = [];
  }));

    return {
        paths,
        fallback: false,
    };
}
