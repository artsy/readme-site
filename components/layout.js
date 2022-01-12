import styles from '../styles/layout.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { Fragment } from 'react';

export default function Layout(props) {
    return (
        <Fragment>
          <Head>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <header className={styles.header}>
            <div className={styles.wrapper}>
                  <Link href="/">
                    <a
                      href=""
                      rel="noopener noreferrer"
                    >
                      <span className={styles.logo}>
                        <Image src="/images/artsy.svg" alt="Artsy Logo" width={52} height={36} />
                      </span>
                    </a>
                  </Link>
                <div>
                    <ul className={styles.menu}>
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs">
                                <a>Docs</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
          </header>
          <main>{props.children}</main>
          <footer className={styles.footer}>
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by {' '}
              <span className={styles.logo}>
                <Image src="/images/nextjs.svg" alt="NextJS Logo" width={62} height={46} />
              </span>
            </a>
          </footer>
        </Fragment>
    );
}
