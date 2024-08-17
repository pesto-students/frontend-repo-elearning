import dayjs from "dayjs"

export const formatDate = (date, dateFormat = 'DD/MM/YYYY hh:mm') => {
    return date ? dayjs(date).format(dateFormat) : ''
}

export const getRandomNumber = ({ min = 1, max = 100 }) => {
    return Math.floor(Math.random() * max) + min
}

export const isNotEmptyObject = (obj) => {
    return obj && typeof obj === "object" && Object.keys(obj).length && obj.constructor === Object
}

export const safeJsonParse = (data) => {
    try {
        return JSON.parse(data)
    } catch (error) {
        console.log(error)
        return data
    }
}