export interface ActionInterface {
    type: string,
    payload?: {
        [key: string]: any
    }
}