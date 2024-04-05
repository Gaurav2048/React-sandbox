export const addToTabs: ActionFn = (name: string, path: string) => {
    return {
        type: '',
       actions: {
        success: 'ADD_TO_TAB',
        error: '',
        payload: {
            name, path
        }
       }
    }
}

export const removeTab: ActionFn = (name: string, path: string) => {
    return {
        type: '',
       actions: {
        success: 'REMOVE_FROM_TAB',
        error: '',
        payload: {
            name, path
        }
       }
    }
}