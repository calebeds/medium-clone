import { routerNavigatedAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/get-article.action';
import { ArticleStateInterface } from './types/article-state.interface';

const initialState: ArticleStateInterface = {
  isLoading: false,
  data: null,
  error: null,
};

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    getArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state, action): ArticleStateInterface => ({ ...state, isLoading: false })
  ),
  on(routerNavigatedAction, (): ArticleStateInterface => initialState)
);

export const reducers = (state: ArticleStateInterface, action: Action) => {
  return articleReducer(state, action);
};
