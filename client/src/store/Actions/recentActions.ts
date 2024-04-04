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