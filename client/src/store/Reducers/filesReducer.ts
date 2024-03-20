import { Reducer } from "redux";

export type ActionType = {
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
    construct: {}
}

export const FileReducer: Reducer<FileStore, ActionType> = (state = initialStore, action) => {
    console.log("action here ", action);
    
    switch (action.type) {
      //returns updated state
      case 'GET_PROJECT' :
        return { ...state, project: action.payload };
      //else the current state is retained
      case 'GET_PROJECT_CONSTRUCT': 
      return { ...state,  construct: action.payload}
      default:
        return state;
    }
  };