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

export const addCurrentFile: ActionFn = (file: string) => {
    return {
        type: '',
       actions: {
        success: 'SET_CURRENT_FILE',
        error: '',
        payload: {
            file
        }
       }
    }
}