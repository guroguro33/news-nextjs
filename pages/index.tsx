import type { NextPage } from 'next'
import  MainLayout  from '../src/layouts/index'
import Head from 'next/head'
import Article from '../src/components/article'
import Nav from '../src/components/nav'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Weather from '../src/components/weather/area'
import moment from 'moment'
import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function'

const Home: NextPage = (props) => {
    return (
        <MainLayout>
            <Head>
                <title>BTM Area News</title>
            </Head>
            <div className={styles.contents}>
                <div className={styles.nav}>
                    <nav>
                        <Nav />
                    </nav>
                </div>
                <div className={styles.blank} />
                <div className={styles.main}>
                    <Article title="Area Topics" articles={props.topArticles}/>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home

export const getStaticProps = async () => {
    // newsAPIの記事を取得
    const articleCount = 10
    const keyword = '東京 OR 大阪 OR 福岡 OR 札幌'
    const startDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const endDate = moment().format('YYYY-MM-DD')
    const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_HASH
    const topRes = await fetch(
        `https://newsapi.org/v2/everything?pageSize=${articleCount}&q=${keyword}&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${newsApiKey}`
    )
    const topJson = await topRes.json()
    const topArticles = topJson?.articles

    // OpenWeatherMapの天気の情報を取得
    const location = {
        tokyo: {
            lat: 35.4122,
            lon: 139.4130,
        },
        // osaka: {
        //     lat: 35.4122,
        //     lon: 139.4130,
        // },
        // fukuoka: {
        //     lat: 35.4122,
        //     lon: 139.4130,
        // },
        // sapporo: {
        //     lat: 35.4122,
        //     lon: 139.4130,
        // },
    }
    const exclude = "hourly,minutely"
    const weatherApiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_HASH
    let weatherRes: any = []
    console.log('for-in始めます')
    for (let city in location) {
        weatherRes[city] = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location[city]['lat']}&lon=${location[city]['lon']}&units=metric&appid=${weatherApiKey}`
        )
    }
    console.log({weatherRes})
    // const weatherRes = await fetch(
    //     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat.tokyo}&lon=${lon.tokyo}&units=metric&exclude=${exclude}&lang=ja&appid=${weatherApiKey}`
    // )
    // const weather = await weatherRes.json() 

    return {
        props: {
            topArticles,
            // weather
        },
        revalidate: 60 * 1
    }
}

