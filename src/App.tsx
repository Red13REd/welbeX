import React from 'react';
import './App.module.scss';
import {Table} from "./features/table/Table";
import {Search} from "./features/search/Search";
import styles from "./App.module.scss"
import {Pagination} from "./components/pagination/Pagination";
import {useAppDispatch, useCustomSelector} from "./store/store";
import {setParams} from "./store/tableReducer";


function App() {
    const {params, totalLength} = useCustomSelector(state => state.table)
    const dispatch = useAppDispatch()

    const onPageChangeHandler = (page: number) => {
        dispatch(setParams({page}))
    }

    return (
        <div className={styles.App}>
            <Search/>
            <Table/>
            <Pagination
                siblingCount={0}
                currentPage={params.page}
                totalCount={totalLength}
                pageSize={10}
                onPageChange={onPageChangeHandler}
            />
        </div>
    );
}

export default App;
