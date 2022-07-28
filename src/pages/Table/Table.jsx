import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../../components/UI/Pagination/Pagination";
import { useDebounce } from '../../hooks/useDebounce'
import {changeAscSort, changeCurrentPage, getPosts, onPropertyChange} from "../../store/actions/postsActions";
import Search from "../../components/UI/Search/Search";
import './Table.css';

const Table = () => {
    const dispatch = useDispatch();
    const [isRotated, setIsRotated] = useState({id: false, title: false, body: false});
    const searchText = useSelector(state => state.posts.searchText);
    const sortProperty = useSelector(state => state.posts.sortProperty);
    const isAscending = useSelector(state => state.posts.isAscending);
    const currentPage = useSelector(state => state.posts.currentPage);
    const posts = useSelector(state => state.posts.posts);
    const debaunceText = useDebounce(searchText, 500)

    useEffect(() => {
        dispatch(getPosts(currentPage, sortProperty, isAscending, debaunceText));
    }, [dispatch, debaunceText]);

    const onSortClick = (newSortProperty) => {
        setIsRotated(prevState => ({...prevState, [newSortProperty] : !prevState[newSortProperty]}));
        if (newSortProperty === sortProperty) {
            dispatch(changeAscSort(!isAscending));
            dispatch(getPosts(currentPage, sortProperty, !isAscending, searchText));
        } else {
            dispatch(changeAscSort(true));
            dispatch(onPropertyChange(newSortProperty));
            dispatch(getPosts(currentPage, newSortProperty, true, searchText));
        }
    };

    const onClickPage = (currentPage) => {
        dispatch(getPosts(currentPage, sortProperty, isAscending, searchText));
        dispatch(changeCurrentPage(currentPage));
    };

    return (
        <>
            <Search
                currentPage={currentPage}
                sortProperty={sortProperty}
                isAscSort={isAscending}
            />
            <table className="table">
                <thead>
                <tr>
                    <th className={`table__table-header ${isRotated.id ? 'rotate' : ''}`}>
                        <span onClick={() => onSortClick('id')}>ID</span>
                    </th>
                    <th className={`table__table-header ${isRotated.title ? 'rotate' : ''}`}>
                        <span onClick={() => onSortClick('title')}>Заголовок</span>
                    </th>
                    <th className={`table__table-header ${isRotated.body ? 'rotate' : ''}`}>
                        <span onClick={() => onSortClick('body')}>Описание</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {posts.length ? posts.map(post => (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                    </tr>
                )) : null}
                </tbody>
            </table>
            <Pagination onClickPage={onClickPage}/>
        </>
    );
};

export default Table;