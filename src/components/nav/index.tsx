import Link from 'next/link'
import styles from './index.module.scss'

const TOPICS = [
    {
        icon: 'locationIcon',
        path: '/tokyo',
        title: 'Tokyo'
    },
    {
        icon: 'locationIcon',
        path: '/osaka',
        title: 'Osaka'
    },
    {
        icon: 'locationIcon',
        path: '/fukuoka',
        title: 'Fukuoka'
    },
    {
        icon: 'locationIcon',
        path: '/sapporo',
        title: 'Sapporo'
    },
]

const Nav: React.FC = () => {
    return (
        <section className={styles.container}>
            <ul className={styles.contents}>
                {TOPICS.map((topic, index) => {
                    return (
                        <li key={index}>
                            <Link href={`${topic.path}`}>
                                <a>
                                    <span>
                                        <img
                                            src={`/img/navIcons/${topic.icon}.png`}
                                            alt={`${topic.title} icon`}
                                            loading="eager"
                                            width={33}
                                            height={33}
                                        />
                                    </span>
                                    <span>{topic.title}</span>
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>

        </section>
    )
}

export default Nav