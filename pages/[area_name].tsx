import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next';
import MainLayout  from '../src/layouts/index'
import Head from 'next/head'
import Article from '../src/components/article'
import Nav from '../src/components/nav'
import Weather from '../src/components/weather/area'
import styles from '../styles/Home.module.scss'
import moment from 'moment'
import types from '../src/types'

const Home: NextPage<types> = (props) => {
    console.log({props})
    return (
        <MainLayout>
            <Head>
                <title>{props.params.area_name.charAt(0).toUpperCase() + props.params.area_name.slice(1).toLowerCase()} | BTM Area News</title>
            </Head>
            <div className={styles.contents}>
                <div className={styles.nav}>
                    <nav>
                        <Nav />
                    </nav>
                </div>
                <div className={styles.blank} />
                <div className={styles.main}>
                    <Article title={props.params.area_name} articles={props.topArticles}/>
                </div>
                <div className={styles.aside}>
                    <Weather title={props.params.area_name} weather={props.weather}/>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
    // API用定数を地域別に設定
    let params = {}
    switch (context.params.area_name) {
        case 'tokyo':
            params = {
                area_name: 'tokyo',
                area_name_ja: '東京',
                lat: 35.4122,
                lon: 139.4130,
            }
        break
        case 'osaka':
            params = {
                area_name: 'osaka',
                area_name_ja: '大阪',
                lat: 34.675705,
                lon: 135.526343,
            }
        break
        case 'fukuoka':
            params = {
                area_name: 'fukuoka',
                area_name_ja: '福岡',
                lat: 33.606392,
                lon: 130.41806,
            }
        break
        case 'sapporo':
            params = {
                area_name: 'sapporo',
                area_name_ja: '札幌',
                lat: 43.064171,
                lon: 141.346939,
            }
        break
    }
    // newsAPIの記事を取得
    const articleCount = 10
    const keyword = params.area_name_ja
    const startDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const endDate = moment().format('YYYY-MM-DD')
    const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_HASH
    const topRes = await fetch(
        `https://newsapi.org/v2/everything?pageSize=${articleCount}&q=${keyword}&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${newsApiKey}`
    )
    const topJson = await topRes.json()
    const topArticles = topJson?.articles

    // OpenWeatherMapの天気の情報を取得
    const lat = params.lat
    const lon = params.lon
    const exclude = "hourly,minutely"
    const weatherApiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_HASH
    const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=${weatherApiKey}`
    )
    const weather = await weatherRes.json() 

    return {
        props: {
            topArticles,
            weather,
            params
        },
        revalidate: 60 * 60
    }
}

export const getStaticPaths = async () => {
    return {
        paths: [
            {params: {area_name: 'tokyo'}},
            {params: {area_name: 'osaka'}},
            {params: {area_name: 'fukuoka'}},
            {params: {area_name: 'sapporo'}},
        ],
        fallback: false
    }
}

