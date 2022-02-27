import type { NextPage, GetStaticPropsContext } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import MainLayout  from '../src/layouts/index'
import Head from 'next/head'
import Article from '../src/components/article'
import Nav from '../src/components/nav'
import Weather from '../src/components/weather/area'
import styles from '../styles/Home.module.scss'
import moment from 'moment'
import Props from '../src/components/types'

const Home: NextPage<Props> = (props) => {
    const [isNavShown, setIsNavShown] = useState(true);
    const toggleIsNavShown = (): void => setIsNavShown(!isNavShown)

    return (
        <MainLayout toggleIsNavShown={toggleIsNavShown}>
            <Head>
                <title>{props.params && (props.params.area_name.charAt(0).toUpperCase() + props.params.area_name.slice(1).toLowerCase())} | BTM Area News</title>
            </Head>
            <div className={styles.contents}>
                <div className={styles.nav}>
                    <nav style={isNavShown ? { display: 'block' } : { display: 'none' }}>
                        <Nav />
                    </nav>
                </div>
                <div className={isNavShown ? styles.blank : styles.blank__hidden_nav} />
                <div className={styles.main}>
                    <Article title={props.params && props.params.area_name} articles={props.topArticles}/>
                </div>
                <div className={styles.aside}>
                    <Weather title={props.params && props.params.area_name} weather={props.weather}/>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    // API用定数を地域別に設定
    let params
    if (context.params) {
        switch (context.params.area_name) {
            case 'tokyo':
                 params = {
                    area_name: 'tokyo',
                    area_name_ja: '東京',
                    lat: 35.689499,
                    lon: 139.691711,
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
            case 'syonan':
                params = {
                    area_name: 'syonan',
                    area_name_ja: '神奈川',
                    lat: 35.341942,
                    lon: 139.470001,
                }
            break
        }
    }
    // newsAPIの記事を取得
    const articleCount = 15
    const keyword = params && params.area_name_ja
    const startDate = moment().subtract(1, 'days').format('YYYY-MM-DD')
    const endDate = moment().format('YYYY-MM-DD')
    const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_HASH
    const topRes = await fetch(
        `https://newsapi.org/v2/everything?pageSize=${articleCount}&q=${keyword}&from=${startDate}&to=${endDate}&excludeDomains=himasoku.com,lifehacker.jp,news4vip.livedoor.biz,matsu23.blog.shinobi.jp,alfalfalfa.com,machicon.jp,fashionsnap.com&sortBy=popularity&apiKey=${newsApiKey}`
    )
    const topJson = await topRes.json()
    const topArticles = topJson?.articles

    // OpenWeatherMapの天気の情報を取得
    const lat = params && params.lat
    const lon = params && params.lon
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

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {area_name: 'tokyo'}},
            {params: {area_name: 'osaka'}},
            {params: {area_name: 'fukuoka'}},
            {params: {area_name: 'sapporo'}},
            {params: {area_name: 'syonan'}},
        ],
        fallback: false // パスがないときは404を返す
    }
}

