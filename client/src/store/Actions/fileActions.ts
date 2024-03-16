
export const Login: ApiActionFn = (email: string, password: string) => {
    return {
        type: 'CALL_API',
        method: 'POST',
        url: '/login',
        data: {
            email, password
        }
    }
} 

export const getProject: ApiActionFn = (projectId: string = "b9dd4ad5-5723-4bf0-bc42-944a5494348f") => {
    return {
        type: 'CALL_API',
        method: 'GET',
        url: `file/project/${projectId}`,
       actions: {
        success: 'GET_PROJECT',
        error: ''
       }
    }
}