import Image from 'next/image'
import styles from '../weather/index.module.scss'
import Link from 'next/link'
import Props from '../types'

const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Weather: React.FC<Props> = ({weather, title}) => {
    const currentWeatherMain = weather.current.weather[0].main
    const currentWeatherTemp = Math.round(weather.current.temp)
    const currentWeatherIcon = weather.current.weather[0].icon.slice(0, 2) + 'd'
    console.log({weather})
    return (
        <section className={styles.weather}>
            <h1>{title && title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</h1>
            <div className={styles.weather__main}>
                <div className={styles.weather__top}>
                    <div className={styles.weather__heading}>
                        <a>{currentWeatherMain}</a>
                        <p>{currentWeatherTemp}<span>°C</span></p>
                    </div>
                    <Image
                        className={styles.weather__icon}
                        src={`/img/weatherIcons/${currentWeatherIcon}.svg`}
                        alt={`${title} && ${title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}'s weather icon`}
                        loading='eager'
                        width={52}
                        height={52}
                        priority
                    />
                </div>
                <div className={styles.weather__bottom}>
                    <Link href="https://weathernews.jp/onebox/">
                    <a target="_blank" rel="noopener">
                        ウェザーニュース
                    </a>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Weather
