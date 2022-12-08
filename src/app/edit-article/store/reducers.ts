import { routerNavigatedAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';
import { EditArticleStateInterface } from '../types/edit-article-state.interface';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/get-article.action';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from './actions/update-article.action';

const initialState: EditArticleStateInterface = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null,
};

const editArticleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): EditArticleStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    updateArticleAction,
    (state): EditArticleStateInterface => ({ ...state, isSubmitting: true })
  ),
  on(
    updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({ ...state, isSubmitting: false })
  ),
  on(
    updateArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
  // on(routerNavigatedAction, (): EditArticleStateInterface => initialState)
);

export const reducers = (state: EditArticleStateInterface, action: Action) => {
  return editArticleReducer(state, action);
};
