// import Head from 'next/head';
import Image from 'next/image';
import { gql } from "@apollo/client";
import client from "../apollo-client";
import styles from '../styles/Home.module.css';

export default function Home({ showCharacters }) {
  console.log("characters", showCharacters);
  return (
    <div className={styles.container}>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {showCharacters.map(character => {
            return (
              <a key={character.id} href="https://www.facebook.com/Rick-and-Morty-Store-111398520594738/" className={styles.card}>
                <h3>{character.name}</h3>
                <Image
                  src={character.image}
                  alt={character.name}
                  width={200}
                  height={200}
                />
              </a>
            );
          })}
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
    query CharacterQuery{
      characters(page: 1){
        results{
          name
          id
          status
          image
          location{
            id
            name
          }
          origin{
            id
            name
          }
          episode{
            id
            name
            air_date
          }
        }
      }
    }
    `
  });
  return {
    props: {
      showCharacters: data.characters.results.slice(0, 6)
    },
  };
}

