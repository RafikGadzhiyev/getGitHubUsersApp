export default function ChangeTheme(current_theme: string) {
    return {
        type: "CHANGE_THEME",
        payload: {
            current_theme
        }
    }
}