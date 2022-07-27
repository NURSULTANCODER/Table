import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {onSearchChange} from "../../../store/actions/postsActions";
import {SearchImg} from '../../../assets/icons/index'
import './Search.css';

const Search = () => {
    const dispatch = useDispatch();
    const searchText = useSelector(state => state.posts.searchText);

    const onInputChange = (event) => {
        dispatch(onSearchChange(event.target.value));
    };

    return (
        <div className="search-block">
            <label>
                <input
                    placeholder="Поиск"
                    className="search-block__search-input"
                    type="text"
                    value={searchText}
                    onChange={onInputChange}
                />
                <SearchImg className="search-block__search__image"/>
            </label>
        </div>
    );
};

export default Search;