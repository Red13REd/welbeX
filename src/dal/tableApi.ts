import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    withCredentials: true,
})


export const tableApi = {
    getTable(params: TableParamsType) {
        const {column, condition, value, page} = params
        return instance.get<any, ResponseType, TableParamsType>(`table/${column}/${condition}/${value}/${page}`,
            /*{params: params}*/)
    },
    getTableByName(params: TableParamsType) {
        const {value, page} = params
        return instance.get<any, ResponseType, TableParamsType>(`/table/name/${value}/${page}`)
    },
    getTableByContainName(params: TableParamsType) {
        const {value, page} = params
        return instance.get<any, ResponseType, TableParamsType>(`/table/contain/${value}/${page}`)
    }
}


export type TableParamsType = {
    column?: string
    condition?: string
    value?: string | number
    page: number
}

export type StateType = {
    date: string
    name: string
    count: number
    distance: number
}

export type ResponseType = {
    data: {
        table: StateType[]
        totalLength: number
    }
}