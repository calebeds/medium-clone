import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service/auth.service';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from '../actions/update-current-user.action';

@Injectable()
export class UpdateCurrentUserEffect {
  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({ currentUserInput }) =>
        this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser) => updateCurrentUserSuccessAction({ currentUser })),

          catchError((errors: HttpErrorResponse) =>
            of(updateCurrentUserFailureAction(errors.error.errors))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
