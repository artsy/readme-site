import { Converter } from 'showdown';
import fs from 'fs';
import Head from 'next/head';

export default function Docs(props) {
    const {
        content,
        meta: { title },
    } = props;
    return (
        <div className="container docs">
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title}</h1>
            <div className="docs" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export function getStaticProps(context) {
    const { doc } = context.params;
    let content = fs.readFileSync(`docs/${doc}.md`, 'utf8');
    const converter = new Converter({ metadata: true });
    content = converter.makeHtml(content);
    const meta = converter.getMetadata();
    return { props: { content, meta } };
}

export function getStaticPaths() {
    const files = fs.readdirSync('docs');
    const paths = files.map((file) => {
        const doc = file.slice(0, file.indexOf('.md'));
        return { params: { doc } };
    });
    return {
        paths,
        fallback: false,
    };
}
