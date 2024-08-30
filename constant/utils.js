import dayjs from "dayjs"
import mapValues from "lodash/mapValues"

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

export const flattenObject = (values = {}) => {
    mapValues(values, (value) => {
        if (isObject(value) && value.id) {
            return value.id;
        }
        return value;
    })
}

export function getRandomMantineColor() {
    const mantineColors = [
        'blue', 'cyan', 'green', 'grape', 'indigo', 'lime', 'orange',
        'pink', 'red', 'teal', 'violet', 'yellow'
    ];
    const randomIndex = Math.floor(Math.random() * mantineColors.length);
    return mantineColors[randomIndex];
}