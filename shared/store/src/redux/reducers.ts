import {
  ActionTypes,
  dropdownList,
  storeOnly,
} from '@nikshay-setu-v3-monorepo/constants';
import {
  KnownErrorType,
  ReducerActionType,
  ReducerState,
} from '@nikshay-setu-v3-monorepo/types';
import { combineReducers } from 'redux';
import {
  dropdownHelperFunction,
  helperFunction,
  initialState,
} from './helperFunction';

/* eslint-disable @typescript-eslint/default-param-last */
function reducer(
  state: ReducerState = initialState,
  action: ReducerActionType
): ReducerState {
  switch (action?.type) {
    case ActionTypes.LOADING_START: {
      const loadingApis = new Set(state.loadingApis);
      loadingApis.add(action.payload as string);
      return { ...state, loadingApis: Array.from(loadingApis), error: null };
    }
    case ActionTypes.ACTION_SUCCESS: {
      if (storeOnly?.includes((action?.url && action?.url) || '')) {
        const updatedVal = helperFunction(
          state?.data,
          action.payload,
          action?.url
        );
        return { ...state, data: updatedVal, error: null };
      } else if (dropdownList?.includes((action?.url && action?.url) || '')) {
        const updatedVal = dropdownHelperFunction(
          state?.data,
          action.payload,
          action?.url
        );
        return { ...state, data: updatedVal, error: null };
      } else {
        return state;
      }
    }
    case ActionTypes.ACTION_FAILURE:
      return {
        ...state,
        error: action.payload as KnownErrorType,
      };
    case ActionTypes.LOADING_STOP: {
      const loadingApis = new Set(state.loadingApis);
      loadingApis.delete(action.payload as string);
      return { ...state, loadingApis: Array.from(loadingApis) };
    }

    default:
      return state;
  }
}
/* eslint-enable @typescript-eslint/default-param-last */

export const rootReducer = combineReducers({
  appContext: reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
