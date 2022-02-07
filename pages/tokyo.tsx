import type { NextPage } from 'next'
import  MainLayout  from '../src/layouts/index'
import Head from 'next/head'
import Article from '../src/components/article'
import Nav from '../src/components/nav'
import Weather from '../src/components/weather/area'
import styles from '../styles/Home.module.scss'
import moment from 'moment'

const Home: NextPage = (props) => {
    console.log({props})
    return (
        <MainLayout>
            <Head>
                <title>Tokyo | BTM Area News</title>
            </Head>
            <div className={styles.contents}>
                <div className={styles.nav}>
                    <nav>
                        <Nav />
                    </nav>
                </div>
                <div className={styles.blank} />
                <div className={styles.main}>
                    <Article title="tokyo" articles={props.topArticles}/>
                </div>
                <div className={styles.aside}>
                    <Weather weather={props.weather}/>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home

export const getStaticProps = async () => {
    // newsAPIの記事を取得
    const articleCount = 10
    const keyword = '東京'
    const startDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const endDate = moment().format('YYYY-MM-DD')
    const apiKey = '053272abb2004f4e805929dc8d343e51'
    const topRes = await fetch(
        `https://newsapi.org/v2/everything?pageSize=${articleCount}&q=${keyword}&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${apiKey}`
    )
    const topJson = await topRes.json()
    const topArticles = topJson?.articles

    // OpenWeatherMapの天気の情報を取得
    const lat = 35.4122
    const lon = 139.4130
    const exclude = "hourly,minutely"
    const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=5106568248a9c63cec4f9b2f81fd127f`
    )
    const weather = await weatherRes.json() 

    return {
        props: {
            topArticles,
            weather
        },
        revalidate: 60 * 1 // とりあえず1時間
    }
}

