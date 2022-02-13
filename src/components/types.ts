type Props = {
    articles?: [
        article: {
            author: string,
            title: string,
            publishedAt: string,
            url: string,
            urlToImage: string,
            source: {
                name: string
            }
        }
    ],
    topArticles?: [
        article: {
            author: string,
            title: string,
            publishedAt: string,
            url: string,
            urlToImage: string,
            source: {
                name: string
            }
        }
    ],
    title?: string,
    weather: {
        current: {
            temp: number,
            clouds: number,
            weather: [
                conditions: {
                    main: string,
                    icon: string
                }
            ]
        },
        daily: [
            date: {
                at: number,
                clouds: number,
                temp: {
                    min: number,
                    max: number
                },
                dt: number,
                weather: [
                    conditions: {
                        id: number,
                        icon: string
                    }
                ]
            }
        ]
    },
    data: {
        weatherInfos?: {
        }
    },
}

export default Props