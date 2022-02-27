import type { NextPage } from 'next'
import { useState } from 'react'
import  MainLayout  from '../src/layouts/index'
import Head from 'next/head'
import Article from '../src/components/article'
import Nav from '../src/components/nav'
import styles from '../styles/Home.module.scss'
import Weather from '../src/components/weather'
import Props from '../src/components/types'

const Home: NextPage<Props> = (props) => {
    const [isNavShown, setIsNavShown] = useState(true);
    const toggleIsNavShown = (): void => setIsNavShown(!isNavShown)

    return (
        <MainLayout toggleIsNavShown={toggleIsNavShown}>
            <Head>
                <title>BTM Area News</title>
            </Head>
            <div className={styles.contents}>
                <div className={styles.nav}>
                    <nav style={isNavShown ? { display: 'block' } : { display: 'none' }}>
                        <Nav />
                    </nav>
                </div>
                <div className={isNavShown ? styles.blank : styles.blank__hidden_nav} />
                <div className={styles.main}>
                    <Article title="Headline" articles={props.topArticles}/>
                </div>
                <div className={styles.aside}>
                    <Weather weatherInfos={props.weatherInfos} location={props.location}/>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home

export const getStaticProps = async () => {
    // newsAPIの記事を取得
    const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_HASH
    const topRes = await fetch(
        `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${newsApiKey}`
    )
    const topJson = await topRes.json()
    const topArticles = topJson?.articles

    // OpenWeatherMapの天気の情報を取得
    const location = [
        {
            area_name: 'tokyo',
            lat: 35.689499,
            lon: 139.691711,
        },
        {
            area_name: 'osaka',
            lat: 34.675705,
            lon: 135.526343,
        },
        {
            area_name: 'fukuoka',
            lat: 33.606392,
            lon: 130.41806,
        },
        {
            area_name: 'sapporo',
            lat: 43.064171,
            lon: 141.346939,
        },
        {
            area_name: 'syonan',
            lat: 35.341942,
            lon: 139.470001,
        },
    ]
    const exclude = "hourly,minutely"
    const weatherApiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_HASH
    let weatherRes: any = []
    weatherRes = Promise.all(location.map(async city_info => {
        let result = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city_info.lat}&lon=${city_info.lon}&units=metric&appid=${weatherApiKey}`
        )
        
        return result.json()
    }))
    const weatherInfos = await weatherRes 

    return {
        props: {
            topArticles,
            weatherInfos,
            location
        },
        revalidate: 60 * 60 // 1時間キャッシュ
    }
}

