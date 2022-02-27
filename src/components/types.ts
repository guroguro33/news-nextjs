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
    params?: {
        area_name: string,
        area_name_ja: string,
        lat: number,
        lon: number,
    }
    title?: string,
    weather?: {
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
    weatherInfos?: [
        weather: {
            name: string,
            main: {
                temp: number
            },
            weather: [ // 中身が配列の場合
                conditions: {
                    main: string,
                    icon: string
                }
            ]
        }
    ],
    location?: [
        location: {
            area_name: string
            lat: number,
            lon: number
        }
    ]
}

export default Props