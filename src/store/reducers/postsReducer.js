import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    ON_SEARCH_CHANGE,
    ON_PROPERTY_CHANGE, CHANGE_ASC_SORT, CHANGE_CURRENT_PAGE
} from "../actions/postsActions";

const initialState = {
    searchText: '',
    posts: [],
    getPostsLoading: false,
    getPostsError: null,
    totalPages: 0,
    sortProperty: 'id',
    isAscending: true,
    currentPage: 1,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return {
                ...state,
                getPostsLoading: true
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                totalPages: action.payload.totalPageCount,
                getPostsLoading: false
            };
        case GET_POSTS_FAILURE:
            return {
                ...state,
                getPostsError: action.payload,
                getPostsLoading: false
            };

        case ON_SEARCH_CHANGE:
            return {
                ...state,
                searchText: action.payload,
            }
        case ON_PROPERTY_CHANGE:
            return {
                ...state,
                sortProperty: action.payload,
            }
        case CHANGE_ASC_SORT:
            return {
                ...state,
                isAscending: action.payload,
            }
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }
        default:
            return state;
    }
};

export default postsReducer;