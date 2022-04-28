import { ActionInterface } from "../../lib/interfaces/action.interface";

export default function MainReducer(state: any, action: ActionInterface) {
    switch (action.type) {
        case "INIT_DATA":
            if (action.payload) {
                return {
                    ...state,
                    current_user: action.payload.current_user,
                    totalFoundUsers: action.payload.totalFoundUsers,
                    current_theme: action.payload.current_theme
                }
            }

            return state;
        case "CHANGE_THEME":
            if (action.payload) {
                return {
                    ...state,
                    current_theme: action.payload.current_theme === 'light' ? 'dark' : "light"
                }
            }
            return state;
        case "SET_FOUND_USERS": {
            if (action.payload) {
                return {
                    ...state,
                    current_page: action.payload.current_page,
                    totalFoundUsers: action.payload.totalFoundUsers,
                    totalFoundUsersLength: action.payload.totalFoundUsersLength,
                    isLoading: false
                }
            }
            return state;
        }
        case "SET_QUERY":
            if (action.payload) {
                return {
                    ...state,
                    query: action.payload.query
                }
            }
            return state;
        case "RESET_USERS_DATA":
            return {
                ...state,
                totalFoundUsers: [],
                current_user: null,
                totalFoundUsersLength: 0,
                isLoading: true
            }
        case "RESET_USER_DATA":
            return {
                ...state,
                current_user: null
            }
        case "SET_CURRENT_USER":
            if (action.payload) {
                return {
                    ...state,
                    current_user: action.payload.currentUser
                }
            }
            return state;
        case "GET_CURRENT_USER_DATA": {
            if (action.payload) {
                return {
                    ...state,
                    current_user_data: action.payload.result
                }
            }
            return state;
        }
        default:
            return state;

    }
}