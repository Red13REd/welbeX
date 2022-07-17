import {AppThunk} from "./store";
import {StateType, tableApi, TableParamsType} from "../dal/tableApi";

const initialStateType: InitialStateType = {
    table: [],
    totalLength: 10,
    params: {
        column: 'count',
        condition: '>',
        value: '0',
        page: 1,
    },
}

export const tableReducer = (state: InitialStateType = initialStateType, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case "TABLE-REDUCER/SET-DATA":
            return {...state, table: actions.data.table, totalLength: actions.data.totalLength}
        case "TABLE-REDUCER/SET-PARAMS":
            return {...state, params: {...state.params, ...actions.params}}
        default:
            return state
    }
};


export const setData = (data: { table: StateType[], totalLength: number }) => ({
    type: 'TABLE-REDUCER/SET-DATA',
    data
} as const)
export const setParams = (params: TableParamsType) => ({type: 'TABLE-REDUCER/SET-PARAMS', params} as const)


export const getTable = (): AppThunk => (dispatch, getState) => {
    let {params} = getState().table
    //if colum === name call tableApi.getTableByName
    // if colum === name and params.condition === '%' call tableApi.getTableByContainName

    if (params.column === 'name' && params.condition === '%') {
        tableApi.getTableByContainName(params)
            .then(r => {
                console.log(r)
                dispatch(setData(r.data))
            })
    } else if (params.column === 'name') {
        tableApi.getTableByName(params)
            .then(r => {
                console.log(r)
                dispatch(setData(r.data))
            })
    } else {
        tableApi.getTable(params)
            .then(r => {
                console.log(r)
                dispatch(setData(r.data))
            })
    }
}


export type ActionsType =
    | ReturnType<typeof setData>
    | ReturnType<typeof setParams>

export type InitialStateType = {
    table: StateType[]
    totalLength: number
    params: TableParamsType
}