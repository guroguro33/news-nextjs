import type { NextPage } from 'next'
import  MainLayout  from '../src/layouts/index'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = (props) => {
    console.log(props)
    return (
        <MainLayout>
            <Head>
                <title>BTM Area News</title>
            </Head>
        </MainLayout>
    )
}

export default Home

export const getStaticProps = async () => {
    // newsAPIの記事を取得
    const articleCount = 10
    const keyword = '東京'
    const startDate = '2022-02-03'
    const endDate = '2022-02-03'
    const apiKey = '053272abb2004f4e805929dc8d343e51'
    const topRes = await fetch(
        `https://newsapi.org/v2/everything?pageSize=${articleCount}&q=${keyword}&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${apiKey}`
    )
    const topJson = await topRes.json()
    const topArticles = topJson?.articles

    return {
        props: {
            topArticles,
        },
        revalidate: 60 * 60 // とりあえず1時間
    }
}

