export default function GetCurrentUserData(login: string) {
    if (!login) {
        return {
            type: "RESET_USERS_DATA"
        }
    }

    return async (dispatch: any) => {
        let response = await fetch('https://api.github.com/users/' + login),
            result = await response.json();

        dispatch({
            type: "GET_CURRENT_USER_DATA",
            payload: {
                result
            }
        })
    }
}