import { produce } from "immer";
import { Reducer } from "redux";

export type ActionType = {
    type: 'ADD_TO_TAB',
    payload: {
        name: string;
        path: string;
    }
} | {
    type: 'REMOVE_FROM_TAB',
    payload: {
        name: string;
        path: string;
    }
} | {
    type: 'SET_CURRENT_FILE',
    payload: {
        file: string
    }
}

const initialStore: RecentStore = {
    files: [],
    tabs: [],
    currentFile: ''
}

export const RecentReducer: Reducer<RecentStore, ActionType> = (state = initialStore, action) => {
    return produce(state, draft => {
        console.log('actions ', action);
        switch (action.type) {
            //returns updated state
            
            case 'ADD_TO_TAB' :
              if (!draft.tabs.find(tab => tab.path === action.payload.path)) {
                draft.tabs.push({ ...action.payload })
              }
              const filteredFiles = draft.files.filter(file => file.path !== action.payload.path)
              filteredFiles.unshift(action.payload)
              draft.files = filteredFiles
              return draft

            //else the current state is retained
            case 'REMOVE_FROM_TAB': 
              draft.tabs = draft.tabs.filter(tab => tab.path !== action.payload.path)
              return draft

            case 'SET_CURRENT_FILE': 
              draft.currentFile = action.payload.file
              return draft
        }

          return draft;
    })
  };