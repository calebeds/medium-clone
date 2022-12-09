import { Action, createReducer, on } from '@ngrx/store';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
} from 'src/app/auth/store/actions/update-current-user.action';
import { updateArticleSuccessAction } from 'src/app/edit-article/store/actions/update-article.action';
import { SettingsStateInteface } from '../types/settings-state.interface';

const initialState: SettingsStateInteface = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsReducers = createReducer(
  initialState,
  on(
    updateCurrentUserAction,
    (state): SettingsStateInteface => ({ ...state, isSubmitting: true })
  ),
  on(
    updateArticleSuccessAction,
    (state): SettingsStateInteface => ({ ...state, isSubmitting: false })
  ),
  on(
    updateCurrentUserFailureAction,
    (state, action): SettingsStateInteface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
);

export const reducers = (state: SettingsStateInteface, action: Action) => {
  return settingsReducers(state, action);
};
