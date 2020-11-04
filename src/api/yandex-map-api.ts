import axios from 'axios'


export const instance = axios.create({
    baseURL: "https://search-maps.yandex.ru/v1/"
})

export const MapsAPI = {
    getResult: (searchValue: string) => {
        return instance.get(
            `?text=Компьютерные курсы, ${searchValue}&type=biz&lang=ru_RU&results=500&&apikey=6f1a0a0c-b9b7-49ed-a969-1db3f019a8d1`
        );
    },
}