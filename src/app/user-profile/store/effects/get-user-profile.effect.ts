import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { UserProfileInterface } from '../../types/user-profile.interface';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from '../actions/get-user-profile.action';

@Injectable()
export class GetUserProfileEffect {
  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({ slug }) =>
        this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfileInterface) =>
            getUserProfileSuccessAction({ userProfile })
          ),
          catchError(() => of(getUserProfileFailureAction()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}
}
