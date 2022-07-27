import axiosApi from "../../axiosApi";

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const ON_SEARCH_CHANGE = 'ON_SEARCH_CHANGE';
export const ON_PROPERTY_CHANGE = 'ON_PROPERTY_CHANGE';
export const CHANGE_ASC_SORT = 'CHANGE_ASC_SORT';
export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

export const getPostsRequest = () => ({type: GET_POSTS_REQUEST});
export const getPostsSuccess = (posts, totalPageCount) => ({type: GET_POSTS_SUCCESS, payload: {posts, totalPageCount}});
export const getPostsFailure = error => ({type: GET_POSTS_FAILURE, error});

export const onSearchChange = userText => ({type: ON_SEARCH_CHANGE, payload: userText});
export const onPropertyChange = sortProperty => ({type: ON_PROPERTY_CHANGE, payload: sortProperty});
export const changeAscSort = isAscSort => ({type: CHANGE_ASC_SORT, payload: isAscSort});
export const changeCurrentPage = currentPage => ({type: CHANGE_CURRENT_PAGE, payload: currentPage});

export const getPosts = (page, sortProperty, isAscProperty, userText) => async dispatch => {
    try {
        dispatch(getPostsRequest());
        const searchProperties = sortProperty ? '&_sort=' + sortProperty + `&_order=${isAscProperty ? 'asc' : 'desc'}` : '';
        const response = await axiosApi.get(`?_page=${page}&_limit=10&q=${userText ? userText : ''}${searchProperties}`);
        const totalPageCount = response.headers['x-total-count'];
        dispatch(getPostsSuccess(response.data, totalPageCount));

    } catch (error) {
        console.log('Error => ', error);
        dispatch(getPostsFailure(error));
    }
};