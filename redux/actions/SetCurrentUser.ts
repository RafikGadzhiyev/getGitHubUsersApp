export const SetCurrentUser = (login: string) => {
    return {
        type: "SET_CURRENT_USER",
        payload: {
            currentUser: login
        }
    }
}