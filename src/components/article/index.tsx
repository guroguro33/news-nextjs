import styles from "./index.module.scss"
import moment from "moment"
import Props from "../types"

const Article: React.FC<Props> = ({ articles, title }) => {
    console.log({articles})
    return (
        <section className={styles.article}>
            <div className={styles.article__heading}>
                <h1>{title && title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</h1>
            </div>
            {articles && articles.map((article, index) => {
                const time = moment(article.publishedAt).fromNow().slice(0, 1) 
                return (
                    <a href={article.url} key={index} target="_blank" rel="noreferrer">
                        <article className={styles.article__main }>
                            <div className={styles.article__wrapper}>
                                <p className={styles.article__title}>{article.title}</p>
                                <p className={styles.article__time}>
                                    {article.source.name}{(time != 'a') ? ` - ${time}時間前` : ''}
                                </p>
                            </div>
                            {article.urlToImage && (
                                <img
                                    className={styles.article__img}
                                    key={index}
                                    src={article.urlToImage}
                                    alt={`${article.title} image`}
                                />
                            )}
                        </article>
                    </a>
                )
            })}
        </section>
    )
}

export default Article 