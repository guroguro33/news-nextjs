import styles from '../weather/index.module.scss'
import Link from 'next/link'
import Props from '../types'

const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Weather: React.FC<Props> = ({weatherInfos, location}) => {
    return (
        <section className={styles.weather}>
            {weatherInfos && weatherInfos.map((weather, index) => {
                return (
                    <div key={index}>
                        <h1>{location && location[index].area_name.charAt(0).toUpperCase() + location[index].area_name.slice(1).toLowerCase()}</h1>
                        <div className={styles.weather__main}>
                            <span>{weather.weather[0].main}</span>
                            <div className={styles.weather__top}>
                                <div className={`${styles.weather__heading} mr-100`}>
                                    <p>{Math.round(weather.main.temp)}<span>°C</span></p>
                                </div>
                                <img
                                    className={styles.weather__icon}
                                    src={`/img/weatherIcons/${weather.weather[0].icon.slice(0, 2) + 'd'}.svg`}
                                    alt={`${weather.name} && ${weather.name.charAt(0).toUpperCase() + weather.name.slice(1).toLowerCase()}'s weather icon`}
                                    loading='eager'
                                    width={52}
                                    height={52}
                                />
                            </div>
                        </div>            
                    </div>
                )
            })}
            <div className={styles.weather__bottom}>
                <Link href="https://weathernews.jp/onebox/">
                <a target="_blank" rel="noopener">
                    ウェザーニュース
                </a>
                </Link>
            </div>
        </section>
    )
}

export default Weather
