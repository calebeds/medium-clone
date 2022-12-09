import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors-interface';

export interface SettingsStateInteface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
