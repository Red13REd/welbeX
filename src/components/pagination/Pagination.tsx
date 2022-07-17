import React from 'react';
import {DOTS, usePagination} from './usePagination';
import styles from './pagination.module.scss'


type PaginationPropsType = {
    onPageChange: (page: number ) => void
    totalCount: number
    siblingCount: number
    currentPage: number
    pageSize: number
}


export const Pagination: React.FC<PaginationPropsType> = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (paginationRange && paginationRange.length < 2) return null
    let lastPage = Array.isArray(paginationRange) && paginationRange[paginationRange.length - 1];

    const onNext = () => onPageChange(+currentPage + 1)
    const onPrevious = () => onPageChange(+currentPage - 1)

    return (
        <>
            <ul className={styles.paginationContainer}>
                <li className={`${styles.paginationItem} ${currentPage === 1 && styles.disabled}`}
                    onClick={onPrevious}>
                    <div className={`${styles.arrow} ${styles.left}`}/>
                </li>
                {Array.isArray(paginationRange) && paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return <li key={index} className={`${styles.paginationItem} ${styles.dots}`}>&#8230;</li>;
                    }
                    return (
                        <li key={index}
                            className={`${styles.paginationItem} ${pageNumber === currentPage && styles.selected}`}
                            onClick={() => onPageChange(+pageNumber)}>
                            {pageNumber}
                        </li>
                    )
                })}
                <li className={`${styles.paginationItem} ${currentPage === lastPage && styles.disabled}`}
                    onClick={onNext}>
                    <div className={`${styles.arrow} ${styles.right}`}/>
                </li>
            </ul>
        </>
    );
};

