import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from "swr"

const fetcher = url => fetch(url).then(res => res.json())
const url = "https://api.spacexdata.com/v4/rockets"

export default function Home() {
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div className={styles.container}>
      <Head>
        <title>Spacex Rocket Images</title>
        <meta name="description" content="Space X Images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://www.spacex.com/"> SpaceX  </a> - Rocket  Image Gallery
        </h1>
        <div className={styles.grid}>
          {
            data.map(rocket => {
              return (

                <a href={rocket.wikipedia} className={styles.card}>
                  <h2>{rocket.name}</h2>
                  <img className={styles.image} src={rocket.flickr_images[0]} alt={rocket.name} />
                </a>

              )
            })
          }
        </div>

      </main>
    </div>
  )
}
