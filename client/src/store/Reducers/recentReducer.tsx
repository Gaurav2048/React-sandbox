import { produce } from "immer";
import { Reducer } from "redux";

export type ActionType = {
    type: 'ADD_TO_TAB',
    payload: {
        name: string;
        path: string;
    }
}

const initialStore: RecentStore = {
    files: [],
    tabs: []
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
            //else the current state is retained
            
          }
          return draft;
    })
  };