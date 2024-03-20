export const DEFAULT_PROJECT_ID = "b9dd4ad5-5723-4bf0-bc42-944a5494348f"

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

export const getProject: ApiActionFn = (projectId: string = DEFAULT_PROJECT_ID) => {
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

export const getConstruct: ApiActionFn = (projectId: string = DEFAULT_PROJECT_ID) => {
    return {
        type: 'CALL_API',
        method: 'GET',
        url: `file/project/${projectId}/construct`,
       actions: {
        success: 'GET_PROJECT_CONSTRUCT',
        error: ''
       }
    }
}