import { Action, createReducer, on } from '@ngrx/store';
import { UserProfileStateInterface } from '../types/user-profile-state.interface';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from './actions/get-user-profile.action';

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const userProfileReducer = createReducer(
  initialState,
  on(
    getUserProfileAction,
    (state): UserProfileStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    getUserProfileSuccessAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })
  ),
  on(
    getUserProfileFailureAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);

export const reducers = (state: UserProfileStateInterface, action: Action) =>
  userProfileReducer(state, action);
