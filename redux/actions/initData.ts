import { ActionInterface } from "../../lib/interfaces/action.interface"

export default function InitData(): ActionInterface {
    return {
        type: "INIT_DATA",
        payload: {
            current_user: null,
            totalFoundUsers: [],
            current_theme: 'light'
        }
    }
}