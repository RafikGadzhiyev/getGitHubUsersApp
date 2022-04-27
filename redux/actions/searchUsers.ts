export const SearchUsers = (query: string, currentPage: number) => {
    return async (dispatch: any) => {
        let response: Response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=50&page=${currentPage}`),
            result: any = await response.json();

        dispatch({
            type: "SET_FOUND_USERS",
            payload: {
                totalFoundUsers: result.items,
                totalFoundUsersLength: result.total_count
            }
        })

    }
}