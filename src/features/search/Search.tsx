import React, {useEffect, useState} from 'react';
import {Select} from "../../components/Select";
import {Input} from "../../components/Input";
import styles from "./search.module.scss";
import useDebounce from "../../components/castomHookUseDebounce";
import {useAppDispatch} from "../../store/store";
import {setParams} from "../../store/tableReducer";

const columnSelect = ['Название', 'Количество', 'Растояние']
const conditionSelect = ['Больше', 'Меньше', 'Равно']
//For not to check  more or less  in string
const conditionSelectForName = ['Равно', 'Содержит']

export const Search = () => {

    const dispatch = useAppDispatch()

    const [column, setColumn] = useState('')
    const [condition, setCondition] = useState('')
    const [value, setValue] = useState('')

    const [error, setError] = useState(false)

    //Change value for request
    const [switchColumn, setSwitchColumn] = useState('')
    const [switchCondition, setSwitchCondition] = useState('')

    //For not to send a request immediately
    const debouncedColumn = useDebounce(column, 1000);
    const debouncedCondition = useDebounce(condition, 1000);
    const debouncedValue = useDebounce(value, 1000);

    //For change  more or less  in string
    useEffect(() => {
        if (column === 'Название') {
            setCondition('Равно')
        }
        if (column === 'Количество' || column === 'Растояние') {
            setCondition('Равно')
        }
    }, [column])

    //Change value for request
    useEffect(() => {
        changeCondition()
        changeColumn()
    }, [debouncedCondition, debouncedColumn])

    //Validation
    useEffect(() => {
        if (switchColumn !== 'name') {
            (/[^0-9]/g).test(debouncedValue) && setError(true)
        }
        //not work with error
        if (debouncedValue !== '' && switchColumn === 'name' ? true : !(/[^0-9]/g).test(debouncedValue)) {
            dispatch(setParams({
                column: switchColumn,
                condition: switchCondition,
                value: debouncedValue,
                page: 1
            }))
        }
    }, [switchColumn, switchCondition, debouncedValue])

    function changeCondition() {
        debugger
        switch (debouncedCondition) {
            case 'Больше':
                setSwitchCondition('>')
                break
            case 'Меньше':
                setSwitchCondition('<')
                break
            case 'Равно':
                setSwitchCondition('=')
                break
            case 'Содержит':
                setSwitchCondition('%')
                break
        }
    }

    function changeColumn() {
        switch (debouncedColumn) {
            case 'Название':
                setSwitchColumn('name')
                break
            case 'Количество':
                setSwitchColumn('count')
                break
            case 'Растояние':
                setSwitchColumn('distance')
                break
        }
    }

    return (
        <div className={styles.wrapper}>
            <Select
                name='Выбор колонки'
                labelValue='Выбор колонки'
                placeholder='Выбор колонки'
                options={columnSelect}
                value={column}
                onChangeOption={setColumn}
            />
            <Select
                name='Выбор условия'
                labelValue='Выбор условия'
                placeholder='Выбор условия'
                options={column === 'Название' ? conditionSelectForName : conditionSelect}
                value={condition}
                onChangeOption={setCondition}
            />
            <Input
                name='Значение'
                labelValue='Значение'
                placeholder='Значение'
                value={value}
                error={error}
                onChangeText={setValue}
                onBlurHandler={() => setError(false)}
                width='380px'
            />
        </div>
    );
};
