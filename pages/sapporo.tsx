import type { NextPage } from 'next'
import  MainLayout  from '../src/layouts/index'
import Head from 'next/head'
import Article from '../src/components/article'
import Nav from '../src/components/nav'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import moment from 'moment'

const Home: NextPage = (props) => {
    console.log(props.topArticles)
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
            </div>
        </MainLayout>
    )
}

export default Home

export const getStaticProps = async () => {
    // newsAPIの記事を取得
    const articleCount = 10
    const keyword = '札幌'
    const startDate = moment().subtract(1, 'weeks').format('YYYY-MM-DD')
    const endDate = moment().format('YYYY-MM-DD')
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

