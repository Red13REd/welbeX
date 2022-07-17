import React, {useEffect} from 'react';
import {AppStateRootType, useAppDispatch, useCustomSelector} from "../../store/store";
import {getTable} from "../../store/tableReducer";
import styles from "./table.module.scss"

export const Table = () => {

    const {table} = useCustomSelector<AppStateRootType>(state => state)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTable())
    }, [table.params])

    return (
        <div className={styles.wrapper}>
            {
                table.table.length !== 0
                    ? <table className={styles.table}>
                        <tbody className={styles.tbody}>
                        <tr>
                            <th>Дата</th>
                            <th>Название</th>
                            <th>Количество</th>
                            <th>Расстояние</th>
                        </tr>
                        {
                            table.table.map((m, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{new Date(m.date).getFullYear()}</td>
                                        <td>{m.name}</td>
                                        <td>{m.count}</td>
                                        <td>{m.distance}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    : <div>Я ничего не нашел ┐(￣ヘ￣)┌, попробуй изменить запрос</div>
            }
        </div>
    );
};
