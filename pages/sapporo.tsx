import type { NextPage } from 'next'
import  MainLayout  from '../src/layouts/index'
import Head from 'next/head'
import Article from '../src/components/article'
import Nav from '../src/components/nav'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Weather from '../src/components/weather/area'
import moment from 'moment'

const Home: NextPage = (props) => {
    return (
        <MainLayout>
            <Head>
                <title>Sapporo | BTM Area News</title>
            </Head>
            <div className={styles.contents}>
                <div className={styles.nav}>
                    <nav>
                        <Nav />
                    </nav>
                </div>
                <div className={styles.blank} />
                <div className={styles.main}>
                    <Article title="sapporo" articles={props.topArticles}/>
                </div>
                <div className={styles.aside}>
                    <Weather title='sapporo' weather={props.weather}/>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home

export const getStaticProps = async () => {
    // newsAPIの記事を取得
    const articleCount = 10
    const keyword = '札幌'
    const startDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const endDate = moment().format('YYYY-MM-DD')
    const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_HASH
    const topRes = await fetch(
        `https://newsapi.org/v2/everything?pageSize=${articleCount}&q=${keyword}&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${newsApiKey}`
    )
    const topJson = await topRes.json()
    const topArticles = topJson?.articles

    // OpenWeatherMapの天気の情報を取得
    const lat = 43.064171
    const lon = 141.346939
    const exclude = "hourly,minutely"
    const weatherApiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_HASH
    const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=${weatherApiKey}`
    )
    const weather = await weatherRes.json() 

    return {
        props: {
            topArticles,
            weather
        },
        revalidate: 60 * 1
    }
}

