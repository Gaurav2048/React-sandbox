import { Reducer } from "redux";

export type ActionType = {
    type: 'UPDATE_PROJECT_FILE',
    payload: {
        content: any,
        filePath: string
    }
} | {
    type: 'GET_PROJECT',
    payload: {
        files: any
    }
} | {
    type: 'GET_PROJECT_CONSTRUCT',
    payload: {
        files: any
    }
} | {
    type: 'GET_FILE',
    payload: any;
} | {
    type: 'SET_AUTH';
    payload: {
        isAuth: boolean;
    }
} | {
    type: 'SET_PROFILE';
    payload: any;
}

const initialStore: FileStore = {
    project: {},
    construct: {},
    refreshCount: 0
}

export const FileReducer: Reducer<FileStore, ActionType> = (state = initialStore, action) => {
    console.log("action here ", action);
    
    switch (action.type) {
      //returns updated state
      case 'GET_PROJECT' :
        return { ...state, project: action.payload };
      //else the current state is retained
      case 'GET_PROJECT_CONSTRUCT': 
      return { ...state,  construct: action.payload};
      case 'UPDATE_PROJECT_FILE': 
      return { ...state, project: {
        ...state.project,
        [action.payload.filePath]: action.payload.content
      }, refreshCount: state.refreshCount + 1 }
      default:
        return state;
    }
  };