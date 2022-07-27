import React from 'react';
import {useSelector} from "react-redux";
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = ({onClickPage}) => {
    const postsCount = useSelector(state => state.posts.totalPages);
    const contentPerPage = 10;
    const pageCount = Math.ceil(postsCount / contentPerPage);

    return (
        <div className="pagination">
            <div className="pagination__pages">
                <ReactPaginate
                    className="pagination__list"
                    breakLabel="..."
                    nextLabel="Далее"
                    onPageChange={e => onClickPage(e.selected + 1)}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="Назад"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};

export default Pagination;