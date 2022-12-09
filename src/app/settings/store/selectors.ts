import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { SettingsStateInteface } from '../types/settings-state.interface';

export const settingsFeatureSelector = createFeatureSelector<
  AppStateInterface,
  SettingsStateInteface
>('settings');

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInteface) => settingsState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInteface) => settingsState.validationErrors
);
